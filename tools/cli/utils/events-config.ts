import * as fs from 'fs-extra';
import * as path from 'path';

export async function updateEventsConfig(eventKey: string): Promise<void> {
    const configPath = path.resolve(process.cwd(), 'src/config/events.config.ts');
    
    try {
        // Ensure config directory exists
        await fs.ensureDir(path.dirname(configPath));
        
        // Read existing config or create new one
        let content: string;
        try {
            content = await fs.readFile(configPath, 'utf-8');
        } catch {
            // If file doesn't exist, create with template
            content = `export const AppEvents = {} as const;
export type AppEvent = typeof AppEvents[keyof typeof AppEvents][keyof typeof AppEvents[keyof typeof AppEvents]];`;
        }
        
        // Parse event key format (e.g., "USER.CREATED" or "USER_CREATED")
        const parts = eventKey.includes('.') ? eventKey.split('.') : [eventKey.split('_')[0], eventKey.split('_').slice(1).join('_')];
        const [domain, event] = parts;
        
        // Update content to include new event
        const newContent = addEventToConfig(content, domain, event);
        
        // Write updated config
        await fs.writeFile(configPath, newContent);
        
        console.log(`Updated events config with ${eventKey}`);
    } catch (error) {
        console.error('Error updating events config:', error);
        throw error;
    }
}

function addEventToConfig(content: string, domain: string, event: string): string {
    // Simple string manipulation for now - could use TypeScript AST for more robust solution
    const domainUpper = domain.toUpperCase();
    const eventUpper = event.toUpperCase();
    
    if (content.includes(`${domainUpper}: {`)) {
        // Domain exists, add event
        const domainStart = content.indexOf(`${domainUpper}: {`);
        const domainEnd = content.indexOf('}', domainStart);
        
        const beforeDomain = content.slice(0, domainEnd);
        const afterDomain = content.slice(domainEnd);
        
        return `${beforeDomain},
        ${eventUpper}: "${domainUpper}_${eventUpper}"${afterDomain}`;
    } else {
        // Add new domain and event
        const insertPoint = content.indexOf('} as const;');
        
        const beforeInsert = content.slice(0, insertPoint);
        const afterInsert = content.slice(insertPoint);
        
        return `${beforeInsert}    ${domainUpper}: {
        ${eventUpper}: "${domainUpper}_${eventUpper}"
    }${afterInsert}`;
    }
}