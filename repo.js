#!/usr/bin/env node

import { Command } from 'commander';
import { addSubmodule, removeSubmodule, syncSubmodules } from './src/submodules.js';
const program = new Command();

program
  .name('meebon-cli')
  .description('CLI tool for managing submodules and scaffolding projects')
  .version('1.0.0');

program
  .command('add')
  .description('Add a new submodule')
  .action(addSubmodule);

program
  .command('remove')
  .description('Remove an existing submodule')
  .action(removeSubmodule);

program
  .command('sync')
  .description('Sync all submodules')
  .action(syncSubmodules);

program.parse(process.argv);
