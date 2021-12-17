import { ICommandFactoryMethod, IMediator, IProxy, IService } from "../..";
import Facade from "../Facade";

export type ModuleConfiguration = {
    commands: {key:string, factory:ICommandFactoryMethod}[], 
    proxies:{key:string, instance:IProxy}[],
    mediators:{key:string, instance:IMediator}[],
    services:{key:string, instance:IService}[],
};

export default interface ICoffeeModule{
    load(facade:Facade):void;
    configure(config:ModuleConfiguration):void;
    getConfiguration():ModuleConfiguration;
}