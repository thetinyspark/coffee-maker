import ICommand from "../../lib/core/command/ICommand";
import Container from "../../lib/core/ioc/Container";
import StoreModel from "../../lib/core/model/StoreModel";
import IService from "../../lib/core/service/IService";
import View from "../../lib/core/view/View";
import Model from "../../lib/core/model/Model";
import Facade from "../../lib/core/Facade";

export const container = new Container(); 



/** default classes */
class ChangeNameCommand implements ICommand{
    execute(character){
        character.name = "Arthur";
    }
}

class MyService implements IService{}


/** config */
export const CHANGE_NAME_COMMAND = "ChangeNameCommand";
export const DEFAULT_VIEW = "MyView";
export const DEFAULT_MODEL = "MyModel";
export const DEFAULT_SERVICE = "MyService";
export const DEFAULT_STORE = "MyStoreModel";
export const DEFAULT_FACADE = "MyFacade";

container.register(CHANGE_NAME_COMMAND, ()=>new ChangeNameCommand()); 
container.register(DEFAULT_VIEW, ()=>new View());
container.register(DEFAULT_MODEL, ()=>new Model());
container.register(DEFAULT_SERVICE, ()=>new MyService());
container.register(DEFAULT_STORE, ()=>new StoreModel());
container.register(DEFAULT_FACADE, ()=>new Facade());
