/**
 * Container class for dependency injection
 * Manages the registration and resolution of dependencies
 * 
 * @example
 * ```typescript
 * // Create a new container
 * const container = new Container();
 * 
 * // Register a service
 * container.register('UserService', () => new UserService());
 * 
 * // Register a singleton service
 * container.register('LoggerService', () => new LoggerService(), true);
 * 
 * // Resolve services
 * const userService = container.resolve('UserService');
 * const logger1 = container.resolve('LoggerService');
 * const logger2 = container.resolve('LoggerService');
 * console.log(logger1 === logger2); // true (singleton)
 * ```
 */
export default class Container {
    /** Map of token to factory functions */
    private _map:Map<string,Function>;
    /** Map of singleton instances */
    private _singleton:Map<string,any>;

    /**
     * Creates a new Container instance and initializes the internal maps
     */
    constructor(){
        this.reset();
    }

    /**
     * Resolves a dependency by its token
     * For singleton dependencies, returns the same instance every time
     * For non-singleton dependencies, creates a new instance each time
     * 
     * @param key - The token to resolve
     * @returns The resolved instance or null if not found
     */
    public resolve(key:string):any{
        if( !this._map.has(key))
            return null; 
        
        if( this._singleton.has(key)){
            if( this._singleton.get(key) === null ){
                this._singleton.set(key, this._map.get(key).call(null));
            }
            return this._singleton.get(key); 
        }
        
        return this._map.get(key).call(null);
    }

    /**
     * Resets the container by clearing all registrations
     * Both regular and singleton instances are removed
     */
    public reset():void{
        this._map = new Map<string, Function>();
        this._singleton = new Map<string,any>();
    }

    /**
     * Registers a dependency with the container
     * 
     * @param key - The token to register the dependency under
     * @param factoryMethod - Function that creates the dependency
     * @param singleton - Whether to treat this as a singleton (default: false)
     * 
     * @example
     * ```typescript
     * // Register a regular service
     * container.register('api', () => new ApiService());
     * 
     * // Register a singleton service
     * container.register('config', () => new ConfigService(), true);
     * ```
     */
    public register(key:string, factoryMethod:Function, singleton:boolean = false):void{
        this._map.delete(key);
        this._singleton.delete(key);

        this._map.set(key, factoryMethod);
        
        if( singleton )
            this._singleton.set(key, null);
    }

    /**
     * Gets the factory method for a given token
     * 
     * @param key - The token to look up
     * @returns The factory method or null if not found
     */
    public get(key:string):Function|null{
        return this._map.get(key)||null;
    }
}

/**
 * Default root container instance used by the @Injectable decorator
 * This container is used when no specific container is provided
 */
export const rootContainer:Container = new Container();