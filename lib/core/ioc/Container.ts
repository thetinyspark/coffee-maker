export default class Container{

    private _map:Map<string,Function>;
    private _singleton:Map<string,any>;

    constructor(){
        this.reset();
    }

    public resolve(key:string):any{
        if( !this._map.has(key))
            return null; 
        
        if( this._singleton.has(key))
            return this._singleton.get(key); 
        
        return this._map.get(key).call(null);
    }

    public reset():void{
        this._map = new Map<string, Function>();
        this._singleton = new Map<string,any>();
    }

    public register(key:string, factoryMethod:Function, singleton:boolean = false):void{
        this._map.delete(key);
        this._singleton.delete(key);

        this._map.set(key, factoryMethod);
        
        if( singleton )
            this._singleton.set(key, factoryMethod());
    }

    public get(key:string):Function|null{
        return this._map.get(key)||null;
    }
}

export const rootContainer:Container = new Container();