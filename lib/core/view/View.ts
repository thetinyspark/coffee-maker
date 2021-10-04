import Facade from "../Facade";
import IView from "./IView";

export default class View implements IView{
    private _facade:Facade|null = null;

    setFacade(facade: Facade): void {
        this._facade = facade;
    }

    getFacade(): Facade {
        return this._facade;
    }
}