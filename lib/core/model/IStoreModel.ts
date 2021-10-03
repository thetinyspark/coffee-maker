import IModel from "./IModel";

export default interface IStoreModel extends IModel{
    setState(value:any):void;
    getState():any;
    resetState():void; 
    updated():boolean;
    getPrevState():any;
}