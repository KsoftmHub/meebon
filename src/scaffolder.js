import fs from 'fs/promises';
import path from 'path';

export async function scaffoldProject(projectName, template) {
  const targetDir = path.resolve(process.cwd(), projectName);
  const templateDir = path.resolve('./templates', template);

  try {
    // Check if target directory exists
    await fs.access(targetDir).then(() => {
      throw new Error(`Directory "${projectName}" already exists.`);
    }).catch(() => { });

    // Create target directory
    await fs.mkdir(targetDir, { recursive: true });

    // Copy template files
    await copyDirectory(templateDir, targetDir);

    // Update package.json in the new project
    const packageJsonPath = path.join(targetDir, 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
    packageJson.name = projectName;
    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

async function copyDirectory(src, dest) {
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await fs.mkdir(destPath, { recursive: true });
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}
