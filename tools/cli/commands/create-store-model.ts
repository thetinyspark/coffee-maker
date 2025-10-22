import * as fs from 'fs-extra';
import * as path from 'path';
import * as ejs from 'ejs';

export async function createStoreModel(name: string) {
    try {
        // Convert name to PascalCase for class name
        const className = `${name.charAt(0).toUpperCase()}${name.slice(1)}StoreModel`;
        
        // Read store model template
        const templatePath = path.resolve(__dirname, '../templates/store-model.ts.template');
        const template = await fs.readFile(templatePath, 'utf-8');
        
        // Generate store model file content
        const content = ejs.render(template, { className }, {});
        
        // Create stores directory if it doesn't exist
        const storesDir = path.resolve(process.cwd(), 'src/stores');
        await fs.ensureDir(storesDir);
        
        // Write store model file
        const filePath = path.resolve(storesDir, `${className}.ts`);
        await fs.writeFile(filePath, content);
        
        console.log(`Created store model ${className}`);
    } catch (error) {
        console.error('Error creating store model:', error);
        process.exit(1);
    }
}