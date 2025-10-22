import { INotification } from "@thetinyspark/tiny-observer";

/**
 * Interface defining the command pattern contract
 * Commands encapsulate a request as an object, allowing parameterization of clients
 * with different requests and support undoable operations
 * 
 * @example
 * ```typescript
 * class AddUserCommand implements ICommand {
 *     constructor(private userModel: UserModel) {}
 * 
 *     execute(notification: INotification): void {
 *         const userData = notification.getData();
 *         this.userModel.addUser(userData);
 *     }
 * }
 * 
 * // Usage with Facade
 * facade.registerCommand("ADD_USER", () => new AddUserCommand(userModel));
 * facade.sendNotification("ADD_USER", { name: "John", email: "john@example.com" });
 * ```
 */
export default interface ICommand {
    /**
     * Executes the command with the provided notification
     * @param notification - Contains the command data and type
     */
    execute(notification:INotification):void;
}

/**
 * Factory method type for creating command instances
 * Used when registering commands with the Facade
 * 
 * @example
 * ```typescript
 * const createCommand: ICommandFactoryMethod = () => new MyCommand();
 * facade.registerCommand("MY_COMMAND", createCommand);
 * ```
 */
export type ICommandFactoryMethod = (...args: any[]) => ICommand;