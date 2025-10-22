import * as fs from 'fs-extra';
import * as path from 'path';

export async function addMediatorListener(mediatorName: string, eventKey: string) {
    try {
        // Convert name to PascalCase and ensure it ends with 'Mediator'
        let className = mediatorName;
        if (!className.endsWith('Mediator')) {
            className = `${className}Mediator`;
        }
        className = `${className.charAt(0).toUpperCase()}${className.slice(1)}`;
        
        const mediatorPath = path.resolve(process.cwd(), `src/mediators/${className}.ts`);
        
        // Check if mediator exists
        if (!await fs.pathExists(mediatorPath)) {
            console.error(`Mediator ${className} not found`);
            process.exit(1);
        }
        
        // Read mediator file
        let content = await fs.readFile(mediatorPath, 'utf-8');
        
        // Add event to listNotificationInterests
        if (!content.includes(eventKey)) {
            // Find the listNotificationInterests array
            const interestsStart = content.indexOf('listNotificationInterests(): string[] {');
            if (interestsStart === -1) {
                console.error('Could not find listNotificationInterests method');
                process.exit(1);
            }
            
            const returnStart = content.indexOf('return [', interestsStart);
            if (returnStart === -1) {
                console.error('Could not find return statement in listNotificationInterests');
                process.exit(1);
            }
            
            // Add event to the array
            const arrayStart = returnStart + 'return ['.length;
            const arrayEnd = content.indexOf(']', arrayStart);
            const currentArray = content.slice(arrayStart, arrayEnd).trim();
            
            const newArray = currentArray
                ? `${currentArray},\n            ${eventKey}`
                : `\n            ${eventKey}\n        `;
            
            content = content.slice(0, arrayStart) + newArray + content.slice(arrayEnd);
            
            // Add handler method
            const handlerName = `handle${eventKey.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ).join('')}`;
            
            const handlerMethod = `\n    ${handlerName}(data: any): void {
        console.log('${eventKey} handled with data:', data);
    }\n`;
            
            // Add handler before the listNotificationInterests method
            const insertPoint = content.indexOf('listNotificationInterests')-1;
            content = content.slice(0, insertPoint) + handlerMethod + content.slice(insertPoint);
            
            // Update handleNotification method
            const handleNotificationStart = content.indexOf('handleNotification(notificationName: string, data: any): void {');
            if (handleNotificationStart !== -1) {
                const methodStart = content.indexOf('{', handleNotificationStart) + 1;
                const methodEnd = content.indexOf('}', methodStart);
                
                // Add case to switch statement or create new switch
                const switchContent = content.slice(methodStart, methodEnd).trim();
                let newHandleNotification;
                
                if (switchContent.includes('switch')) {
                    // Add case to existing switch
                    const switchEnd = content.lastIndexOf('break;', methodEnd) + 'break;'.length;
                    newHandleNotification = content.slice(methodStart, switchEnd) +
                        `\n            case ${eventKey}:\n` +
                        `                this.${handlerName}(data);\n` +
                        '                break;\n' +
                        content.slice(switchEnd);
                } else {
                    // Create new switch statement
                    newHandleNotification = `
        switch(notificationName) {
            case ${eventKey}:
                this.${handlerName}(data);
                break;
        }`;
                }
                
                content = content.slice(0, methodStart) + newHandleNotification + content.slice(methodEnd);
            }
            
            // Write updated content
            await fs.writeFile(mediatorPath, content);
            
            console.log(`Added ${eventKey} listener to ${className}`);
        } else {
            console.log(`${className} already listening to ${eventKey}`);
        }
    } catch (error) {
        console.error('Error adding mediator listener:', error);
        process.exit(1);
    }
}