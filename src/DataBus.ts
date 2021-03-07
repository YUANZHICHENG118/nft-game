import DataLoading from "./DataLoading";
import GameEvent from "./GameEvent";
import { ui } from "./ui/layaMaxUI";
import TipPannel from "./TipPannel";
export default class DataBus extends Laya.EventDispatcher {

    private static instance:DataBus = null;
    public static account:string='';
    public static gameServer:IGameServer;
    public static userBase:IUserBase;
    public static mine:IMine;
    public static userMine:IUserMine;
    
    public dataLoading:DataLoading=new DataLoading();
    public toast:ui.ToastUI=new ui.ToastUI()
     

    
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
        this.event(GameEvent.FLAG1,data)
    }

    onDisable(): void {
    }

    showLoading(msg:string=''){
        this.dataLoading.loading_txt.text=msg
        this.dataLoading.popup(false,false)
    }

    hideLoading(){
        this.dataLoading.close()
    }

    showToast(msg:string){
        this.toast.tip_txt.text=msg;
        this.toast.popup(false,false);
        setTimeout(() => {
            this.toast.close()
        }, 1000);
    }
    showTip(msg:string,ok:string,todo:any){
        let tipPannel:TipPannel=new TipPannel();
        tipPannel.msg='您将获取X个设备，此操作后将在x分钟内无法解锁CM代币'
        tipPannel.ok='ok'
        tipPannel.todo=null
        tipPannel.popup(false,true)
    }
}