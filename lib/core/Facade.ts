import { ICommandFactoryMethod } from "./command/ICommand";
import IProxy from "./model/IProxy";
import IMediator from "./view/IMediator";
import IService from "./service/IService";
import { Emitter, INotification } from "@thetinyspark/tiny-observer";

/**
 * Core Facade class that implements the Facade pattern
 * Acts as a centralized point of communication between different parts of the application
 * 
 * The Facade manages:
 * - Commands (Controller layer)
 * - Proxies (Model layer)
 * - Mediators (View layer)
 * - Services (Business Services)
 * 
 * @example
 * ```typescript
 * // Create a facade instance
 * const facade = new Facade();
 * 
 * // Register a command
 * facade.registerCommand("SAVE_USER", () => new SaveUserCommand());
 * 
 * // Register a proxy
 * facade.registerProxy("userProxy", new UserProxy());
 * 
 * // Register a mediator
 * facade.registerMediator("userList", new UserListMediator());
 * 
 * // Register a service
 * facade.registerService("authService", new AuthService());
 * 
 * // Send a notification (triggers commands)
 * facade.sendNotification("SAVE_USER", { name: "John" });
 * 
 * // Access registered components
 * const userProxy = facade.getProxy("userProxy");
 * const userList = facade.getMediator("userList");
 * const authService = facade.getService("authService");
 * ```
 */
export default class Facade extends Emitter {
    /** Map of registered proxies */
    private _proxies:Map<string,IProxy> = new Map<string,IProxy>();
    /** Map of registered mediators */
    private _mediators:Map<string,IMediator> = new Map<string,IMediator>();
    /** Map of registered services */
    private _services:Map<string,IService> = new Map<string,IService>();

    /**
     * Registers a command with the facade
     * Commands are executed when a notification with matching key is sent
     * 
     * @param key - The notification type that will trigger this command
     * @param factoryMethod - Factory method that creates command instances
     * 
     * @example
     * ```typescript
     * facade.registerCommand("SAVE_USER", () => new SaveUserCommand());
     * ```
     */
    public registerCommand(key:string, factoryMethod:ICommandFactoryMethod):void{
        this.subscribe(
            key, 
            (notification:INotification)=>{
                return factoryMethod.call(null).execute(notification);
            }
        );
    }

    /**
     * Registers a proxy with the facade
     * Proxies handle data access and business logic
     * 
     * @param key - Unique identifier for the proxy
     * @param proxy - The proxy instance to register
     * 
     * @example
     * ```typescript
     * facade.registerProxy("userProxy", new UserProxy());
     * ```
     */
    public registerProxy(key:string, proxy:IProxy):void{
        proxy.setFacade(this);
        this._proxies.set(key, proxy);
    }

    /**
     * Registers a mediator with the facade
     * Mediators handle view-related logic
     * 
     * @param key - Unique identifier for the mediator
     * @param mediator - The mediator instance to register
     * 
     * @example
     * ```typescript
     * facade.registerMediator("userList", new UserListMediator());
     * ```
     */
    public registerMediator(key:string, mediator:IMediator):void{
        mediator.setFacade(this);
        this._mediators.set(key, mediator);
    }

    /**
     * Registers a service with the facade
     * Services provide reusable business logic
     * 
     * @param key - Unique identifier for the service
     * @param service - The service instance to register
     * 
     * @example
     * ```typescript
     * facade.registerService("authService", new AuthService());
     * ```
     */
    public registerService(key:string, service:IService):void{
        this._services.set(key, service);
    }

    /**
     * Retrieves a registered service
     * @param key - The service identifier
     * @returns The service instance or null if not found
     */
    public getService(key:string):IService{
        return this._services.get(key) || null;
    }

    /**
     * Retrieves a registered proxy
     * @param key - The proxy identifier
     * @returns The proxy instance or null if not found
     */
    public getProxy(key:string):IProxy{
        return this._proxies.get(key) || null;
    }

    /**
     * Retrieves a registered mediator
     * @param key - The mediator identifier
     * @returns The mediator instance or null if not found
     */
    public getMediator(key:string):IMediator{
        return this._mediators.get(key) || null;
    }

    /**
     * Sends a notification through the system
     * Notifications trigger registered commands and can be listened to by other components
     * 
     * @param key - The notification type
     * @param payload - Optional data to send with the notification
     * 
     * @example
     * ```typescript
     * facade.sendNotification("USER_LOGGED_IN", { userId: 123 });
     * ```
     */
    public sendNotification = (key:string, payload:any = {}):void =>{
        this.emit(key, payload);
    };

    public query = (key:string, payload:any = {}):Promise<any> => {
        const promise = this.emit(key, payload, true) as Promise<any>;
        return promise.then( 
            (results:any[])=>{
                if(results.length === 1)
                    return results.shift();
                return results;
            }
        );
    };
}