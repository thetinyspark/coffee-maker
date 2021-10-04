import Facade from "../Facade";

export default interface IView{
    setFacade(facade:Facade):void; 
    getFacade():Facade|null;
}