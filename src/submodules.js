import { execSync } from 'child_process';
import prompts from 'prompts';
import fs from 'fs/promises';
import path from 'path';

export const addSubmodule = async () => {
  const response = await prompts([
    { type: 'text', name: 'url', message: 'Enter the repository URL:' },
    { type: 'text', name: 'path', message: 'Enter the template folder name:' },
  ]);

  if (response.url && response.path) {
    const templatesDir = path.resolve('./templates');
    const projectRoot = path.resolve('.');
    const repoUrl = response.url;
    const name = response.path;
    const baseDir = "templates";

    console.log(`Adding submodule: ${response.url} into ${baseDir}/${name}`);
    try {
      execSync(`git submodule add ${repoUrl} ${baseDir}/${name}`, { cwd: projectRoot, stdio: 'inherit' });
      execSync(`git submodule update --init --recursive ${baseDir}/${name}`, { cwd: projectRoot, stdio: 'inherit' });

      console.log(`Repository added as submodule successfully into templates folder: ${baseDir}`);
    } catch (error) {
      console.error('Failed to add repository as submodule:', error);
    }
  } else {
    console.log('Operation canceled.');
  }
};

export const removeSubmodule = async () => {
  const response = await prompts({
    type: 'text',
    name: 'path',
    message: 'Enter the submodule path to remove:',
  });

  if (response.path) {
    const projectRoot = path.resolve('.');
    const submodulePath = `templates/${response.path}`;

    console.log(`Removing submodule at ${submodulePath}`);
    try {
      execSync(`git submodule deinit -f ${submodulePath}`, { cwd: projectRoot, stdio: 'inherit' });
      execSync(`git rm -f ${submodulePath}`, { cwd: projectRoot, stdio: 'inherit' });
      execSync(`rm -rf .git/modules/${submodulePath}`, { cwd: projectRoot, stdio: 'inherit' });
      console.log('Submodule removed successfully.');
    } catch (error) {
      console.error('Failed to remove submodule:', error);
    }
  } else {
    console.log('Operation canceled.');
  }
};

export const syncSubmodules = () => {
  console.log('Syncing submodules...');
  execSync('git submodule sync', { stdio: 'inherit' });
  execSync('git submodule update --init --recursive', { stdio: 'inherit' });
  console.log('Submodules synced successfully.');
};
