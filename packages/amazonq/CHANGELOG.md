## 1.87.0 2025-07-31

- Miscellaneous non-user-facing changes

## 1.86.0 2025-07-30

- **Bug Fix** Let Enter invoke auto completion more consistently
- **Bug Fix** Faster and more responsive inline completion UX
- **Bug Fix** Use documentChangeEvent as auto trigger condition

## 1.85.0 2025-07-19

- Miscellaneous non-user-facing changes

## 1.84.0 2025-07-17

- **Bug Fix** Slightly delay rendering inline completion when user is typing
- **Bug Fix** Render first response before receiving all paginated inline completion results
- **Feature** Explain and Fix for any issue in Code Issues panel will pull the experience into chat. Also no more view details tab.

## 1.83.0 2025-07-09

- **Feature** Amazon Q /test, /doc, and /dev capabilities integrated into Agentic coding.
- **Feature** Added image support to Amazon Q chat, users can now upload images from their local file system
- **Removal** Deprecate "amazon q is generating..." UI for inline suggestion

## 1.82.0 2025-07-07

- **Bug Fix** Prompt re-authenticate if auto trigger failed with expired token

## 1.81.0 2025-07-02

- **Bug Fix** Stop auto inline completion when deleting code

## 1.80.0 2025-07-01

- Miscellaneous non-user-facing changes

## 1.79.0 2025-06-25

- **Bug Fix** Added automatic system certificate detection and VSCode proxy settings support
- **Bug Fix** Improved Amazon Linux 2 support with better SageMaker environment detection
- **Feature** /transform: run all builds client-side

## 1.78.0 2025-06-20

- **Bug Fix** Resolve missing chat options in Amazon Q chat interface.

## 1.77.0 2025-06-18

- Miscellaneous non-user-facing changes

## 1.76.0 2025-06-18

- **Bug Fix** /transform: only show lines of code statistic in plan
- **Feature** Add model selection feature
- **Feature** Pin context items in chat and manage workspace rules

## 1.75.0 2025-06-13

- Miscellaneous non-user-facing changes

## 1.74.0 2025-06-12

- Miscellaneous non-user-facing changes

## 1.73.0 2025-06-11

- **Feature** Add MCP Server Support

## 1.72.0 2025-06-11

- **Feature** Launch LSP with bundled artifacts as fallback

## 1.71.0 2025-06-04

- Miscellaneous non-user-facing changes

## 1.70.0 2025-05-28

- **Removal** Disable local workspace LSP

## 1.69.0 2025-05-22

- **Bug Fix** /transform: avoid prompting user for target JDK path unnecessarily
- **Removal** /transform: remove option to select multiple diffs

## 1.68.0 2025-05-15

- **Bug Fix** Fix Error: 'Amazon Q service is not signed in'
- **Bug Fix** Fix Error: 'Amazon Q Profile is not selected for IDC connection type'
- **Feature** Add inline completion support for abap language

## 1.67.0 2025-05-14

- **Bug Fix** Previous and subsequent cells are used as context for completion in a Jupyter notebook
- **Bug Fix** Support chat in AL2 aarch64

## 1.66.0 2025-05-09

- **Bug Fix** Avoid inline completion 'Improperly formed request' errors when file is too large
- **Bug Fix** Named agent tabs sometimes open with unnecessary input options

## 1.65.0 2025-05-05

- **Feature** Support selecting customizations across all Q profiles with automatic profile switching for enterprise users
- **Feature** Memorize and autofill users' last Sso login profile

## 1.64.0 2025-05-02

- **Bug Fix** Enable Amazon Q LSP in AL2 instances

## 1.63.0 2025-05-01

- **Bug Fix** Q profile selection hangs when a region is blocked
- **Feature** Agentic coding experience: Amazon Q can now write code and run shell commands on your behalf

## 1.62.0 2025-04-25

- **Bug Fix** Toast message to warn users if Developer Profile is not selected
- **Bug Fix** Fix users can not log in successfully with 2+ IDE instnaces open due to throttle error throw by the service

## 1.61.0 2025-04-22

- **Bug Fix** Some users not signaled they needed to select a Region Profile to get features working
- **bugfix** /review: disable auto-review by default

## 1.60.0 2025-04-18

- **Bug Fix** Users might be bound to a customization which they dont have access with the selected profile and it causes service throwing 403 when using inline suggestion and chat features

## 1.59.0 2025-04-11

- **Bug Fix** Code fix line number or file is sometimes not accurate
- **Bug Fix** Fix Q agents will fail for /transform /dev /test features if IdC kms key is configured with 400 error

