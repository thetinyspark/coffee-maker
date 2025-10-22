"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProxy = void 0;
const fs = require("fs-extra");
const path = require("path");
const ejs = require("ejs");
async function createProxy(name) {
    try {
        // Convert name to PascalCase for class name
        const className = `${name.charAt(0).toUpperCase()}${name.slice(1)}Proxy`;
        // Read proxy template
        const templatePath = path.resolve(__dirname, '../templates/proxy.ts.template');
        const template = await fs.readFile(templatePath, 'utf-8');
        // Generate proxy file content
        const content = ejs.render(template, { className }, {});
        // Create proxies directory if it doesn't exist
        const proxiesDir = path.resolve(process.cwd(), 'src/proxies');
        await fs.ensureDir(proxiesDir);
        // Write proxy file
        const filePath = path.resolve(proxiesDir, `${className}.ts`);
        await fs.writeFile(filePath, content);
        // Update main.ts to register the proxy
        await updateMainTs(className);
        console.log(`Created proxy ${className}`);
    }
    catch (error) {
        console.error('Error creating proxy:', error);
        process.exit(1);
    }
}
exports.createProxy = createProxy;
async function updateMainTs(className) {
    const mainPath = path.resolve(process.cwd(), 'src/main.ts');
    try {
        // Read main.ts
        let content = await fs.readFile(mainPath, 'utf-8');
        // Add import for the proxy
        const lastImport = content.lastIndexOf('import');
        const importStatement = `import { ${className} } from "./proxies/${className}";\n`;
        if (lastImport === -1) {
            content = importStatement + content;
        }
        else {
            const importEnd = content.indexOf('\n', lastImport) + 1;
            content = content.slice(0, importEnd) + importStatement + content.slice(importEnd);
        }
        // Add proxy registration
        const registrationStatement = `facade.registerProxy(new ${className}());\n`;
        if (!content.includes('facade.registerProxy')) {
            // Add after facade creation
            const facadeCreation = content.indexOf('const facade = new Facade();');
            if (facadeCreation !== -1) {
                const insertIndex = content.indexOf('\n', facadeCreation) + 1;
                content = content.slice(0, insertIndex) + '\n' + registrationStatement + content.slice(insertIndex);
            }
        }
        else {
            // Add after last registration
            const lastRegistration = content.lastIndexOf('facade.registerProxy');
            const insertIndex = content.indexOf('\n', lastRegistration) + 1;
            content = content.slice(0, insertIndex) + registrationStatement + content.slice(insertIndex);
        }
        // Write updated content
        await fs.writeFile(mainPath, content);
    }
    catch (error) {
        console.error('Error updating main.ts:', error);
        throw error;
    }
}
