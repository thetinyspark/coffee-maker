import Facade from "../../../lib/core/Facade";
import IMediator from "../../../lib/core/view/IMediator";
import { container, DEFAULT_FACADE, DEFAULT_MEDIATOR } from "../../utils/config";

describe('View test suite', ()=>{
    const mediator:IMediator = container.resolve(DEFAULT_MEDIATOR);
    const facade:Facade = container.resolve(DEFAULT_FACADE);

    it('should be able to create a mediator', 
    ()=>{
        expect(mediator).toBeTruthy();
    }); 

    it('should be able to set/get Facade', 
    ()=>{     
        mediator.setFacade(facade);
        expect(mediator.getFacade()).toBe(facade);
    });
})