## 1.58.0 2025-04-11

- **Bug Fix** inline chat activates properly when using 'aws.experiments.amazonqChatLSP' feature flag
- **Bug Fix** Amazon Q Chat: code blocks in responses flicker, switching tabs during answer streaming makes expand button disappear
- **Bug Fix** Amazon Q Chat: tab bar buttons disappear when closing non-active tab
- **Bug Fix** Amazon Q Chat: chat history list does not truncate markdown

## 1.57.0 2025-04-10

- **Bug Fix** Fix bug where generate fix does not work
- **Bug Fix** Fix bug where review shows 0 findings

## 1.56.0 2025-04-09

- **Bug Fix** Improve status message while loading Amazon Q Profiles during login
- **Bug Fix** "failed to run command" error

## 1.55.0 2025-04-09

- **Bug Fix** Amazon Q Chat: Update chat history icon
- **Bug Fix** Amazon Q Chat: chat occasionally freezes and displays gray screen
- **Bug Fix** Amazon Q Chat: Set owner-only permissions for chat history and saved prompt files
- **Feature** `/test` generates tests in all languages, not only Java/Python
- **Feature** Amazon Q chat: Click export icon to save chat transcript in Markdown or HTML
- **Feature** SageMaker: Disable the unsupported agentic commands and welcome prompt
- **Feature** Amazon Q Chat: Add `@code` context for PHP, Ruby, Scala, Shell, and Swift projects
- **Feature** Enterprise users can choose their preferred Amazon Q profile to improve personalization and workflow across different business regions

## 1.54.0 2025-04-03

- **Bug Fix** Amazon Q chat: `@prompts` not added to context
- **Feature** Amazon Q chat: View and search chat history
- **Feature** SageMaker Unified Studio: Disable Sign out
- **Feature** SageMaker Unified Studio: Update Q Chat Introduction message
- **Feature** /review: automatically generate fix without clicking Generate Fix button
- **Feature** Amazon Q chat: Automatically persist chats between IDE sessions
- **Feature** Save user command execution logs to plugin output.
- **Feature** Amazon Q chat: Code blocks in chat messages have a max-height of 21 lines and can be scrolled inside

## 1.53.0 2025-03-28

- **Bug Fix** Amazon Q Chat: Choosing a nested subfolder for `/doc` on Windows results in `The folder you chose did not contain any source files` error
- **Feature** Add support for Code search in Q chat
- **Feature** (Experimental) Amazon Q inline code suggestions via Amazon Q Language Server. (enable with `aws.experiments.amazonqLSP: true`)
- **Feature** Command Palette: Add `Amazon Q: Open Chat` command.

## 1.52.0 2025-03-20

- **Bug Fix** Amazon Q chat: @Folders and @Files are missing `@` prefix in chat history
- **Bug Fix** /review: Code Issues ellipses menu displays AWS Toolkit options, if installed.
- **Bug Fix** Amazon Q chat: Progress indicator height is stretched
- **Bug Fix** Amazon Q chat: Long descriptions in context list are cut off
- **Bug Fix** Amazon Q chat: Improve responses for saved prompts and workspace rules
- **Bug Fix** /test: show descriptive error message
- **Bug Fix** Code Review: Fixed a bug where issues are double counted in the Q chat
- **Bug Fix** Amazon Q chat: Animation timings are too long
- **Bug Fix** Fix inline completion failure due to context length exceeding the threshold
- **Feature** /review: passing referenceTrackerConfiguration to StartCodeFixJob
- **Feature** /review: rename setting `showInlineCodeSuggestionsWithCodeReferences` to `showCodeWithReferences`

## 1.51.0 2025-03-12

- **Bug Fix** increase scan timeout to reduce front-end timeout errors
- **Bug Fix** Amazon Q chat: Create a new prompt form does not autofocus or submit with Enter press
- **Bug Fix** /review: Zip files are created with the wrong file path for file scans in multifolder workspaces.
- **Bug Fix** /review: Invalid file path characters caused some detections to be skipped on Windows
- **Feature** Amazon Q Chat: You can now keep a "library" of prompt files in your home directory under `~/.aws/amazonq/prompts` and then quickly add them to the context using `@` on any project you’re working on. Prompt files are in markdown (`.md`) format.
- **Feature** /review: show code diff for fix preview
- **Feature** /test: display test plan summary in chat after generating tests

## 1.50.0 2025-03-06

