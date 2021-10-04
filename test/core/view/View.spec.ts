import Facade from "../../../lib/core/Facade";
import IView from "../../../lib/core/view/IView";
import { container, DEFAULT_FACADE, DEFAULT_VIEW } from "../../utils/config.spec";

describe('View test suite', ()=>{
    const view:IView = container.resolve(DEFAULT_VIEW);
    const facade:Facade = container.resolve(DEFAULT_FACADE);

    it('should be able to create a view', 
    ()=>{
        expect(view).toBeTruthy();
    }); 

    it('should be able to set/get Facade', 
    ()=>{     
        view.setFacade(facade);
        expect(view.getFacade()).toBe(facade);
    });

    
})