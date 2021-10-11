import Facade from "../Facade";

export default interface IMediator{
    setFacade(facade:Facade):void; 
    getFacade():Facade|null;
}