- **Bug Fix** /doc: Usage in multiple chat tabs may cause unexpected behavior.
- **Bug Fix** /review: subsequent reviews weren't possible
- **Feature** Amazon Q chat: Use `@` to add folders, files, and saved prompts as context
- **Feature** Amazon Q chat: increase chat input height to 3 lines
- **Feature** Amazon Q chat: Show list of files sent as context in chat response
- **Feature** Amazon Q chat: Add support for `.md` file rules in workspace-level `.amazonq/rules` directory
- **Test** add Q Chat /review command test coverage

## 1.49.0 2025-02-27

- **Bug Fix** Amazon Q /test: Unit test generation displays an inaccurate diff view for non-primary packages in the workspace.
- **Bug Fix** Amazon Q /doc: Fix uploading file method throwing incorrect workspace too large error message
- **Bug Fix** /transform: skip running tests locally when user chooses to do so
- **Bug Fix** /review: ignored lines should not show up in scan issues
- **Bug Fix** /test: update capability card text

## 1.48.0 2025-02-20

- **Bug Fix** /dev and /doc: Multi-root workspace with duplicate files causes infinite 'Uploading code...' loop
- **Bug Fix** Amazon Q /doc: update workspace too large error message 
- **Bug Fix** /review: Auto-review should not remove issues from manual reviews
- **Bug Fix** /transform: allow View Summary button to work even after accepting diff
- **Bug Fix** Amazon Q /test: Fixing the issue of target file does not exist.
- **Feature** Amazon Q /doc: Add support for infrastructure diagrams

## 1.47.0 2025-02-13

- **Bug Fix** `Send to prompt` and other context menu options not sent if chat was closed
- **Bug Fix** Amazon Q /test: Truncating user input to 4096 characters for unit test generation.
- **Bug Fix** Amazon Q /test: Q identify active test file and infer source file for test generation.
- **Bug Fix** /review: Code review starts automatically when invoked from menu
- **Feature** Amazon Q /dev: support `.hbs`, `.gjs`, `.gts`, `.astro`, `.mdx`, `.svelte`, `.erb`, `.rake` files
- **Feature** /transform: automatically download results when ready
- **Feature** /transform: support Java 21 transformations
- **Removal** Reverted prefetch logic to enable more stable inline completion

## 1.46.0 2025-02-05

- **Bug Fix** Citation links are not clickable as numbers, but appear as non-clickable texts
- **Bug Fix** Fix language server start failure in AL2023 ARM64
- **Bug Fix** /review: Auto-review issues did not populate code issues list
- **Bug Fix** Amazon Q: Fix code upload error when using /dev or /doc on Remote SSH
- **Bug Fix** /test placeholder text aligned across IDEs
- **Bug Fix** Inline: Typos in the first example suggestion
- **Feature** Inline suggestions: Pre-fetch recommendations to reduce suggestion latency.
- **Feature** Added github issue link and description to the chat answer feedback form

## 1.45.0 2025-01-30

- **Bug Fix** Allow AB users with an overridden customization to go back to the default customization
- **Bug Fix** For security reasons, disabled auto linkify for link texts coming in markdown other than [TEXT](URL) format
- **Feature** Add setting to allow Q /dev to run code and test commands

## 1.44.0 2025-01-23

- **Bug Fix** Amazon Q: word duplication when pressing tab on context selector fixed
- **Bug Fix** Amazon Q /doc: Prevent users from requesting changes if no iterations remain
- **Bug Fix** `/test`: view diffs by clicking files in the file tree, aligning the behavior with the 'View Diff' button.
- **Bug Fix** /review: Improved error handling for code fix operations
- **Bug Fix** Amazon Q: cursor no longer jumps after navigating prompt history
- **Bug Fix** Improve the text description of workspace index settings
- **Bug Fix** Notifications: 'Dismiss' command visible in command palette.
- **Bug Fix** /transform: replace icons in Transformation Hub with text
- **Bug Fix** Amazon Q /doc: Ask for user prompt if error occurs while updating documentation
- **Feature** Amazon Q: increase chat current active file context char limit to 40k
- **Feature** /review: Code issues can be grouped by file location or severity

## 1.43.0 2025-01-15

- **Bug Fix** Auth: Valid StartURL not accepted at login
- **Bug Fix** Fix inline completion supplementalContext length exceeding maximum in certain cases
- **Bug Fix** Amazon Q /test: Unit test generation completed message shows after accept/reject action
- **Bug Fix** /test: for unsupported languages was sometimes unreliable
- **Bug Fix** User-selected customizations are sometimes not being persisted.
- **Bug Fix** Amazon q /dev: Remove hard-coded limits and instead rely server-side data to communicate number of code generations remaining
- **Feature** Adds capability to send new context commands to AB groups
- **Feature** feat(amazonq): Add error message for updated README too large
- **Feature** Enhance Q inline completion context fetching for better suggestion quality

