/**
 * Interface defining the core functionality of a model
 * Models are responsible for managing state and business logic
 * 
 * @example
 * ```typescript
 * class CustomModel implements IModel {
 *     private _data: any;
 * 
 *     setState(value: any): void {
 *         this._data = value;
 *         // Additional state management logic
 *     }
 * 
 *     getState(): any {
 *         return this._data;
 *     }
 * 
 *     resetState(): void {
 *         this._data = null;
 *     }
 * }
 * ```
 */
export default interface IModel {
    /**
     * Updates the model's internal state
     * @param value - The new state value
     */
    setState(value:any):void;

    /**
     * Retrieves the current state
     * @returns The current state value
     */
    getState():any;

    /**
     * Resets the state to its initial value
     * Typically sets the state to null
     */
    resetState():void;
}