#!/usr/bin/env node

import { Command } from 'commander';
import { scaffoldProject } from './src/scaffolder.js';
import prompts from 'prompts';
import fs from 'fs/promises';
import path from 'path';

const program = new Command();

const createProject = async (projectName) => {
  const templatesDir = path.resolve('./templates');
  const templateFolders = await fs.readdir(templatesDir, { withFileTypes: true });
  const templateChoices = templateFolders
    .filter(dirent => dirent.isDirectory())
    .map(dirent => ({ title: dirent.name, value: dirent.name }));

  const response = await prompts({
    type: 'select',
    name: 'template',
    message: 'Choose a template:',
    choices: templateChoices,
  });

  if (response.template) {
    await scaffoldProject(projectName, response.template);
    console.log(`Project "${projectName}" created successfully!`);
  } else {
    console.log('Operation cancelled.');
  }
};

program
  .name('meebon-cli')
  .description('CLI tool for managing submodules and scaffolding projects')
  .version('1.0.0');

program
  .argument('<projectName>', 'Name of the project to create')
  .action(createProject);

program.parse(process.argv);
