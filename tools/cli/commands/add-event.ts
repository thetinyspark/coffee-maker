import * as fs from 'fs-extra';
import * as path from 'path';

export async function addEvent(eventName: string) {
    try {
        const configPath = path.resolve(process.cwd(), 'src/config/AppEvents.ts');
        
        // Ensure config directory exists
        await fs.ensureDir(path.dirname(configPath));
        
        // Format event name
        const formattedEventName = eventName.toUpperCase();
        const eventConstant = `export const ${formattedEventName} = "${formattedEventName}";\n`;
        
        // Check if file exists
        let content: string;
        try {
            content = await fs.readFile(configPath, 'utf-8');
        } catch {
            // If file doesn't exist, create with template
            const templatePath = path.resolve(__dirname, '../templates/AppEvents.ts.template');
            content = await fs.readFile(templatePath, 'utf-8');
        }
        
        // Add new event if it doesn't exist
        if (!content.includes(formattedEventName)) {
            // Find the last export statement
            const lastExportIndex = content.lastIndexOf('export const');
            if (lastExportIndex === -1) {
                // No exports yet, add after comments
                const commentEndIndex = content.indexOf('*/');
                if (commentEndIndex === -1) {
                    content = eventConstant + content;
                } else {
                    content = content.slice(0, commentEndIndex + 2) + '\\n\\n' + eventConstant + content.slice(commentEndIndex + 2);
                }
            } else {
                // Add after last export
                const insertIndex = content.indexOf('\\n', lastExportIndex) + 1;
                content = content.slice(0, insertIndex) + eventConstant + content.slice(insertIndex);
            }
            
            // Write updated content
            await fs.writeFile(configPath, content);
            
            console.log(`Added event ${formattedEventName}`);
        } else {
            console.log(`Event ${formattedEventName} already exists`);
        }
    } catch (error) {
        console.error('Error adding event:', error);
        process.exit(1);
    }
}