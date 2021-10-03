import { ICommandFactoryMethod } from "./command/ICommand";
import IModel from "./model/IModel";
import IView from "./view/IView";
import IService from "./service/IService";

export default class Facade{
    private _commands:Map<string,ICommandFactoryMethod>     = new Map<string,ICommandFactoryMethod>();
    private _models:Map<string,IModel>                      = new Map<string,IModel>();
    private _views:Map<string,IView>                        = new Map<string,IView>();
    private _services:Map<string,IService>                  = new Map<string,IService>();

    public registerCommand(key:string, factoryMethod:ICommandFactoryMethod):void{
        this._commands.set(key, factoryMethod);
    }

    public registerModel(key:string, model:IModel):void{
        this._models.set(key, model);
    }

    public registerView(key:string, view:IView):void{
        this._views.set(key, view);
    }

    public registerService(key:string, service:IService):void{
        this._services.set(key, service);
    }

    public getService(key:string):IService{
        return this._services.get(key) || null;
    }

    public getModel(key:string):IModel{
        return this._models.get(key) || null;
    }

    public getView(key:string):IView{
        return this._views.get(key) || null;
    }

    public notify(key:string, payload:any = null):void{
        const method = this._commands.get(key) || null; 
        if( method !== null){
            return method.call(null).execute(payload);
        }
    }
}