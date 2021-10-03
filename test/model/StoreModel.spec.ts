import IStoreModel from "../../lib/core/model/IStoreModel";
import { container, DEFAULT_STORE } from "../utils/config.spec";

describe('AbstractModel test suite', 
()=>{
    const model:IStoreModel = container.resolve(DEFAULT_STORE); 

    beforeEach(
        ()=>{
            model.resetState();
        }
    )

    it('should be truthy', 
    ()=>{
        expect(model).toBeTruthy(); 
    }); 

    it('should return a null state by default', 
    ()=>{
        expect(model.getState()).toBeNull();
    }); 

    it('should be able to reset state and prev state', 
    ()=>{
        // given 
        const state1 = {value:10}; 
        const state2 = {name: 'Arthur'}; 

        // when 
        model.setState(state1); 
        model.setState(state2); 
        model.resetState(); 

        // then 
        expect(model.getState()).toBeNull();
        expect(model.getPrevState()).toBeNull();
    });

    it('should be able to add values to the state', 
    ()=>{
        // given 
        const state1 = {value:10}; 
        const state2 = {age: 15, name:"Arthur"}; 

        // when 
        model.setState(state1);
        model.setState(state2);

        // then 
        expect(model.getState()).toEqual( 
            {
                age:15,
                value: 10, 
                name: "Arthur"
            }
        );
    })

    it('should be able to define a state and retrieve it', 
    ()=>{
        // given 
        const newState = {value:10};
    
        // when
        model.setState({value:10}); 

        // then 
        expect(model.getState()).toEqual(newState);
    });

    it('state should be freezed', 
    ()=>{
        // given 
        const state = {value:10}; 

        // when 
        model.setState(state); 

        // then
        expect(Object.isFrozen(model.getState())).toBeTrue();
    }); 

    it('should be able to say if the state was updated or not', 
    ()=>{
        // given 
        const state = {value:10};

        // when 
        model.setState(state);

        // then 
        expect(model.updated()).toBeTrue();
        expect(model.updated()).toBeFalse();
        
        model.setState(state);
        expect(model.updated()).toBeTrue();
        expect(model.updated()).toBeFalse();
    });

    it('should be able to retrieve the previous state', 
    ()=>{

        // given
        const state1 = {value: 10}; 
        const state2 = {name: 'Arthur'}; 

        // when 
        model.setState(state1); 
        model.setState(state2); 

        // then 
        expect(model.getPrevState()).toEqual(state1); 
        expect(model.getState()).toEqual({...state1, ...state2});
    });
})