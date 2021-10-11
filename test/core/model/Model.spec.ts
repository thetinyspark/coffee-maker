import IModel from "../../../lib/core/model/IModel";
import { container, DEFAULT_MODEL } from "../../utils/config.spec"

describe('Model Test Suite', 
()=>{
    const model:IModel = container.resolve(DEFAULT_MODEL);

    beforeEach(
        ()=>{
            model.resetState();
        }
    );

    it('should be able able to create a model', 
    ()=>{
        expect(model).toBeTruthy();
    }); 

    it('should be able to define a state and retrieve it', 
    ()=>{
        // given 
        const newState = {value:10};
    
        // when
        model.setState({value:10}); 

        // then 
        expect(model.getState()).toEqual(newState);
    });

    it('should be able to reset state', 
    ()=>{
        // given 
        const newState = {value:10};
    
        // when
        model.setState({value:10}); 
        model.resetState();

        // then 
        expect(model.getState()).toBeNull();
    });

    it('should return a null state by default', 
    ()=>{
        expect(model.getState()).toBeNull();
    }); 

    it('should be able to reset state', 
    ()=>{
        // given 
        const newState = {value:10};
    
        // when
        model.setState({value:10}); 
        model.resetState();

        // then 
        expect(model.getState()).toBeNull();
    });
} )