## 1.42.0 2025-01-09

- **Bug Fix** Amazon Q /doc: Improve button text phrasing
- **Bug Fix** Amazon Q /dev: Fix issue when files are deleted while preparing context
- **Bug Fix** Amazon Q Code Transformation: allow POSTGRESQL as target DB for SQL conversions
- **Bug Fix** Fix context menu displaying when typing @, even though input is disallowed
- **Bug Fix** Amazon Q can update mvn and gradle build files
- **Bug Fix** /transform: use correct documentation link in SQL conversion help message
- **Bug Fix** Up/down history navigation only triggering on first/last line of prompt input
- **Bug Fix** Amazon Q /test: Fix to redirect /test to generate tests in chat for external files out of workspace scope.
- **Bug Fix** /review: Code block extends beyond page margins in code issue detail view
- **Bug Fix** Amazon Q Code Transformation: retry project upload up to 3 times
- **Feature** Amazon Q Code Transformation: add view summary button in chat
- **Feature** Amazon Q: new code syntax highlighter for improved accuracy
- **Removal** Settings: No longer migrate old CodeWhisperer settings or initialize telemetry setting from AWS Toolkit.

## 1.41.0 2024-12-17

- **Bug Fix** /review: Apply fix removes other issues in the same file.
- **Bug Fix** Fix(Amazon Q Code Transformation): show correct diff when running consecutive transformations
- **Bug Fix** Improve when the welcome page is shown in amazon q chat
- **Bug Fix** Code Review: Cleaned up output logs when running /review
- **Bug Fix** Code Review: Fixed a bug where applying a fix did not update the positions of other issues in the same file.
- **Bug Fix** Chat: When navigating to previous prompts, code attachments are sometimes displayed incorrectly
- **Bug Fix** /review: Diagnostics in the problems panel are mapped to the wrong code
- **Bug Fix** Fix opentabs context possibly timeout due to race condition of misuse of different timeout functionalities
- **Bug Fix** Auth: SSO session was bad, but no reauth prompt given
- **Bug Fix** Reduce frequency of system status poll
- **Bug Fix** Chat: When writing a prompt without sending it, navigating via up/down arrows sometimes deletes the unsent prompt.
- **Bug Fix** Code Review: Fixed a bug where projects with repeated path names did not scan properly.
- **Feature** /review: Code fix automatically scrolls into view after generation.
- **Feature** Chat: improve font size and line-height in footer (below prompt input field)

## 1.40.0 2024-12-10

- **Bug Fix** Improved LLM code review for file review.
- **Bug Fix** @workspace is missing from the welcome to q chat tab
- **Bug Fix** Fix chat syntax highlighting when using several different themes
- **Bug Fix** Amazon Q /doc: progress bar persists after cancelling README creation
- **Bug Fix** Code Review: Fixed a bug where some issues are missing from the code issues view for workspaces with custom names
- **Bug Fix** Amazon Q /doc: Prompt user to choose a folder in chat
- **Bug Fix** Amazon Q /dev not adding Dockerfiles in nested folders
- **Bug Fix** Improved Code Fix generation for code review issues
- **Bug Fix** Fix the quick start buttons on the explore page to show amazon q colours on hover
- **Feature** Q feature dev: recognize .bms, .pli code files
- **Feature** Amazon Q Code Transformation: show job ID in Transformation Hub
- **Feature** UI improvements to Amazon Q Chat: New splash loader animation, initial streaming card animation, improved button colours
- **Feature** Add acknowledgement button for amazon q chat disclaimer
- **Feature** Navigate through prompt history by using the up/down arrows
- **Feature** Amazon Q: Simplify log channel

## 1.39.0 2024-12-03

- **Feature** Added a getting started page for exploring amazon q agents
- **Feature** `/test` in Q chat to generate unit tests for java and python
- **Feature** `/doc` in Q chat to generate and update documentation for your project
- **Feature** Amazon Q Code Scan is now Amazon Q Code Review
- **Feature** `/review` in Q chat to scan your code for vulnerabilities and quality issues, and generate fixes
- **Feature** Security Scan: New TreeView to display security scan issues and vulnerabilities detected in your project. The TreeView provides an organized and hierarchical view of the scan results, making it easier to navigate and prioritize the issues that need to be addressed.
- **Feature** Security Scan: Added ability to suppress or ignore security issues

