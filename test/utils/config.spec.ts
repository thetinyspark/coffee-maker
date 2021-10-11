import ICommand from "../../lib/core/command/ICommand";
import Container from "../../lib/core/ioc/Container";
import StoreModel from "../../lib/core/model/StoreModel";
import IService from "../../lib/core/service/IService";
import Mediator from "../../lib/core/view/Mediator";
import Model from "../../lib/core/model/Model";
import Proxy from "../../lib/core/model/Proxy";
import Facade from "../../lib/core/Facade";
import { INotification } from "@thetinyspark/tiny-observer";

export const container = new Container(); 

/** default classes */
class ChangeNameCommand implements ICommand{
    execute(notification:INotification){
        notification.getPayload().name = "Arthur";
    }
}

class MyService implements IService{}


/** config */
export const CHANGE_NAME_COMMAND = "ChangeNameCommand";
export const DEFAULT_MEDIATOR = "MyMediator";
export const DEFAULT_MODEL = "MyModel";
export const DEFAULT_SERVICE = "MyService";
export const DEFAULT_STORE = "MyStoreModel";
export const DEFAULT_FACADE = "MyFacade";
export const DEFAULT_PROXY = "MyProxy";

container.register(CHANGE_NAME_COMMAND, ()=>new ChangeNameCommand()); 
container.register(DEFAULT_PROXY, ()=>new Proxy());
container.register(DEFAULT_MEDIATOR, ()=>new Mediator());
container.register(DEFAULT_MODEL, ()=>new Model());
container.register(DEFAULT_SERVICE, ()=>new MyService());
container.register(DEFAULT_STORE, ()=>new StoreModel());
container.register(DEFAULT_FACADE, ()=>new Facade());
