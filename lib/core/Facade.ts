import { ICommandFactoryMethod } from "./command/ICommand";
import IProxy from "./model/IProxy";
import IMediator from "./view/IMediator";
import IService from "./service/IService";
import { Emitter, INotification } from "@thetinyspark/tiny-observer";

export default class Facade extends Emitter{
    private _proxies:Map<string,IProxy>                     = new Map<string,IProxy>();
    private _mediators:Map<string,IMediator>                = new Map<string,IMediator>();
    private _services:Map<string,IService>                  = new Map<string,IService>();

    public registerCommand(key:string, factoryMethod:ICommandFactoryMethod):void{
        this.subscribe(
            key, 
            (notification:INotification)=>{
                return factoryMethod.call(null).execute(notification);
            }
        );
    }

    public registerProxy(key:string, proxy:IProxy):void{
        proxy.setFacade(this);
        this._proxies.set(key, proxy);
    }

    public registerMediator(key:string, mediator:IMediator):void{
        mediator.setFacade(this);
        this._mediators.set(key, mediator);
    }

    public registerService(key:string, service:IService):void{
        this._services.set(key, service);
    }

    public getService(key:string):IService{
        return this._services.get(key) || null;
    }

    public getProxy(key:string):IProxy{
        return this._proxies.get(key) || null;
    }

    public getMediator(key:string):IMediator{
        return this._mediators.get(key) || null;
    }

    public sendNotification = (key:string, payload:any = {}):void =>{
        this.emit(key, payload);
    };

    public query = (key:string, payload:any = {}):Promise<any> => {
        const promise = this.emit(key, payload, true) as Promise<any>;
        return promise.then( 
            (results:any[])=>{
                if(results.length === 1)
                    return results.shift();
                return results;
            }
        );
    };
}