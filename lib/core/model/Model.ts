import Facade from "../Facade";
import IModel from "./IModel";

export default class Model implements IModel {
  private _facade: Facade | null = null;
  protected _state: any = null;

  setFacade(facade: Facade): void {
    this._facade = facade;
  }

  getFacade(): Facade {
    return this._facade;
  }

  setState(value: any): void {
    this._state = value;
  }

  getState(): any {
    return this._state;
  }

  resetState(): void {
    this._state = null;
  }
}
