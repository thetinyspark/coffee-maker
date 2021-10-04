import IStoreModel from "./IStoreModel";
import Model from "./Model";

export default class StoreModel extends Model implements IStoreModel {
  private _old:any = null;

  setState(value: any): void {
    const newState = {...this._state, ...value};
    this._old = this._state;
    this._state = newState;
    this.deepFreeze(this._state);
  }

  getState(): any {
    return this._state;
  }

  getPrevState():any{
      return this._old;
  }

  resetState(): void {
    this._state = null;
    this._old = null;
  }

  updated(): boolean {
    const notSame = this._state !== this._old; 
    this._state = this._old;
    return notSame;
  }

  private deepFreeze(obj: any) {
    const propNames = Object.getOwnPropertyNames(obj);

    for (let name of propNames) {
      let value = obj[name];
      obj[name] =
        value && typeof value === "object" ? this.deepFreeze(value) : value;
    }

    return Object.freeze(obj);
  }
}
