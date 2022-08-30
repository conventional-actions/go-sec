import * as core from '@actions/core'
import {parseMultiInput} from '@conventional-actions/toolkit'

type Config = {
  version: string
  github_token: string
  outputPath: string
  packages: string[]
  configPath: string
  confidence: string
  excludeRules: string[]
  includeRules: string[]
  excludeGenerated: boolean
  format: string
  failOnError: boolean
  includeTests: boolean
  severity: string
  tags: string[]
  excludePaths: string[]
}

export async function getConfig(): Promise<Config> {
  return {
    version: core.getInput('version') || 'latest',
    github_token: process.env['GITHUB_TOKEN'] || '',
    outputPath: core.getInput('output_path') || 'gosec.sarif',
    packages: parseMultiInput(core.getInput('package') || './...'),
    configPath: core.getInput('config_path') || '',
    confidence: core.getInput('confidence') || 'low',
    excludeRules: parseMultiInput(core.getInput('exclude')),
    includeRules: parseMultiInput(core.getInput('include')),
    excludeGenerated: core.getInput('exclude_generated') === 'true',
    format: core.getInput('format') || 'sarif',
    failOnError: core.getInput('fail_on_error') === 'true',
    includeTests: core.getInput('include_tests') === 'true',
    severity: core.getInput('severity') || 'low',
    tags: parseMultiInput(core.getInput('tags')),
    excludePaths: parseMultiInput(core.getInput('exclude_path'))
  }
}
