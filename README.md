# Meebon Project

## Overview

The Meebon project is a monorepo designed to manage multiple packages and modules efficiently. It provides a streamlined development workflow and supports publishing packages to a package registry.

## Features

- Interactive prompts for project name and template selection.
- Dynamically fetches available templates from the `templates` directory.
- Automatically sets up the project structure and updates `package.json`.

## Prerequisites

- Node.js (>= 14.x)
- npm or yarn or pnpm
- Git

## Installation

To use this CLI tool globally, install it via npm:

```bash
npm install -g meebon
```

## Usage

### Create a New Project

Run the following command to scaffold a new project:

```bash
npm create meebon@latest my-project
```

- Replace `my-project` with the desired project name.
- Follow the interactive prompts to select a template.

### Local Development

To test the CLI tool locally:

1. Clone the repository and navigate to the project directory.
2. Run `npm link` to link the CLI tool globally.
3. Use the `create-meebon` command to test the tool.

```bash
create-meebon my-project
```

## Templates

Templates are stored in the `templates` directory. Add your own templates by creating new subdirectories under `templates`.

### Example Template Structure

```
templates/
├── template1/
│   ├── package.json
│   └── ...
└── template2/
    ├── package.json
    └── ...
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
