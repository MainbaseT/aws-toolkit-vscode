/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { DefaultCodeWhispererClient } from '../client/codewhisperer'
import { getLogger } from '../../shared/logger/logger'
import * as vscode from 'vscode'
import {
    AggregatedCodeScanIssue,
    CodeScanIssue,
    CodeScansState,
    codeScanState,
    CodeScanStoppedError,
    onDemandFileScanState,
    RegionProfile,
} from '../models/model'
import { sleep } from '../../shared/utilities/timeoutUtils'
import * as codewhispererClient from '../client/codewhisperer'
import * as CodeWhispererConstants from '../models/constants'
import { existsSync, statSync, readFileSync } from 'fs' // eslint-disable-line no-restricted-imports
import { RawCodeScanIssue } from '../models/model'
import * as crypto from 'crypto'
import path = require('path')
import { pageableToCollection } from '../../shared/utilities/collectionUtils'
import { ArtifactMap, CreateUploadUrlRequest, CreateUploadUrlResponse } from '../client/codewhispereruserclient'
import { TelemetryHelper } from '../util/telemetryHelper'
import request, { RequestError } from '../../shared/request'
import { ZipMetadata } from '../util/zipUtil'
import { getNullLogger } from '../../shared/logger/logger'
import {
    CreateCodeScanError,
    CreateUploadUrlError,
    InvalidSourceZipError,
    SecurityScanTimedOutError,
    UploadArtifactToS3Error,
} from '../models/errors'
import { getTelemetryReasonDesc } from '../../shared/errors'
import { CodeWhispererSettings } from '../util/codewhispererSettings'
import { detectCommentAboveLine } from '../../shared/utilities/commentUtils'
import { runtimeLanguageContext } from '../util/runtimeLanguageContext'
import { FeatureUseCase } from '../models/constants'
import { AmazonqCreateUpload, Span, telemetry } from '../../shared/telemetry/telemetry'
import { AuthUtil } from '../util/authUtil'

export async function listScanResults(
    client: DefaultCodeWhispererClient,
    jobId: string,
    codeScanFindingsSchema: string,
    projectPaths: string[],
    scope: CodeWhispererConstants.CodeAnalysisScope,
    editor: vscode.TextEditor | undefined,
    profile?: RegionProfile
) {
    const logger = getLoggerForScope(scope)
    const codeScanIssueMap: Map<string, RawCodeScanIssue[]> = new Map()
    const aggregatedCodeScanIssueList: AggregatedCodeScanIssue[] = []
    const requester = (request: codewhispererClient.ListCodeScanFindingsRequest) =>
        client.listCodeScanFindings(request, profile?.arn)
    const request: codewhispererClient.ListCodeScanFindingsRequest = {
        jobId,
        codeAnalysisFindingsSchema: codeScanFindingsSchema,
        profileArn: profile?.arn,
    }
    const collection = pageableToCollection(requester, request, 'nextToken')
    const issues = await collection
        .flatten()
        .map((resp) => {
            logger.verbose(`ListCodeScanFindingsRequest requestId: ${resp.$response.requestId}`)
            if ('codeScanFindings' in resp) {
                return resp.codeScanFindings
            }
            return resp.codeAnalysisFindings
        })
        .promise()
    for (const issue of issues) {
        mapToAggregatedList(codeScanIssueMap, issue, editor, scope)
    }
    for (const [key, issues] of codeScanIssueMap.entries()) {
        // Project path example: /Users/username/project
        // Key example: project/src/main/java/com/example/App.java
        const mappedProjectPaths: Set<string> = new Set()
        for (const projectPath of projectPaths) {
            // There could be multiple projectPaths with the same parent dir
            // In that case, make sure to break out of this loop after a filePath is found
            // or else it might result in duplicate findings.
            const filePath = path.join(projectPath, '..', key)
            if (existsSync(filePath) && statSync(filePath).isFile()) {
                mappedProjectPaths.add(filePath)
                const document = await vscode.workspace.openTextDocument(filePath)
                const aggregatedCodeScanIssue: AggregatedCodeScanIssue = {
                    filePath: filePath,
                    issues: issues.map((issue) => mapRawToCodeScanIssue(issue, document, jobId, scope)),
                }
                aggregatedCodeScanIssueList.push(aggregatedCodeScanIssue)
                break
            }
        }
        const maybeAbsolutePath = `/${key}`
        if (
            !mappedProjectPaths.has(maybeAbsolutePath) &&
            existsSync(maybeAbsolutePath) &&
            statSync(maybeAbsolutePath).isFile()
        ) {
            const document = await vscode.workspace.openTextDocument(maybeAbsolutePath)
            const aggregatedCodeScanIssue: AggregatedCodeScanIssue = {
                filePath: maybeAbsolutePath,
                issues: issues.map((issue) => mapRawToCodeScanIssue(issue, document, jobId, scope)),
            }
            aggregatedCodeScanIssueList.push(aggregatedCodeScanIssue)
        }
    }
    return aggregatedCodeScanIssueList
}

