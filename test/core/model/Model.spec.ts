import Facade from "../../../lib/core/Facade";
import IModel from "../../../lib/core/model/IModel";
import { container, DEFAULT_FACADE, DEFAULT_MODEL } from "../../utils/config.spec"

describe('Model Test Suite', 
()=>{
    const model:IModel = container.resolve(DEFAULT_MODEL);
    const facade:Facade = container.resolve(DEFAULT_FACADE);

    it('should be able able to create a model', 
    ()=>{
        expect(model).toBeTruthy();
    }); 

    it('should be able to set/get Facade', 
    ()=>{     
        model.setFacade(facade);
        expect(model.getFacade()).toBe(facade);
    });
} )