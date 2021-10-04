import Facade from "../Facade";

export default interface IModel{
    setFacade(facade:Facade):void; 
    getFacade():Facade|null;
}