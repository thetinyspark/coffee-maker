import IModel from "./IModel";

/**
 * Interface for store-like models that keep track of previous state.
 * Extends the basic IModel interface with history and change-detection helpers.
 *
 * Example (illustrative):
 *  class AppStore implements IStoreModel {
 *    private _state: any = null;
 *    private _prev: any = null;
 *    // setState merges or replaces the current state
 *    // getState returns the current snapshot
 *    // resetState clears current and previous snapshots
 *    // updated returns true if the state changed since the last snapshot
 *    // getPrevState returns the previously stored snapshot
 *  }
 */
export default interface IStoreModel extends IModel {
  /** Merge/assign a new partial state into the current state */
  setState(value: any): void;
  /** Get the current state snapshot */
  getState(): any;
  /** Reset current and previous state */
  resetState(): void;
  /** Returns true if state changed since last snapshot */
  updated(): boolean;
  /** Returns the previous state snapshot */
  getPrevState(): any;
}