import * as fs from 'fs-extra';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface DirectoryStructure {
    [key: string]: DirectoryStructure | Record<string, never>;
}

export async function createNewProject(projectName: string) {
    try {
        const projectPath = path.resolve(process.cwd(), projectName);
        
        // Create project directory
        await fs.ensureDir(projectPath);
        
        // Create base structure
        const structure: DirectoryStructure = {
            'src': {
                'commands': {},
                'config': {},
                'mediators': {},
                'models': {},
                'proxies': {},
                'services': {},
                'stores': {}
            },
            'test': {
                'commands': {},
                'mediators': {},
                'models': {},
                'proxies': {},
                'services': {},
                'stores': {}
            }
        };

        await createDirectoryStructure(projectPath, structure);
        await copyTemplates(projectPath);
        await createPackageJson(projectPath, projectName);
        await initGit(projectPath);
        await installDependencies(projectPath);
        
        console.log(`Project ${projectName} created successfully!`);
        console.log('To get started:');
        console.log(`cd ${projectName}`);
        console.log('npm run dev');
    } catch (error) {
        console.error('Error creating project:', error);
        process.exit(1);
    }
}

async function createDirectoryStructure(basePath: string, structure: DirectoryStructure) {
    for (const [name, content] of Object.entries(structure)) {
        const fullPath = path.join(basePath, name);
        await fs.ensureDir(fullPath);
        
        if (Object.keys(content).length > 0) {
            await createDirectoryStructure(fullPath, content);
        }
    }
}

async function copyTemplates(projectPath: string) {
    // Copy AppEvents.ts template
    const eventsTemplate = path.resolve(__dirname, '../templates/AppEvents.ts.template');
    const eventsDestination = path.join(projectPath, 'src/config/AppEvents.ts');
    await fs.copy(eventsTemplate, eventsDestination);

    // Create main.ts with basic setup
    const mainContent = `import { Facade } from "@thetinyspark/coffee-maker";
import { USER_CREATED } from "./config/AppEvents";

// Create main facade instance
const facade = new Facade();

// Example of registering a command
// facade.registerCommand(USER_CREATED, () => new CreateUserCommand());

// Example of sending a notification
// facade.sendNotification(USER_CREATED, { name: "John Doe" });
`;
    
    await fs.writeFile(path.join(projectPath, 'src/main.ts'), mainContent);
    
    // Create example README
    const readmeContent = `# ${path.basename(projectPath)}

A Coffee Maker Application

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Available Scripts

- \`npm run dev\`: Start development server
- \`npm run build\`: Build for production
- \`npm run test\`: Run tests
- \`npm run coffee\`: Run Coffee Maker CLI tools

## Project Structure

- \`src/\`: Source code
  - \`commands/\`: Command implementations
  - \`config/\`: Configuration files
  - \`mediators/\`: Mediator implementations
  - \`models/\`: Model implementations
  - \`proxies/\`: Proxy implementations
  - \`services/\`: Service implementations
  - \`stores/\`: Store implementations
`;
    
    await fs.writeFile(path.join(projectPath, 'README.md'), readmeContent);
}

async function createPackageJson(projectPath: string, projectName: string) {
    const packageJson = {
        name: projectName,
        version: '1.0.0',
        description: 'A Coffee Maker Application',
        main: 'dist/main.js',
        scripts: {
            dev: 'ts-node src/main.ts',
            build: 'tsc',
            test: 'jest',
            // coffee: run the framework CLI relative to the project folder (assumes framework is sibling)
            coffee: 'ts-node ../tools/cli/coffee-maker.ts'
        },
        dependencies: {
            '@thetinyspark/coffee-maker': 'file:../',
            '@thetinyspark/tiny-observer': '^1.0.0'
        },
        devDependencies: {
            '@types/jest': '^29.0.0',
            '@types/node': '^20.0.0',
            'jest': '^29.0.0',
            'ts-jest': '^29.0.0',
            'ts-node': '^10.0.0',
            'typescript': '^5.0.0'
        }
    };
    
    await fs.writeFile(
        path.join(projectPath, 'package.json'),
        JSON.stringify(packageJson, null, 2)
    );
}

async function initGit(projectPath: string) {
    try {
        await execAsync('git init', { cwd: projectPath });
        
        // Create .gitignore
        const gitignore = `node_modules/
dist/
coverage/
.DS_Store
*.log`;
        
        await fs.writeFile(path.join(projectPath, '.gitignore'), gitignore);
    } catch (error) {
        console.warn('Warning: Could not initialize git repository');
    }
}

async function installDependencies(projectPath: string) {
    console.log('Installing dependencies...');
    try {
        await execAsync('npm install', { cwd: projectPath });
    } catch (error) {
        console.error('Error installing dependencies:', error);
        throw error;
    }
}