## 1.38.0 2024-11-27

- **Feature** Amazon Q /dev: support `Dockerfile` files
- **Feature** Introduce @workspace command to enhance context fetching for Chat
- **Feature** Feature(Amazon Q Code Transformation): allow users to view results in 5 smaller diffs

## 1.37.0 2024-11-22

- **Bug Fix** Amazon Q Feature Dev: display limit reached error message
- **Bug Fix** Amazon Q chat: `@workspace` command shown in all tab types
- **Bug Fix** Chat container exceeds width of container
- **Bug Fix** amazon q inline: skip indexing when no workspace folders are found
- **Bug Fix** file details and name unneccessary cropping
- **Bug Fix** Amazon Q /dev: update diff window behavior after a change is accepted
- **Feature** Amazon Q /dev: support `.gradle` files
- **Feature** Code Transform: Enable support for Java 17 projects.
- **Feature** Notifications: Support for delivering critical alerts and product updates
- **Feature** Retrieve and display a customization name when a customization is overridden in an AB test
- **Feature** Feature(Amazon Q Code Transformation): support conversions of embedded SQL from Oracle to PostgreSQL

## 1.36.0 2024-11-14

- **Bug Fix** Fix broken inline suggestion auto-trigger on Systemverfilog files if users dont have systemverilog extension installed and enabled
- **Bug Fix** tutorial always showing on start
- **Feature** Enable default `@workspace` context of Amazon Q chat for certain users
- **Feature** Amazon Q /dev: Add an action to accept individual files

## 1.35.0 2024-11-11

- **Breaking Change** Change focus chat keybind to win+alt+i on Windows, cmd+alt+i on macOS, and meta+alt+i on Linux
- **Bug Fix** Fix suboptimal inline suggestions from Amazon Q caused by improperly formatted supplemental context
- **Bug Fix** Fix empty chunks being sent to service and get validationException

## 1.34.0 2024-11-07

- **Bug Fix** Align example help text with prompt message in chat
- **Bug Fix** Improve `@workspace` index auto pause start strategy. 
- **Feature** Allow users to View and Apply diff when they explictily send code to Amazon Q using - Fix, Refactor, Optimize and Send To Prompt.
- **Feature** Security Scan: Auto-scan now supports JSX, TSX, Kotlin, Scala, and Shell files.

## 1.33.0 2024-10-30

- **Bug Fix** Amazon Q /dev: fix for stop button showing for Code Transformation

## 1.32.0 2024-10-29

- **Bug Fix** Remove warning when no input is provided to inline chat input box
- **Bug Fix** Use Sagemaker environment IAM Credentials for Code Completion when they're available
- **Bug Fix** Inline: Code completion not working for Sagemaker Pro Tier users.
- **Bug Fix** Disable /transform and /dev commands for sagemaker users as they're not supported
- **Feature** Amazon SageMaker Studio: Enable Free Tier Chat for IAM users

## 1.31.0 2024-10-29

- **Breaking Change** Change keybind for focusing chat to ctrl+win+i on Windows, ctrl+cmd+i on macOS and ctrl+meta+i on Linux
- **Bug Fix** Inline Suggestions: Occasional `ValidationException` if user context has too many characters.
- **Bug Fix** Update `@workspace` index when adding or deleting a file
- **Bug Fix** fixed device code detection when running auth through tunneled vscode
- **Feature** Use inline chat to select code and transform it with natural language instructions
- **Feature** Amazon Q /dev: Add stop generation action
- **Feature** Provide more frequent updates about code changes made by agent

## 1.30.0 2024-10-17

- **Bug Fix** Various fixes and changes

## 1.29.0 2024-10-10

- **Bug Fix** Amazon Q /dev: include telemetry for workspace usage when generating new files
- **Bug Fix** Amazon Q extension may fail to start if AWS Toolkit extension fails to start
- **Bug Fix** Start language server by default
- **Bug Fix** Amazon Q Feature Dev: Add error messages when the upload URL expires
- **Bug Fix** Amazon Q (/dev): view diffs of previous /dev iterations
- **Bug Fix** Q dev handle no change required
- **Deprecation** The next release of this extension will require VS Code 1.83.0 or newer.
- **Feature** Automatically pause and resume @workspace indexing when OS CPU load is high
- **Feature** Add buttons to code blocks to view and accept diffs.
- **Feature** Inline completion for more json files, and all yaml files
- **Feature** Show a one-time warning if new VS Code is required
- **Removal** Minimum required VSCode version is now 1.83

