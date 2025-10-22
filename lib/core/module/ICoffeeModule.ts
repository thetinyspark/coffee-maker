import { ICommandFactoryMethod, IMediator, IProxy, IService } from "../..";
import Facade from "../Facade";

/**
 * Configuration type for a CoffeeModule
 * @interface ModuleConfiguration
 */
export type ModuleConfiguration = {
    /** Array of command configurations with their registration keys and factory methods */
    commands: {key:string, factory:ICommandFactoryMethod}[], 
    /** Array of proxy configurations with their registration keys and instances */
    proxies:{key:string, instance:IProxy}[],
    /** Array of mediator configurations with their registration keys and instances */
    mediators:{key:string, instance:IMediator}[],
    /** Array of service configurations with their registration keys and instances */
    services:{key:string, instance:IService}[],
};

/**
 * Interface for Coffee Module implementation
 * Defines the contract for module configuration and loading
 * @interface ICoffeeModule
 */
export default interface ICoffeeModule {
    /**
     * Loads the module configuration into the provided facade
     * This method registers all commands, proxies, mediators, and services
     * defined in the module's configuration
     * @param facade The facade instance to load the configuration into
     */
    load(facade:Facade):void;

    /**
     * Configures the module with the provided configuration
     * @param config The module configuration containing commands, proxies, mediators, and services
     */
    configure(config:ModuleConfiguration):void;

    /**
     * Returns the current module configuration
     * @returns The current ModuleConfiguration or null if not configured
     */
    getConfiguration():ModuleConfiguration;
}