import Facade from "../Facade";
import ICoffeeModule, { ModuleConfiguration } from "./ICoffeeModule";

export default class CoffeeModule implements ICoffeeModule{
    private _config:ModuleConfiguration = null;

    load(facade: Facade): void {
        if( this._config === null )
            return; 
        
        this._config.proxies.forEach( 
            (value)=>{
                facade.registerProxy(value.key, value.instance);
            }
        );

        this._config.mediators.forEach( 
            (value)=>{
                facade.registerMediator(value.key, value.instance);
            }
        );

        this._config.services.forEach( 
            (value)=>{
                facade.registerService(value.key, value.instance);
            }
        );

        this._config.commands.forEach( 
            (value)=>{
                facade.registerCommand(value.key, value.factory);
            }
        );
    }

    getConfiguration(): ModuleConfiguration {
        return this._config;
    }

    configure(config: ModuleConfiguration): void {
        this._config = config;
    }
}