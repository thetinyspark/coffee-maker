import Facade from "../../../lib/core/Facade";
import IProxy from "../../../lib/core/model/IProxy";
import { container, DEFAULT_FACADE, DEFAULT_PROXY } from "../../utils/config"

describe('Proxy Test Suite', 
()=>{
    const proxy:IProxy = container.resolve(DEFAULT_PROXY);
    const facade:Facade = container.resolve(DEFAULT_FACADE);

    it('should be able able to create a model', 
    ()=>{
        expect(proxy).toBeTruthy();
    }); 

    it('should be able to set/get Facade', 
    ()=>{     
        proxy.setFacade(facade);
        expect(proxy.getFacade()).toBe(facade);
    });
} )