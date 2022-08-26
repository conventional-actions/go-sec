# go-sec

A GitHub Action for running [go sec](https://securego.io/).

## Usage

To use the GitHub Action, add the following to your job:

```yaml
- uses: conventional-actions/go-sec@v1
```

### Inputs

| Name                | Default       | Description                                                                                              |
|---------------------|---------------|----------------------------------------------------------------------------------------------------------|
| `version`           | `latest`      | the version of gosec to install                                                                          |
| `output_path`       | `gosec.sarif` | the output path to write the SARIF file                                                                  |
| `package`           | `./...`       | the package to scan                                                                                      |
| `config_path`       | N/A           | path to config file                                                                                      |
| `confidence`        | `low`         | filter out the issues with a lower confidence than the given value. Valid options are: low, medium, high |
| `exclude`           | N/A           | comma-separated list of rules IDs to exclude. (see rule list)                                            |
| `include`           | N/A           | comma-separated list of rules IDs to include. (see rule list)                                            |
| `exclude_generated` | `true`        | exclude generated files                                                                                  |
| `format`            | `sarif`       | set output format. Valid options are: json, yaml, csv, junit-xml, html, sonarqube, golint, sarif or text |
| `fail_on_error`     | `false`       | fail the scanning if issues are found                                                                    |
| `include_tests`     | `false`       | scan tests files                                                                                         |
| `severity`          | `low`         | filter out the issues with a lower severity than the given value. Valid options are: low, medium, high   |
| `tags`              | N/A           | comma-separated list of build tags                                                                       |
| `exclude_path`      | N/A           | exclude folder from scan (can be specified multiple times)                                               | 

### Outputs

| Name          | Type     | Description      |
|---------------|----------|------------------|
| `output_path` | `string` | output file path |

### Example

```yaml
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - id: gosec
        uses: conventional-actions/go-sec@v1
      - uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: ${{steps.gosec.outputs.output_path}}
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).




-conf string        # Path to optional config file
-confidence string  # Filter out the issues with a lower confidence than the given value. Valid options are: low, medium, high (default "low")
-exclude value      # Comma separated list of rules IDs to exclude. (see rule list)
-exclude-dir value  # Exclude folder from scan (can be specified multiple times)
-exclude-generated  # Exclude generated files
-fmt string         # Set output format. Valid options are: json, yaml, csv, junit-xml, html, sonarqube, golint, sarif or text (default "text")
-include string     # Comma separated list of rules IDs to include. (see rule list)
-no-fail            # Do not fail the scanning, even if issues were found
-out string         # Set output file for results
-severity string    # Filter out the issues with a lower severity than the given value. Valid options are: low, medium, high (default "low")
-tags string        # Comma separated list of build tags
-tests              # Scan tests files
-verbose sarif      # json, yaml, csv, junit-xml, html, sonarqube, golint, sarif or text
