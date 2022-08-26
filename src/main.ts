import * as core from '@actions/core'
import * as exec from '@actions/exec'
import {parseInputFiles} from './utils'

async function run(): Promise<void> {
  try {
    const outputPath = core.getInput('output_path') || 'gosec.sarif'
    const packages = parseInputFiles(core.getInput('package') || './...')
    const configPath = core.getInput('config_path')
    const confidence = core.getInput('confidence') || 'low'
    const excludeRules = parseInputFiles(core.getInput('exclude'))
    const includeRules = parseInputFiles(core.getInput('include'))
    const excludeGenerated = core.getInput('exclude_generated') === 'true'
    const format = core.getInput('format') || 'sarif'
    const failOnError = core.getInput('fail_on_error') === 'true'
    const includeTests = core.getInput('include_tests') === 'true'
    const severity = core.getInput('severity') || 'low'
    const tags = parseInputFiles(core.getInput('tags'))
    const excludePaths = parseInputFiles(core.getInput('exclude_path'))

    let args: string[] = ['-out', outputPath]

    if (configPath) {
      args = args.concat('-conf', configPath)
    }

    if (confidence) {
      args = args.concat('-confidence', confidence)
    }

    for (const excludeRule of excludeRules) {
      args = args.concat('-exclude', excludeRule)
    }

    for (const includeRule of includeRules) {
      args = args.concat('-include', includeRule)
    }

    if (excludeGenerated) {
      args = args.concat('-exclude-generated')
    }

    if (format) {
      args = args.concat('-fmt', format)
    }

    if (!failOnError) {
      args = args.concat('-no-fail')
    }

    if (includeTests) {
      args = args.concat('-tests')
    }

    if (severity) {
      args = args.concat('-severity', severity)
    }

    if (tags && tags.length) {
      args = args.concat('-tags', tags.join(','))
    }

    for (const excludePath of excludePaths) {
      args = args.concat('-exclude-dir', excludePath)
    }

    for (const pkg of packages) {
      await exec.exec('gosec', args.concat(pkg))
      core.setOutput('output_path', outputPath)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
