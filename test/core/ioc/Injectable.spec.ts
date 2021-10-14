import { rootContainer } from "../../../lib/core/ioc/Container";
import Injectable from "../../../lib/core/ioc/Injectable"
import IService from "../../../lib/core/service/IService"
import { container } from "../../utils/config.spec"


const TOKEN:string = 'injected:service';
@Injectable({token:TOKEN, container: container, singleton:true})
@Injectable({token:TOKEN})
class InjectedService implements IService{};

describe('Injectable test suite', 
()=>{
    it('should be able to resolve the injectable service', 
    ()=>{
        const service = container.resolve(TOKEN); 
        expect(service).toBeTruthy();
    }); 

    it('should resolve the same instance everytime', 
    ()=>{
        const service1 = container.resolve(TOKEN); 
        const service2 = container.resolve(TOKEN); 
        expect(service1).toBe(service2);
    });

    it('should be able to resolve the second injectable service on the default container', 
    ()=>{
        const service = rootContainer.resolve(TOKEN); 
        expect(service).toBeTruthy();
    });

    it('should resolve different instances', 
    ()=>{
        const service1 = rootContainer.resolve(TOKEN);
        const service2 = rootContainer.resolve(TOKEN);
        const service3 = container.resolve(TOKEN);
        expect(service1).not.toBe(service2);
        expect(service1).not.toBe(service3);
        expect(service2).not.toBe(service3);
    })
})