function mapRawToCodeScanIssue(
    issue: RawCodeScanIssue,
    document: vscode.TextDocument,
    jobId: string,
    scope: CodeWhispererConstants.CodeAnalysisScope
): CodeScanIssue {
    const isIssueTitleIgnored = CodeWhispererSettings.instance.getIgnoredSecurityIssues().includes(issue.title)
    const isSingleIssueIgnored = detectCommentAboveLine(
        document,
        issue.startLine - 1,
        CodeWhispererConstants.amazonqIgnoreNextLine
    )
    const language = runtimeLanguageContext.getLanguageContext(
        document.languageId,
        path.extname(document.fileName)
    ).language
    return {
        startLine: issue.startLine - 1 >= 0 ? issue.startLine - 1 : 0,
        endLine: issue.endLine,
        comment: `${issue.title.trim()}: ${issue.description.text.trim()}`,
        title: issue.title,
        description: issue.description,
        detectorId: issue.detectorId,
        detectorName: issue.detectorName,
        findingId: issue.findingId,
        ruleId: issue.ruleId,
        relatedVulnerabilities: issue.relatedVulnerabilities,
        severity: issue.severity,
        recommendation: issue.remediation.recommendation,
        suggestedFixes: issue.remediation.suggestedFixes,
        visible: !isIssueTitleIgnored && !isSingleIssueIgnored,
        scanJobId: jobId,
        language,
        autoDetected: scope === CodeWhispererConstants.CodeAnalysisScope.FILE_AUTO,
    }
}

export function mapToAggregatedList(
    codeScanIssueMap: Map<string, RawCodeScanIssue[]>,
    json: string,
    editor: vscode.TextEditor | undefined,
    scope: CodeWhispererConstants.CodeAnalysisScope
) {
    const codeScanIssues: RawCodeScanIssue[] = JSON.parse(json)
    const filteredIssues = codeScanIssues.filter((issue) => {
        if (
            (scope === CodeWhispererConstants.CodeAnalysisScope.FILE_AUTO ||
                scope === CodeWhispererConstants.CodeAnalysisScope.FILE_ON_DEMAND) &&
            editor
        ) {
            for (let lineNumber = issue.startLine; lineNumber <= issue.endLine; lineNumber++) {
                const line = editor.document.lineAt(lineNumber - 1)?.text
                const codeContent = issue.codeSnippet.find((codeIssue) => codeIssue.number === lineNumber)?.content
                if (codeContent?.includes('***')) {
                    // CodeSnippet contains redacted code so we can't do a direct comparison
                    return line.length === codeContent.length
                } else {
                    return line === codeContent
                }
            }
        }
        return true
    })

    for (const issue of filteredIssues) {
        const filePath = issue.filePath
        if (codeScanIssueMap.has(filePath)) {
            if (!isExistingIssue(issue, codeScanIssueMap)) {
                codeScanIssueMap.get(filePath)?.push(issue)
            } else {
                getLogger().warn('Found duplicate issue %O, ignoring...', issue)
            }
        } else {
            codeScanIssueMap.set(filePath, [issue])
        }
    }
}

