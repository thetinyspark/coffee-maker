"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModel = void 0;
const fs = require("fs-extra");
const path = require("path");
const ejs = require("ejs");
async function createModel(name) {
    try {
        // Convert name to PascalCase for class name
        const className = `${name.charAt(0).toUpperCase()}${name.slice(1)}Model`;
        // Read model template
        const templatePath = path.resolve(__dirname, '../templates/model.ts.template');
        const template = await fs.readFile(templatePath, 'utf-8');
        // Generate model file content
        const content = ejs.render(template, { className }, {});
        // Create models directory if it doesn't exist
        const modelsDir = path.resolve(process.cwd(), 'src/models');
        await fs.ensureDir(modelsDir);
        // Write model file
        const filePath = path.resolve(modelsDir, `${className}.ts`);
        await fs.writeFile(filePath, content);
        console.log(`Created model ${className}`);
    }
    catch (error) {
        console.error('Error creating model:', error);
        process.exit(1);
    }
}
exports.createModel = createModel;
