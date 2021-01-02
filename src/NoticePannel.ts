import { ui } from "./ui/layaMaxUI";
import Util from "./Util";
import Langue from "./Langue";
import DataBus from "./DataBus";
import GameEvent from "./GameEvent";


export default class NoticePannel extends ui.NoticePannelUI {   
    private dataBus:DataBus = DataBus.getDataBus(); 
    constructor() { super(); }
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        this.btnOk.on(Laya.Event.CLICK,this,this.closeClick)
        this.dataBus.on(GameEvent.LANGUAGE_CHANGE,this,this.onLanguage)
        this.onLanguage()
    }

    onLanguage=()=>{
        let arr=['notice','home_0']
        for(let i in arr){
            let txtName:string=arr[i]
            console.log(txtName+'_txt')
            this[txtName+'_txt'].text=Langue.defaultLangue[txtName]
        }        
    }

    onDisable(): void {
        
    }

    closeClick():void{
        this.visible=false;
    }
    loadData=()=>{
        LayaBlock.getNotice().then((d:INotice)=>{
            console.log(d)
            this.title_txt.text=d.title;
            this.content_txt.text=d.content
            this.time_txt.text=Util.getDateStrFormatByMs(d.time*1000,'Y-M-D h:m:s')
        })
    }
}