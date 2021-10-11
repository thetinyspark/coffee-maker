import Facade from "../Facade";

export default interface IProxy{
    setFacade(facade:Facade):void; 
    getFacade():Facade|null
}