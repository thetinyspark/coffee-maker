import Facade from "../../lib/core/Facade";
import { ICommandFactoryMethod } from "../../lib/core/command/ICommand";
import { CHANGE_NAME_COMMAND, container, DEFAULT_FACADE, DEFAULT_MODEL, DEFAULT_SERVICE, DEFAULT_VIEW } from "../utils/config.spec";
import IView from "../../lib/core/view/IView";
import IModel from "../../lib/core/model/IModel";
import IService from "../../lib/core/service/IService";

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
        facade.notify("CHANGE_NAME_COMMAND", character);

        // then 
        expect(character.name).toEqual("Arthur");
    });

    it('should be able to register view and retrieve it', 
    ()=>{
        // given 
        const view = container.resolve(DEFAULT_VIEW);
        facade.registerView(DEFAULT_VIEW, view);

        // when 
        const result:IView = facade.getView(DEFAULT_VIEW);

        // then
        expect(result).toBe(view);
    });

    it('should be able to register model and retrieve it', 
    ()=>{
        // given 
        const model = container.resolve(DEFAULT_MODEL);
        facade.registerModel(DEFAULT_MODEL, model);

        // when 
        const result:IModel = facade.getModel(DEFAULT_MODEL);

        // then
        expect(result).toBe(model);
    });

    it('should set the facade of the registered model', 
    ()=>{
        // given 
        const model = container.resolve(DEFAULT_MODEL);
        facade.registerModel(DEFAULT_MODEL, model);

        // when 
        const result:IModel = facade.getModel(DEFAULT_MODEL);

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