## 1.28.0 2024-10-03

- **Bug Fix** Amazon Q /dev: define first folder as a root path for LLM-created files when using workspaces
- **Feature** Amazon Q Code Transformation: allow users to skip running tests
- **Feature** Amazon Q Developer: Updated legal disclaimer text

## 1.27.0 2024-09-27

- **Bug Fix** Security Scan: Fixes an issue that incorrectly removes hardcoded credentials detections from auto scans.

## 1.26.0 2024-09-19

- **Bug Fix** Security Scan: Fixed an issue where the wrong icon was used in the status bar menu.
- **Bug Fix** Disable Amazon Q LSP in AL2
- **Bug Fix** Amazon Q Chat: Fix shifted chat contents when closing and opening chat panel back
- **Bug Fix** Security Scan: Minor styling improvements in the security issue webview panel
- **Bug Fix** Amazon Q Chat: Fix tooltip remaining on screen when closing and opening chat panel back
- **Bug Fix** Auth: Login state not updating across multiple VS Code windows.
- **Feature** Support @workspace queries for specific files like `@workspace what does test.ts do? `. 

## 1.25.0 2024-09-12

- **Bug Fix** Amazon Q Chat: Fixed inline code blocks are not vertically aligned with texts
- **Feature** Record telemetry event when Amazon Q extension is uninstalled.
- **Feature** Improve workspace indexing by only index files that are changed since last indexing
- **Removal** Amazon Q Feature dev: Remove approach generation flow

## 1.24.0 2024-09-05

- **Bug Fix** Network errors causing premature SSO logout
- **Bug Fix** Fix SyntaxError causing premature expiration (edge case)
- **Bug Fix** Amazon Q Code Transformation: show instructions for finding JDK path on Linux
- **Bug Fix** UI: 'Start using Amazon Q' may display even if the user is signed in.
- **Bug Fix** Add getFeature and isEnabled utility methods to FeatureConfigProvider
- **Feature** Amazon Q /dev: include in progress state agent in code generation
- **Feature** Reduce workspace CPU indexing time by 50%

## 1.23.0 2024-08-29

- **Bug Fix** Fix bug when undo inline suggestion causes command not found
- **Bug Fix** Auth: `SyntaxError` causing unexpected SSO logout
- **Bug Fix** Amazon Q Code Transformation: allow symlinks for JDK path
- **Bug Fix** Fix bug where text with inline code copied from Amazon Q Chat had new line breaks around the inline code text
- **Bug Fix** Fix bug with code indentation and nested list formatting in chat response prompt
- **Bug Fix** Fix bug when disabled commands does not get filtered in quick actions
- **Bug Fix** Auth: Users may be silently logged out due to network issues when starting the extension.
- **Feature** Support AB testing

## 1.22.0 2024-08-22

- **Bug Fix** Avoid refreshing code suggestion for paginated response
- **Bug Fix** Update login logo styling
- **Bug Fix** Correct indentation when insert Q chat code at cursor position
- **Feature** Add notification for extended session to IdC users
- **Feature** Support more programming languages for workspace index

## 1.21.0 2024-08-15

- **Bug Fix** Q feature dev: update file extension list and minor UI fixes

## 1.20.0 2024-08-08

- **Bug Fix** Amazon Q /dev: include a retry option for the same prompt after folder reselection
- **Bug Fix** Ignore virtual environment when indexing workspace
- **Feature** Amazon Q Code Transformation: show pro tier users estimated cost of /transform on projects over 100K lines
- **Feature** Amazon Q Code Transformation: warn user if absolute file paths are found in the pom.xml

## 1.19.0 2024-08-01

- **Bug Fix** Amazon Q Chat: Fixing issue with an incorrect input cursor position in the prompt text box
- **Bug Fix** Amazon Q Chat: Fixing issue with the max tabs notification not being dismissible.
- **Bug Fix** Amazon Q Chat: Showing/hiding the scrollbars is now controlled by the OS settings
- **Bug Fix** Q chat may stop responding after processing Python/Java code
- **Feature** Amazon q /dev: i18n support for messaging

## 1.18.0 2024-07-29

- **Bug Fix** Security Scan: Fixed an issue scans were not able to succeed on Java projects with .class files
- **Bug Fix** FileNotFound error causing early SSO expiration

## 1.17.0 2024-07-25

- **Bug Fix** Amazon Q Dev and Transform introduction text formatted incorrectly
- **Bug Fix** Amazon Q /dev: update error message for code gen timeout and include backfill for error name
- **Bug Fix** Sign-in page may fail to render in rare circumstances.

