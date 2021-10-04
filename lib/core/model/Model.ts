import Facade from "../Facade";
import IModel from "./IModel";

export default class Model implements IModel{
    private _facade:Facade|null = null;

    setFacade(facade: Facade): void {
        this._facade = facade;
    }

    getFacade(): Facade {
        return this._facade;
    }
}