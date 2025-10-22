import Facade from "../Facade";

/**
 * Interface for Proxy objects in the model layer
 * Proxies encapsulate data access and business logic, and are managed by the Facade
 * 
 * @example
 * ```typescript
 * class UserProxy implements IProxy {
 *     private facade: Facade | null = null;
 *     setFacade(facade: Facade): void { this.facade = facade; }
 *     getFacade(): Facade | null { return this.facade; }
 * }
 * ```
 */
export default interface IProxy{
    /**
     * Associates this proxy with a facade instance
     * @param facade - The facade to associate with
     */
    setFacade(facade:Facade):void; 

    /**
     * Retrieves the associated facade instance
     * @returns Facade instance or null if not set
     */
    getFacade():Facade|null
}