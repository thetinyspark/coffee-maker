import Facade from "../Facade";
import IMediator from "./IMediator";

export default class Mediator implements IMediator{
    private _facade:Facade|null = null;

    setFacade(facade: Facade): void {
        this._facade = facade;
    }

    getFacade(): Facade {
        return this._facade;
    }
}