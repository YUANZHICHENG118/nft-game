import GameEvent from "./GameEvent";

export default class DataBus extends Laya.EventDispatcher {

    private static instance:DataBus = null;
    public static account:string='';
    public static gameServer:IGameServer
    
    constructor() { super(); }

    public static getDataBus():DataBus
    {
        if(!this.instance)
        {
            this.instance = new DataBus();                              
        }
        return this.instance;
    }

    public addEvt(){
        Laya.stage.on('gameData',this,this.onGameData);
    }
    
    onEnable(): void {
    }

    public onGameData(data){   
        console.log('DataBus收到数据：',data); 
        this.event(GameEvent.flag1,data)
    }

    onDisable(): void {
    }
}