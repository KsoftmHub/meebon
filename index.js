#!/usr/bin/env node

import prompts from 'prompts';
import fs from 'fs/promises';
import path from 'path';
import { scaffoldProject } from './src/scaffolder.js';

(async () => {
  const args = process.argv.slice(2); // Get command-line arguments
  const defaultProjectName = args[0]; // First argument is the project name

  // Dynamically fetch template folder names
  const templatesDir = path.resolve('./templates');
  const templateFolders = await fs.readdir(templatesDir, { withFileTypes: true });
  const templateChoices = templateFolders
    .filter(dirent => dirent.isDirectory())
    .map(dirent => ({ title: dirent.name, value: dirent.name }));

  const response = await prompts([
    {
      type: defaultProjectName ? null : 'text',
      name: 'projectName',
      message: 'Enter the project name:',
      initial: defaultProjectName
    },
    {
      type: 'select',
      name: 'template',
      message: 'Choose a template:',
      choices: templateChoices
    }
  ]);

  const projectName = response.projectName || defaultProjectName;

  if (projectName && response.template) {
    await scaffoldProject(projectName, response.template);
    console.log(`Project "${projectName}" created successfully!`);
  } else {
    console.log('Operation cancelled.');
  }
})();