function isDuplicateIssue(issueA: RawCodeScanIssue, issueB: RawCodeScanIssue) {
    return (
        issueA.filePath === issueB.filePath &&
        issueA.title === issueB.title &&
        issueA.startLine === issueB.startLine &&
        issueA.endLine === issueB.endLine
    )
}

function isExistingIssue(issue: RawCodeScanIssue, codeScanIssueMap: Map<string, RawCodeScanIssue[]>) {
    return codeScanIssueMap.get(issue.filePath)?.some((existingIssue) => isDuplicateIssue(issue, existingIssue))
}

export async function pollScanJobStatus(
    client: DefaultCodeWhispererClient,
    jobId: string,
    scope: CodeWhispererConstants.CodeAnalysisScope,
    codeScanStartTime: number,
    profile?: RegionProfile
) {
    const pollingStartTime = performance.now()
    // We don't expect to get results immediately, so sleep for some time initially to not make unnecessary calls
    await sleep(getPollingDelayMsForScope(scope))

    const logger = getLoggerForScope(scope)
    logger.verbose(`Polling scan job status...`)
    let status: string = 'Pending'
    while (true) {
        throwIfCancelled(scope, codeScanStartTime)
        const req: codewhispererClient.GetCodeScanRequest = {
            jobId: jobId,
            profileArn: profile?.arn,
        }
        const resp = await client.getCodeScan(req)
        logger.verbose(`GetCodeScanRequest requestId: ${resp.$response.requestId}`)
        if (resp.status !== 'Pending') {
            status = resp.status
            logger.verbose(`Scan job status: ${status}`)
            logger.verbose(`Complete Polling scan job status.`)
            break
        }
        throwIfCancelled(scope, codeScanStartTime)
        await sleep(CodeWhispererConstants.codeScanJobPollingIntervalSeconds * 1000)
        const elapsedTime = performance.now() - pollingStartTime
        if (elapsedTime > getPollingTimeoutMsForScope(scope)) {
            logger.verbose(`Scan job status: ${status}`)
            logger.verbose(`Security Scan failed. Amazon Q timed out.`)
            throw new SecurityScanTimedOutError()
        }
    }
    return status
}

export async function createScanJob(
    client: DefaultCodeWhispererClient,
    artifactMap: codewhispererClient.ArtifactMap,
    languageId: string,
    scope: CodeWhispererConstants.CodeAnalysisScope,
    scanName: string,
    profile?: RegionProfile
) {
    const logger = getLoggerForScope(scope)
    logger.verbose(`Creating scan job...`)
    const codeAnalysisScope = scope === CodeWhispererConstants.CodeAnalysisScope.FILE_AUTO ? 'FILE' : 'PROJECT'
    const req: codewhispererClient.CreateCodeScanRequest = {
        artifacts: artifactMap,
        programmingLanguage: {
            languageName: languageId,
        },
        scope: codeAnalysisScope,
        codeScanName: scanName,
        profileArn: profile?.arn,
    }
    const resp = await client.createCodeScan(req).catch((err) => {
        getLogger().error(`Failed creating scan job. Request id: ${err.requestId}`)
        if (
            err.message === CodeWhispererConstants.scansLimitReachedErrorMessage &&
            err.code === 'ThrottlingException'
        ) {
            throw err
        }
        throw new CreateCodeScanError(err)
    })
    getLogger().info(
        `Amazon Q Code Review requestId: ${resp.$response.requestId} and Amazon Q Code Review jobId: ${resp.jobId}`
    )
    TelemetryHelper.instance.sendCodeScanEvent(languageId, resp.$response.requestId)
    return resp
}