## 1.16.0 2024-07-18

- **Bug Fix** Amazon q /dev: include granular error handling for code generation failed state
- **Bug Fix** Amazon Q Code Transformation: always show build logs from last job run
- **Bug Fix** Unexpected SSO expiration on Windows due to EPERM

## 1.15.0 2024-07-15

- **Bug Fix** Amazon Q Chat: Fixes a bug when the prompt input exceeds the width of the chat box it's not always wrapped correctly.
- **Bug Fix** Amazon Q: Corrected a miswording in the Amazon Q: Share Content With AWS setting.
- **Bug Fix** Amazon Q Chat: Fixes a bug when user input contains 4 or more spaces at the beginning of the line for multiline inputs, that line appears like a code block instead of a paragraph

## 1.14.0 2024-07-11

- **Feature** Amazon Q/dev proactively show code generation iterations

## 1.13.0 2024-07-11

- **Bug Fix** AD/LDAP users may see "uv_os_get_passwd ENOENT" error on startup #5277
- **Feature** Add support for [Amazon Q Chat Workspace Context](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/workspace-context.html). Customers can use `@workspace` to ask questions regarding local workspace.

## 1.12.0 2024-07-08

- **Bug Fix** Amazon Q Security Scans: Fixed unnecessary yellow lines appearing in both auto scans and project scans.
- **Bug Fix** Amazon Q Chat: Fixed prompt input becomes invisible if an html special character is inserted
- **Bug Fix** Amazon Q Chat: Fixed button font sizes are too big
- **Bug Fix** Amazon Q Chat: Fixed buttons don't show borders inside a message
- **Bug Fix** Amazon Q Code Transform: Link UI messages to troubleshooting docs
- **Bug Fix** Amazon Q /dev command: improve user error messages
- **Bug Fix** Amazon Q Chat: Fixed button texts are cropped too short
- **Bug Fix** Amazon Q Chat: Fixed prompt input and selected command horizontal alignment
- **Bug Fix** Amazon Q Chat: Fixed prompt input becomes invisible when multine text inserted with paste
- **Feature** Q feature dev: Only use relevant code and related files

## 1.11.0 2024-06-27

- **Bug Fix** Amazon Q Chat: Fix for inline buttons don't have borders
- **Bug Fix** Amazon Q Chat: Fix for some edge cases when followups appear on top without styles
- **Bug Fix** Amazon Q Chat: Fix for prompt input removes whole word if it starts with @ character but there is no context selected
- **Bug Fix** Amazon Q Chat: Fix for prompt input doesn't show multi line content properly after it reaches 10-15 lines
- **Bug Fix** Amazon Q /dev command: Fix in progress experience for ongoing backend calls

## 1.10.0 2024-06-21

- **Bug Fix** Security Scan: Fixes an issue where project-scans time out for larger projects.
- **Bug Fix** Amazon Q /dev command: Fix file rejections for files outside of src/
- **Bug Fix** Feature Development: update /dev welcome message
- **Bug Fix** Amazon Q Chat: Fixed broken code blocks with typewriter text in list items.
- **Feature** UX: New style for the login window
- **Removal** Auth: No longer share SSO sessions with AWS Toolkit.

## 1.9.0 2024-06-14

- **Bug Fix** Amazon Q inline suggestions: remember `Pause Auto-Suggestions` after IDE restart
- **Bug Fix** Amazon Q /dev command: stop showing spinner when there is an error.
- **Bug Fix** Security Scan: Fixes an issue where auto-scans cause the editor to become unresponsive for larger projects.
- **Bug Fix** Fix(Amazon Q Code Transformation): show more detailed error messages for proxy issues
- **Feature** Amazon Q Code Transform: Allow user to view transformation build log

## 1.8.0 2024-06-07

