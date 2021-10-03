import ICommand from "../../lib/core/command/ICommand";
import Container from "../../lib/core/ioc/Container";
import IModel from "../../lib/core/model/IModel";
import IService from "../../lib/core/service/IService";
import IView from "../../lib/core/view/IView";

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


/** config */
export const CHANGE_NAME_COMMAND = "ChangeNameCommand";
export const DEFAULT_VIEW = "MyView";
export const DEFAULT_MODEL = "MyModel";
export const DEFAULT_SERVICE = "MyService";

container.register(CHANGE_NAME_COMMAND, ()=>new ChangeNameCommand()); 
container.register(DEFAULT_VIEW, ()=>new MyView());
container.register(DEFAULT_MODEL, ()=>new MyModel());
container.register(DEFAULT_SERVICE, ()=>new MyService());