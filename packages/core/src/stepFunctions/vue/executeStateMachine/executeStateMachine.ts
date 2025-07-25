/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import * as nls from 'vscode-nls'
const localize = nls.loadMessageBundle()

import { StepFunctionsClient } from '../../../shared/clients/stepFunctions'

import { getLogger } from '../../../shared/logger/logger'
import { Result } from '../../../shared/telemetry/telemetry'
import { StateMachineNode } from '../../explorer/stepFunctionsNodes'
import { ExtContext } from '../../../shared/extensions'
import { VueWebview } from '../../../webviews/main'
import * as vscode from 'vscode'
import { telemetry } from '../../../shared/telemetry/telemetry'

interface StateMachine {
    arn: string
    name: string
    region: string
}

export class ExecuteStateMachineWebview extends VueWebview {
    public static readonly sourcePath: string = 'src/stepFunctions/vue/executeStateMachine/index.js'
    public readonly id = 'remoteInvoke'

    private readonly logger = getLogger()

    public constructor(
        private readonly channel: vscode.OutputChannel,
        private readonly stateMachine: StateMachine
    ) {
        super(ExecuteStateMachineWebview.sourcePath)
    }

    public init() {
        return this.stateMachine
    }

    public async executeStateMachine(input: string) {
        let executeResult: Result = 'Succeeded'
        this.logger.info('Starting Step Functions State Machine execution')

        this.channel.show()
        this.channel.appendLine('')
        this.channel.appendLine(
            localize(
                'AWS.stepFunctions.executeStateMachine.info.executing',
                'Starting execution of {0} in {1}...',
                this.stateMachine.name,
                this.stateMachine.region
            )
        )
        this.channel.appendLine('')

        try {
            const client = new StepFunctionsClient(this.stateMachine.region)
            const startExecResponse = await client.executeStateMachine({
                stateMachineArn: this.stateMachine.arn,
                input,
            })
            this.logger.info('started execution for Step Functions State Machine')
            this.channel.appendLine(localize('AWS.stepFunctions.executeStateMachine.info.started', 'Execution started'))
            this.channel.appendLine(startExecResponse.executionArn || '')
        } catch (e) {
            executeResult = 'Failed'
            const error = e as Error
            this.logger.error('Error starting execution for Step Functions State Machine: %s', error)
            this.channel.appendLine(
                localize(
                    'AWS.stepFunctions.executeStateMachine.error.failedToStart',
                    'There was an error starting execution for {0}, check AWS Toolkit logs for more information.',
                    this.stateMachine.arn
                )
            )
        } finally {
            telemetry.stepfunctions_executeStateMachine.emit({ result: executeResult })
        }
    }
}

const Panel = VueWebview.compilePanel(ExecuteStateMachineWebview)

export async function executeStateMachine(context: ExtContext, node: StateMachineNode): Promise<void> {
    const wv = new Panel(context.extensionContext, context.outputChannel, {
        arn: node.details.stateMachineArn || '',
        name: node.details.name || '',
        region: node.regionCode,
    })

    await wv.show({
        title: localize('AWS.executeStateMachine.title', 'Start Execution'),
        cssFiles: ['executeStateMachine.css'],
    })
    telemetry.stepfunctions_executeStateMachineView.emit()
}
