import * as fs from 'fs-extra';
import * as path from 'path';
import * as ejs from 'ejs';

export async function createCommand(name: string, eventKey: string) {
    try {
        // Convert name to PascalCase for class name
        const className = `${name.charAt(0).toUpperCase()}${name.slice(1)}Command`;
        
        // Read command template
        const templatePath = path.resolve(__dirname, '../templates/command.ts.template');
        const template = await fs.readFile(templatePath, 'utf-8');
        
        // Generate command file content
        const content = ejs.render(template, { className }, {});
        
        // Create commands directory if it doesn't exist
        const commandsDir = path.resolve(process.cwd(), 'src/commands');
        await fs.ensureDir(commandsDir);
        
        // Write command file
        const filePath = path.resolve(commandsDir, `${className}.ts`);
        await fs.writeFile(filePath, content);

        // Update main.ts to register the command
        await updateMainTs(className, eventKey);
        
        console.log(`Created command ${className} for event ${eventKey}`);
    } catch (error) {
        console.error('Error creating command:', error);
        process.exit(1);
    }
}

async function updateMainTs(className: string, eventKey: string) {
    const mainPath = path.resolve(process.cwd(), 'src/main.ts');
    
    try {
        // Read main.ts
        let content = await fs.readFile(mainPath, 'utf-8');
        
        // Add import for the command
        const lastImport = content.lastIndexOf('import');
        const importStatement = `import { ${className} } from "./commands/${className}";\n`;
        
        if (lastImport === -1) {
            content = importStatement + content;
        } else {
            const importEnd = content.indexOf('\n', lastImport) + 1;
            content = content.slice(0, importEnd) + importStatement + content.slice(importEnd);
        }
        
        // Add command registration
        const registrationStatement = `facade.registerCommand(${eventKey}, () => new ${className}());\n`;
        
        if (!content.includes('facade.registerCommand')) {
            // Add after facade creation
            const facadeCreation = content.indexOf('const facade = new Facade();');
            if (facadeCreation !== -1) {
                const insertIndex = content.indexOf('\n', facadeCreation) + 1;
                content = content.slice(0, insertIndex) + '\n' + registrationStatement + content.slice(insertIndex);
            }
        } else {
            // Add after last registration
            const lastRegistration = content.lastIndexOf('facade.registerCommand');
            const insertIndex = content.indexOf('\n', lastRegistration) + 1;
            content = content.slice(0, insertIndex) + registrationStatement + content.slice(insertIndex);
        }
        
        // Write updated content
        await fs.writeFile(mainPath, content);
    } catch (error) {
        console.error('Error updating main.ts:', error);
        throw error;
    }
}