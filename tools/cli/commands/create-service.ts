import * as fs from 'fs-extra';
import * as path from 'path';
import * as ejs from 'ejs';

export async function createService(name: string) {
    try {
        // Convert name to PascalCase for class name
        const className = `${name.charAt(0).toUpperCase()}${name.slice(1)}Service`;
        
        // Read service template
        const templatePath = path.resolve(__dirname, '../templates/service.ts.template');
        const template = await fs.readFile(templatePath, 'utf-8');
        
        // Generate service file content
        const content = ejs.render(template, { className }, {});
        
        // Create services directory if it doesn't exist
        const servicesDir = path.resolve(process.cwd(), 'src/services');
        await fs.ensureDir(servicesDir);
        
        // Write service file
        const filePath = path.resolve(servicesDir, `${className}.ts`);
        await fs.writeFile(filePath, content);

        // Update main.ts to register the service
        await updateMainTs(className);
        
        console.log(`Created service ${className}`);
    } catch (error) {
        console.error('Error creating service:', error);
        process.exit(1);
    }
}

async function updateMainTs(className: string) {
    const mainPath = path.resolve(process.cwd(), 'src/main.ts');
    
    try {
        // Read main.ts
        let content = await fs.readFile(mainPath, 'utf-8');
        
        // Add import for the service
        const lastImport = content.lastIndexOf('import');
        const importStatement = `import { ${className} } from "./services/${className}";\n`;
        
        if (lastImport === -1) {
            content = importStatement + content;
        } else {
            const importEnd = content.indexOf('\n', lastImport) + 1;
            content = content.slice(0, importEnd) + importStatement + content.slice(importEnd);
        }
        
        // Add service registration
        const registrationStatement = `facade.getContainer().register("${className}", () => new ${className}());\n`;
        
        if (!content.includes('facade.getContainer().register')) {
            // Add after facade creation
            const facadeCreation = content.indexOf('const facade = new Facade();');
            if (facadeCreation !== -1) {
                const insertIndex = content.indexOf('\n', facadeCreation) + 1;
                content = content.slice(0, insertIndex) + '\n' + registrationStatement + content.slice(insertIndex);
            }
        } else {
            // Add after last registration
            const lastRegistration = content.lastIndexOf('facade.getContainer().register');
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