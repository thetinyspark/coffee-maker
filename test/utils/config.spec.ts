import ICommand from "../../lib/core/command/ICommand";
import Container from "../../lib/core/ioc/Container";
import StoreModel from "../../lib/core/model/StoreModel";
import IService from "../../lib/core/service/IService";
import IView from "../../lib/core/view/IView";
import IModel from "../../lib/core/model/IModel";

export const container = new Container(); 



/** default classes */
class ChangeNameCommand implements ICommand{
    execute(character){
        character.name = "Arthur";
    }
}

class MyView implements IView{}
class MyModel implements IModel{}
class MyService implements IService{}
class MyStore extends StoreModel{}


/** config */
export const CHANGE_NAME_COMMAND = "ChangeNameCommand";
export const DEFAULT_VIEW = "MyView";
export const DEFAULT_MODEL = "MyModel";
export const DEFAULT_SERVICE = "MyService";
export const DEFAULT_STORE = "MyStoreModel";

container.register(CHANGE_NAME_COMMAND, ()=>new ChangeNameCommand()); 
container.register(DEFAULT_VIEW, ()=>new MyView());
container.register(DEFAULT_MODEL, ()=>new MyModel());
container.register(DEFAULT_SERVICE, ()=>new MyService());
container.register(DEFAULT_STORE, ()=>new MyStore());
