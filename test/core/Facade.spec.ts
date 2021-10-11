import Facade from "../../lib/core/Facade";
import { ICommandFactoryMethod } from "../../lib/core/command/ICommand";
import { CHANGE_NAME_COMMAND, container, DEFAULT_FACADE, DEFAULT_MEDIATOR, DEFAULT_PROXY, DEFAULT_SERVICE } from "../utils/config.spec";
import IMediator from "../../lib/core/view/IMediator";
import IModel from "../../lib/core/model/IModel";
import IService from "../../lib/core/service/IService";
import IProxy from "../../lib/core/model/IProxy";

describe('Facade test suite', 
()=>{
    const facade:Facade = container.resolve(DEFAULT_FACADE);

    it('should be truthy', 
    ()=>{
        expect(facade).toBeTruthy();
    }); 

    it('should be able to register a command and trigger it', 
    ()=>{
        // given 
        const character = {name:"Merlin"}; 
        const method = container.get(CHANGE_NAME_COMMAND) as ICommandFactoryMethod; 

        // when 
        facade.registerCommand("CHANGE_NAME_COMMAND", method);
        facade.sendNotification("CHANGE_NAME_COMMAND", character);

        // then 
        expect(character.name).toEqual("Arthur");
    });

    it('should be able to register mediator and retrieve it', 
    ()=>{
        // given 
        const mediator:IMediator = container.resolve(DEFAULT_MEDIATOR);
        facade.registerMediator(DEFAULT_MEDIATOR, mediator);

        // when 
        const result:IMediator = facade.getMediator(DEFAULT_MEDIATOR);

        // then
        expect(result).toBe(mediator);
    });

    it('should set the facade of the registered mediator', 
    ()=>{
        // given 
        const mediator:IMediator = container.resolve(DEFAULT_MEDIATOR);
        facade.registerMediator(DEFAULT_MEDIATOR, mediator);

        // when 
        const result:IMediator = facade.getMediator(DEFAULT_MEDIATOR);

        // then
        expect(result.getFacade()).toBe(facade);
    });

    it('should be able to register proxy and retrieve it', 
    ()=>{
        // given 
        const model = container.resolve(DEFAULT_PROXY);
        facade.registerProxy(DEFAULT_PROXY, model);

        // when 
        const result:IProxy = facade.getProxy(DEFAULT_PROXY);

        // then
        expect(result).toBe(model);
    });

    it('should set the facade of the registered proxy', 
    ()=>{
        // given 
        const proxy:IProxy = container.resolve(DEFAULT_PROXY);
        facade.registerProxy(DEFAULT_PROXY, proxy);

        // when 
        const result:IProxy = facade.getProxy(DEFAULT_PROXY);

        // then
        expect(result.getFacade()).toBe(facade);
    });

    it('should be able to register service and retrieve it', 
    ()=>{
        // given 
        const service = container.resolve(DEFAULT_SERVICE);
        facade.registerService(DEFAULT_SERVICE, service);

        // when 
        const result:IService = facade.getService(DEFAULT_SERVICE);

        // then
        expect(result).toBe(service);
    });
})