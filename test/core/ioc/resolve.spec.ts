import resolve from '../../../lib/core/ioc/resolve';
import {container, INJECTED_SERVICE_TOKEN} from '../../utils/config';

describe('resolve test suite', 
()=>{
    it('should resolve the injected service on the default container', 
    ()=>{
        const service1 = resolve(INJECTED_SERVICE_TOKEN); 
        expect(service1).toBeTruthy();
    }); 

    it('should be able to resolve the injected service on the configured container', 
    ()=>{
        const service1 = resolve(INJECTED_SERVICE_TOKEN);
        const service2 = resolve(INJECTED_SERVICE_TOKEN, container);

        expect(service2).toBeTruthy();
        expect(service1).not.toBe(service2);
    })
})