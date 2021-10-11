import Facade from "../Facade";
import IProxy from "./IProxy";

export default class Proxy implements IProxy {
  private _facade: Facade | null = null;

  setFacade(facade: Facade): void {
    this._facade = facade;
  }

  getFacade(): Facade {
    return this._facade;
  }
}
