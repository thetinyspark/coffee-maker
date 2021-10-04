import { ICommandFactoryMethod } from "./command/ICommand";
import IModel from "./model/IModel";
import IView from "./view/IView";
import IService from "./service/IService";
import { Emitter, INotification } from "@thetinyspark/tiny-observer";

export default class Facade extends Emitter{
    private _models:Map<string,IModel>                      = new Map<string,IModel>();
    private _views:Map<string,IView>                        = new Map<string,IView>();
    private _services:Map<string,IService>                  = new Map<string,IService>();

    public registerCommand(key:string, factoryMethod:ICommandFactoryMethod):void{
        this.subscribe(
            key, 
            (notification:INotification)=>{
                factoryMethod.call(null).execute(notification);
            }
        );
    }

    public registerModel(key:string, model:IModel):void{
        model.setFacade(this);
        this._models.set(key, model);
    }

    public registerView(key:string, view:IView):void{
        view.setFacade(this);
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

    public sendNotification = (key:string, payload:any = null):void =>{
        this.emit(key, payload);
    }
}