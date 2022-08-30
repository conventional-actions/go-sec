import * as core from '@actions/core'
import * as exec from '@actions/exec'
import {getConfig} from './config'

async function run(): Promise<void> {
  try {
    const config = await getConfig()
    let args: string[] = ['-out', config.outputPath]

    if (config.configPath) {
      args = args.concat('-conf', config.configPath)
    }

    if (config.confidence) {
      args = args.concat('-confidence', config.confidence)
    }

    for (const excludeRule of config.excludeRules) {
      args = args.concat('-exclude', excludeRule)
    }

    for (const includeRule of config.includeRules) {
      args = args.concat('-include', includeRule)
    }

    if (config.excludeGenerated) {
      args = args.concat('-exclude-generated')
    }

    if (config.format) {
      args = args.concat('-fmt', config.format)
    }

    if (!config.failOnError) {
      args = args.concat('-no-fail')
    }

    if (config.includeTests) {
      args = args.concat('-tests')
    }

    if (config.severity) {
      args = args.concat('-severity', config.severity)
    }

    if (config.tags && config.tags.length) {
      args = args.concat('-tags', config.tags.join(','))
    }

    for (const excludePath of config.excludePaths) {
      args = args.concat('-exclude-dir', excludePath)
    }

    for (const pkg of config.packages) {
      await exec.exec('gosec', args.concat(pkg))
      core.setOutput('output_path', config.outputPath)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
