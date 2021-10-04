import { INotification } from "@thetinyspark/tiny-observer";

export default interface ICommand{
    execute(notification:INotification):void;
}

export type ICommandFactoryMethod = (...args: any[]) => ICommand;