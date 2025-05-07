# Publishing Documentation

This document outlines the steps to publish packages from the Meebon monorepo.

## Prerequisites

- Ensure you are logged in to the npm registry:
  ```bash
  npm login
  ```

- Update the version of the package you want to publish:
  ```bash
  npm version <major|minor|patch>
  ```

## Steps to Publish

1. Navigate to the package directory:
   ```bash
   cd packages/<package-name>
   ```

2. Build the package, including the `template` folder:
   ```bash
   npm run build
   cp -r templates dist/templates
   ```

3. Publish the package to the npm registry:
   ```bash
   npm publish
   ```

4. Verify the package is published:
   ```bash
   npm info <package-name>
   ```

## Notes

- Ensure the `package.json` file has the correct `name`, `version`, and `main` fields.
- If you encounter issues, check the npm error logs or contact the project maintainers.

## Automation

You can automate the publishing process using a CI/CD pipeline. Refer to the CI/CD documentation for more details.