export async function getPresignedUrlAndUpload(
    client: DefaultCodeWhispererClient,
    zipMetadata: ZipMetadata,
    scope: CodeWhispererConstants.CodeAnalysisScope,
    scanName: string,
    profile?: RegionProfile
) {
    const artifactMap = await telemetry.amazonq_createUpload.run(async (span) => {
        const logger = getLoggerForScope(scope)
        if (zipMetadata.zipFilePath === '') {
            getLogger().error('Failed to create valid source zip')
            throw new InvalidSourceZipError()
        }
        const uploadIntent = getUploadIntent(scope)
        span.record({
            amazonqUploadIntent: uploadIntent,
            amazonqRepositorySize: zipMetadata.srcPayloadSizeInBytes,
            credentialStartUrl: AuthUtil.instance.startUrl,
        })
        const srcReq: CreateUploadUrlRequest = {
            contentMd5: getMd5(zipMetadata.zipFilePath),
            artifactType: 'SourceCode',
            uploadIntent: uploadIntent,
            uploadContext: {
                codeAnalysisUploadContext: {
                    codeScanName: scanName,
                },
            },
            profileArn: profile?.arn,
        }
        logger.verbose(`Prepare for uploading src context...`)
        const srcResp = await client.createUploadUrl(srcReq).catch((err) => {
            getLogger().error(`Failed getting presigned url for uploading src context. Request id: ${err.requestId}`)
            span.record({ requestId: err.requestId })
            throw new CreateUploadUrlError(err.message)
        })
        logger.verbose(`CreateUploadUrlRequest request id: ${srcResp.$response.requestId}`)
        logger.verbose(`Complete Getting presigned Url for uploading src context.`)
        logger.verbose(`Uploading src context...`)
        await uploadArtifactToS3(zipMetadata.zipFilePath, srcResp, FeatureUseCase.CODE_SCAN, scope, span)
        logger.verbose(`Complete uploading src context.`)
        const artifactMap: ArtifactMap = {
            SourceCode: srcResp.uploadId,
        }
        return artifactMap
    })
    return artifactMap
}

function getUploadIntent(scope: CodeWhispererConstants.CodeAnalysisScope) {
    if (
        scope === CodeWhispererConstants.CodeAnalysisScope.PROJECT ||
        scope === CodeWhispererConstants.CodeAnalysisScope.FILE_ON_DEMAND
    ) {
        return CodeWhispererConstants.projectScanUploadIntent
    } else {
        return CodeWhispererConstants.fileScanUploadIntent
    }
}

export function getMd5(fileName: string) {
    const hasher = crypto.createHash('md5')
    hasher.update(readFileSync(fileName))
    return hasher.digest('base64')
}

