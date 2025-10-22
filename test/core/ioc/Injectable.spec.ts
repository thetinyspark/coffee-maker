import { rootContainer } from "../../../lib/core/ioc/Container";
import { container, INJECTED_SERVICE_TOKEN } from "../../utils/config"


describe('Injectable test suite', 
()=>{
    it('should be able to resolve the injectable service', 
    ()=>{
        const service = container.resolve(INJECTED_SERVICE_TOKEN); 
        expect(service).toBeTruthy();
    }); 

    it('should resolve the same instance everytime', 
    ()=>{
        const service1 = container.resolve(INJECTED_SERVICE_TOKEN); 
        const service2 = container.resolve(INJECTED_SERVICE_TOKEN); 
        expect(service1).toBe(service2);
    });

    it('should be able to resolve the second injectable service on the default container', 
    ()=>{
        const service = rootContainer.resolve(INJECTED_SERVICE_TOKEN); 
        expect(service).toBeTruthy();
    });

    it('should resolve different instances', 
    ()=>{
        const service1 = rootContainer.resolve(INJECTED_SERVICE_TOKEN);
        const service2 = rootContainer.resolve(INJECTED_SERVICE_TOKEN);
        const service3 = container.resolve(INJECTED_SERVICE_TOKEN);
        expect(service1).not.toBe(service2);
        expect(service1).not.toBe(service3);
        expect(service2).not.toBe(service3);
    })
})