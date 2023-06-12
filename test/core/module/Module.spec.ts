import { Facade, ICommandFactoryMethod, IMediator, IProxy, IService } from "../../../lib";
import CoffeeModule from "../../../lib/core/module/CoffeeModule";
import { ModuleConfiguration } from "../../../lib/core/module/ICoffeeModule";
import { CHANGE_NAME_COMMAND, container, DEFAULT_FACADE, DEFAULT_MEDIATOR, DEFAULT_PROXY, DEFAULT_SERVICE } from "../../utils/config.spec";

describe('Model Test Suite', 
()=>{

    const commandFactory:ICommandFactoryMethod = container.get(CHANGE_NAME_COMMAND) as ICommandFactoryMethod;
    const proxy:IProxy = container.resolve(DEFAULT_PROXY) as IProxy;
    const service:IService = container.resolve(DEFAULT_SERVICE) as IService;
    const mediator:IMediator = container.resolve(DEFAULT_MEDIATOR) as IMediator;


    it('should be able to create a module instance', 
    ()=>{
        const myModule = new CoffeeModule()
        expect(myModule).toBeTruthy();
    }); 

    it('should have a null configuration by default', 
    ()=>{
        // given
        const myModule = new CoffeeModule()
        // then 
        expect( myModule.getConfiguration() ).toBeNull();
    });

    it('should be able to set and get configuration', 
    ()=>{
        // given
        const myModule = new CoffeeModule()
        const configuration:ModuleConfiguration = {
            commands: [], 
            proxies:[], 
            services:[], 
            mediators:[{key:DEFAULT_MEDIATOR, instance: mediator}]
        } as ModuleConfiguration;

        // when 
        myModule.configure(configuration); 

        // then 
        expect( myModule.getConfiguration() ).toBe(configuration);
    })

    it('should be able to configure a module and retrieve mediator', 
    ()=>{
        // given
        const facade:Facade = container.resolve(DEFAULT_FACADE);
        const myModule = new CoffeeModule();
        const configuration:ModuleConfiguration = {
            commands: [], 
            proxies:[], 
            services:[], 
            mediators:[{key:DEFAULT_MEDIATOR, instance: mediator}]
        } as ModuleConfiguration;

        // when

        myModule.configure(configuration);
        myModule.load(facade);

        // then
        expect(facade.getMediator(DEFAULT_MEDIATOR)).toBe(mediator);
    });

    it('should abort loading if configuration is null', 
    ()=>{
        // given
        const facade:Facade = container.resolve(DEFAULT_FACADE);
        const myModule = new CoffeeModule();
        // when
        myModule.load(facade);

        // then
        expect(facade.getMediator(DEFAULT_MEDIATOR)).toBeNull();
    });

    it('should be able to configure a module and retrieve service', 
    ()=>{
        // given
        const facade:Facade = container.resolve(DEFAULT_FACADE);
        const myModule = new CoffeeModule();
        const configuration:ModuleConfiguration = {
            commands: [], 
            proxies:[], 
            services:[{key:DEFAULT_SERVICE, instance: service}], 
            mediators:[]
        } as ModuleConfiguration;

        // when

        myModule.configure(configuration);
        myModule.load(facade);

        // then
        expect(facade.getService(DEFAULT_SERVICE)).toBe(service);
    });

    it('should be able to configure a module and retrieve proxy', 
    ()=>{
        // given
        const facade:Facade = container.resolve(DEFAULT_FACADE);
        const myModule = new CoffeeModule();
        const configuration:ModuleConfiguration = {
            commands: [], 
            proxies:[{key:DEFAULT_PROXY, instance: proxy}], 
            services:[], 
            mediators:[]
        } as ModuleConfiguration;

        // when

        myModule.configure(configuration);
        myModule.load(facade);

        // then
        expect(facade.getProxy(DEFAULT_PROXY)).toBe(proxy);
    });

    it('should be able to configure a module and execute command factory', 
    ()=>{
        // given
        const facade:Facade = container.resolve(DEFAULT_FACADE);
        const myModule = new CoffeeModule();
        const character = {name:"Merlin"}; 
        const configuration:ModuleConfiguration = {
            commands: [{key:CHANGE_NAME_COMMAND, factory: commandFactory}], 
            proxies:[], 
            services:[], 
            mediators:[]
        } as ModuleConfiguration;

        // when
        myModule.configure(configuration);
        myModule.load(facade);
        facade.sendNotification(CHANGE_NAME_COMMAND, character);

        // then
        expect(character.name).toEqual("Arthur");
    });
} )