- **Bug Fix** fix(featureDev): fix file rejection for multi-workspaces
- **Feature** The `Send to Amazon Q` [context menu](https://github.com/aws/aws-toolkit-vscode/assets/371007/ce4c61a4-1b58-48ee-8500-56667d45dd7d) was renamed to `Amazon Q`
- **Feature** Amazon Q Transform: Increase project upload size limit to 2GB
- **Feature** feat(featureDev): generated plan being shown from top
- **Feature** Add additional commands for Amazon Q.

## 1.7.0 2024-05-30

- **Bug Fix** Feature Development: File rejection is not rejecting a file when code is generated
- **Bug Fix** Security Scan: Improved accuracy when applying security fixes
- **Bug Fix** Amazon Q Code Transformation: show more specific error messages on failure cases
- **Feature** Security Scan: Support for scanning files outside of workspaces.
- **Feature** Amazon Q now publishes to Open VSX: https://open-vsx.org/namespace/amazonwebservices

## 1.6.0 2024-05-21

- **Bug Fix** Amazon Q Chat: Inside chat body, if there is a code block inside a list item it shows <br/> tags
- **Bug Fix** Amazon Q Chat: Prompt input field allows additional input beyond the character limit
- **Bug Fix** Amazon Q Chat: Prompt input field not getting focus when chat window opens

## 1.5.0 2024-05-17

- **Bug Fix** Security Scan: Fixes an issue when scanning projects with binary files
- **Bug Fix** Fixes an issue where the /dev chat wouldn't let customers modify the source folder when exceeding the size limit
- **Bug Fix** Security Scan: Improved error notifications
- **Feature** Security Scan: Added custom command to run the security scan.
- **Feature** Security Scan: "View details" and "Explain" options can now be accessed from the problems panel

## 1.4.0 2024-05-13

- **Bug Fix** Auth: No longer request AWS account scopes during login.
- **Bug Fix** Security Scan: Fixes an issue where scans fail for projects with Terraform files
- **Bug Fix** Amazon Q Code Transform: Show additional status messages to align with experience when JAVA_HOME set incorrectly.
- **Feature** UX: Added keyboard navigation to login screen.
- **Feature** New SSO Authorization Code flow for faster logins
- **Feature** Transform: Add human intervention to help update dependencies during transformation.

## 1.3.0 2024-05-08

- **Bug Fix** modifying the root folder for /dev now modifies it
- **Bug Fix** Q chat may stop responding after processing Javascript/Typescript code
- **Bug Fix** Completion may fail unexpected if user opened many tabs
- **Feature** Inline Suggestions: Only display the 'Open Chat' CodeLens if the user is signed into Amazon Q.
- **Feature** Security Scan: Scans can now be run without an open editor
- **Feature** Security Scan: Multi-root workspace support

## 1.2.0 2024-05-07

- **Bug Fix** Fix bug when Amazon Q chat sends code selection while user has no selection
- **Bug Fix** Amazon Q Code Transformation: make jobId visible in job history tab at start of job and allow summary.md + icons to be saved when accepting changes
- **Bug Fix** Amazon Q Chat: Typewriter animator parts showing up in code fields inside listitems
- **Bug Fix** Security Scan: Addresses a bug where security issues sometimes appear multiple times
- **Feature** Update cross file context config for Q inline suggestion
- **Feature** Amazon Q: Security scans now support C, C++, and PHP files

## 1.1.0 2024-04-30

- **Bug Fix** Amazon Q Chat: Fixed markdown is not getting parsed inside list items.
- **Bug Fix** Amazon Q Chat: Copy to clipboard on code blocks doesn't work
- **Bug Fix** Fixed a crash when trying to use Q /dev on large projects or projects containing files with unsupported encoding.

## 1.0.0 2024-04-29

- **Bug Fix** Code Transformation: Address various issues in TransformationHub UX.
- **Bug Fix** Code Transformation: Transform may fail if JAVA_HOME has leading or trailing whitespace
- **Bug Fix** Chat: Q panel doesn't fit to its parent
- **Bug Fix** Feature Development: update welcome message and menu item description for /dev command
- **Bug Fix** Code Transformation: show error messages in chat
- **Bug Fix** Code Transformation: Proposed changes not updated when multiple transformation jobs run in sequence.
- **Bug Fix** Feature Development: Update error message for monthly conversation limit reach
- **Bug Fix** Code Transformation: Omit Maven metadata files when uploading dependencies to fix certain build failures in backend.
- **Feature** Code Transformation: Refreshed UI during CodeTransformation
- **Feature** Chat: cmd + i to open chat
- **Feature** Right Click + no code selected shows Q context menu
- **Feature** Security Scan: Scans can now run on all files in the project
- **Feature** Chat: Updates quick action commands style and groupings
- **Feature** Code Transformation: add details about expected changes in transformation plan
- **Feature** Enable Amazon Q feature development and Amazon Q transform capabilities (/dev and /transform) for AWS Builder ID users.
- **Feature** Initial release
- **Feature** Chat: Added metric parameters to recordAddMessage telemetry event.
- **Feature** Security Scan: Scans can now run automatically when file changes are made
- **Feature** Chat: brief CodeLens to advertise chat
- **Feature** Security Scan: Send security issue to chat for explanation and fix

