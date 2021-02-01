import DataBus from "./DataBus";
import ItemEmail from "./ItemEmail";
import { ui } from "./ui/layaMaxUI";
import Langue from "./Langue";
import GameEvent from "./GameEvent";

export default class DevDetail extends ui.DevDetailUI {
    private dataBus:DataBus = DataBus.getDataBus();
    constructor() { super(); }

    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        this.dataBus.on(GameEvent.LANGUAGE_CHANGE,this,this.onLanguage)
        this.btnExchange.on(Laya.Event.CLICK,this,this.exchange)
        this.onLanguage()
    }
    exchange=()=>{
        Laya.Browser.window.location.href = LayaBlock.exchangeUrl
    }
    onLanguage=()=>{
        let arr=['nav7_1','nav7_2','nav7_2_1','nav7_3','nav7_4']
        for(let i in arr){
            let txtName:string=arr[i]
            this[txtName+'_txt'].text=Langue.defaultLangue[txtName]
        }
    }

    onDisable(): void {
    }

    closeClick():void{
        this.visible=false;
    }
    setData(d:IMachine):void{
        console.log('设备详情:',d)
        this.machine.skin='machine/m'+d.type +'_'+d.color+'.png';
        this.load_txt.text=d.mining+''
        this.mining_txt.text=d.mining+''
        this.level_txt.text=d.level+''
        this.remark_txt.text=d.remark
    }
}
