export default interface ICommand{
    execute(payload:any):void;
}

export type ICommandFactoryMethod = (...args: any[]) => ICommand;