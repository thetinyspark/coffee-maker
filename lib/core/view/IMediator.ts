import Facade from "../Facade";

/**
 * Interface defining the mediator pattern contract
 * Mediators act as intermediaries between view components and the application facade
 * 
 * @example
 * ```typescript
 * class DialogMediator implements IMediator {
 *     private facade: Facade = null;
 * 
 *     constructor(private dialog: HTMLDialogElement) {
 *         this.dialog.addEventListener("close", this.onDialogClose.bind(this));
 *     }
 * 
 *     setFacade(facade: Facade): void {
 *         this.facade = facade;
 *     }
 * 
 *     getFacade(): Facade {
 *         return this.facade;
 *     }
 * 
 *     private onDialogClose(): void {
 *         this.facade.sendNotification("DIALOG_CLOSED", this.dialog.returnValue);
 *     }
 * }
 * ```
 */
export default interface IMediator {
    /**
     * Sets the facade instance for this mediator
     * This method is called by the facade when the mediator is registered
     * @param facade - The facade instance to associate with this mediator
     */
    setFacade(facade:Facade):void; 

    /**
     * Gets the facade instance associated with this mediator
     * @returns The associated facade instance or null if not set
     */
    getFacade():Facade|null;
}