import * as fs from 'fs-extra';
import * as path from 'path';

export async function updateFacadeConfig(
    componentName: string,
    eventKey: string,
    type: 'command' | 'mediator' | 'proxy' | 'service' = 'command'
): Promise<void> {
    const configPath = path.resolve(process.cwd(), 'src/config/facade.config.ts');
    
    try {
        // Ensure config directory exists
        await fs.ensureDir(path.dirname(configPath));
        
        // Read existing config or create new one
        let content: string;
        try {
            content = await fs.readFile(configPath, 'utf-8');
        } catch {
            // If file doesn't exist, create with template
            content = `import { Facade } from "@thetinyspark/coffee-maker";
import { AppEvents } from "./events.config";

export function configureFacade(facade: Facade): void {
    // Commands
    
    // Mediators
    
    // Proxies
    
    // Services
}`;
        }
        
        // Add registration based on component type
        const newContent = addComponentRegistration(content, componentName, eventKey, type);
        
        // Write updated config
        await fs.writeFile(configPath, newContent);
        
        console.log(`Updated facade config with ${componentName}`);
    } catch (error) {
        console.error('Error updating facade config:', error);
        throw error;
    }
}

function addComponentRegistration(
    content: string,
    componentName: string,
    eventKey: string,
    type: 'command' | 'mediator' | 'proxy' | 'service'
): string {
    // Find the appropriate section comment
    const sectionComment = type.charAt(0).toUpperCase() + type.slice(1) + 's';
    const insertPoint = content.indexOf(`    // ${sectionComment}`);
    
    if (insertPoint === -1) {
        throw new Error(`Could not find section for ${type}`);
    }
    
    const beforeInsert = content.slice(0, insertPoint + sectionComment.length + 6);
    const afterInsert = content.slice(insertPoint + sectionComment.length + 6);
    
    let registration = '';
    switch (type) {
        case 'command':
            registration = `\n    facade.registerCommand(AppEvents.${eventKey}, () => new ${componentName}());`;
            break;
        case 'mediator':
            registration = `\n    facade.registerMediator(new ${componentName}());`;
            break;
        case 'proxy':
            registration = `\n    facade.registerProxy(new ${componentName}());`;
            break;
        case 'service':
            registration = `\n    facade.getContainer().register("${componentName}", () => new ${componentName}());`;
            break;
    }
    
    return beforeInsert + registration + afterInsert;
}