export function throwIfCancelled(scope: CodeWhispererConstants.CodeAnalysisScope, codeScanStartTime: number) {
    switch (scope) {
        case CodeWhispererConstants.CodeAnalysisScope.PROJECT:
            if (codeScanState.isCancelling()) {
                throw new CodeScanStoppedError()
            }
            break
        case CodeWhispererConstants.CodeAnalysisScope.FILE_ON_DEMAND:
            if (onDemandFileScanState.isCancelling()) {
                throw new CodeScanStoppedError()
            }
            break
        case CodeWhispererConstants.CodeAnalysisScope.FILE_AUTO: {
            const latestCodeScanStartTime = CodeScansState.instance.getLatestScanTime()
            if (
                !CodeScansState.instance.isScansEnabled() ||
                (latestCodeScanStartTime && latestCodeScanStartTime > codeScanStartTime)
            ) {
                throw new CodeScanStoppedError()
            }
            break
        }
        default:
            getLogger().warn(`Unknown code analysis scope: ${scope}`)
            break
    }
}
// TODO: Refactor this
export async function uploadArtifactToS3(
    fileName: string,
    resp: CreateUploadUrlResponse,
    featureUseCase: FeatureUseCase,
    scope?: CodeWhispererConstants.CodeAnalysisScope,
    span?: Span<AmazonqCreateUpload>
) {
    const logger = getLoggerForScope(scope)
    const encryptionContext = `{"uploadId":"${resp.uploadId}"}`
    const headersObj: Record<string, string> = {
        'Content-MD5': getMd5(fileName),
        'x-amz-server-side-encryption': 'aws:kms',
        'Content-Type': 'application/zip',
        'x-amz-server-side-encryption-context': Buffer.from(encryptionContext, 'utf8').toString('base64'),
    }

    if (resp.kmsKeyArn !== '' && resp.kmsKeyArn !== undefined) {
        headersObj['x-amz-server-side-encryption-aws-kms-key-id'] = resp.kmsKeyArn
    }

    let requestId: string | undefined = undefined
    let id2: string | undefined = undefined
    let responseCode: string = ''

    try {
        const response = await request.fetch('PUT', resp.uploadUrl, {
            body: readFileSync(fileName),
            headers: resp?.requestHeaders ?? headersObj,
        }).response
        logger.debug(`StatusCode: ${response.status}, Text: ${response.statusText}`)
        requestId = response.headers?.get('x-amz-request-id') ?? undefined
        id2 = response.headers?.get('x-amz-id-2') ?? undefined
        responseCode = response.status.toString()
    } catch (error) {
        if (span && error instanceof RequestError) {
            requestId = error.response.headers.get('x-amz-request-id') ?? undefined
            id2 = error.response.headers.get('x-amz-id-2') ?? undefined
            responseCode = error.code.toString()
        }
        let errorMessage = ''
        const isCodeScan = featureUseCase === FeatureUseCase.CODE_SCAN
        const featureType = isCodeScan ? 'security scans' : 'unit test generation'
        const defaultMessage = isCodeScan ? 'Security scan failed.' : 'Test generation failed.'
        getLogger().error(
            `Amazon Q is unable to upload workspace artifacts to Amazon S3 for ${featureType}. ` +
                'For more information, see the Amazon Q documentation or contact your network or organization administrator.'
        )
        const errorDesc = getTelemetryReasonDesc(error)
        if (errorDesc?.includes('"PUT" request failed with code "403"')) {
            errorMessage = '"PUT" request failed with code "403"'
        } else if (errorDesc?.includes('"PUT" request failed with code "503"')) {
            errorMessage = '"PUT" request failed with code "503"'
        } else {
            errorMessage = errorDesc ?? defaultMessage
        }
        throw new UploadArtifactToS3Error(errorMessage)
    } finally {
        getLogger().debug(`Upload to S3 response details: x-amz-request-id: ${requestId}, x-amz-id-2: ${id2}`)
        if (span) {
            span.record({
                requestId: requestId,
                requestId2: id2,
                requestServiceType: 's3',
                httpStatusCode: responseCode,
            })
        }
    }
}

// TODO: Refactor this
export function getLoggerForScope(scope?: CodeWhispererConstants.CodeAnalysisScope) {
    return scope === CodeWhispererConstants.CodeAnalysisScope.FILE_AUTO ? getNullLogger() : getLogger()
}

function getPollingDelayMsForScope(scope: CodeWhispererConstants.CodeAnalysisScope) {
    return (
        (scope === CodeWhispererConstants.CodeAnalysisScope.FILE_AUTO ||
        scope === CodeWhispererConstants.CodeAnalysisScope.FILE_ON_DEMAND
            ? CodeWhispererConstants.fileScanPollingDelaySeconds
            : CodeWhispererConstants.projectScanPollingDelaySeconds) * 1000
    )
}

function getPollingTimeoutMsForScope(scope: CodeWhispererConstants.CodeAnalysisScope) {
    return scope === CodeWhispererConstants.CodeAnalysisScope.FILE_AUTO
        ? CodeWhispererConstants.expressScanTimeoutMs
        : CodeWhispererConstants.standardScanTimeoutMs
}
