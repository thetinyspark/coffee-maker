import IModel from "./IModel";

export default class Model implements IModel {
  protected _state: any = null;

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
