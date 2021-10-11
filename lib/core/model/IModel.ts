import Facade from "../Facade";

export default interface IModel{
    setState(value:any):void;
    getState():any;
    resetState():void; 
}