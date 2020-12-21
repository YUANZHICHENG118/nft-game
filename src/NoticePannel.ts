import { ui } from "./ui/layaMaxUI";
import Util from "./Util";

export default class NoticePannel extends ui.NoticeUI {    
    constructor() { super(); }
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        this.btnOk.on(Laya.Event.CLICK,this,this.closeClick)
    }

    onDisable(): void {
        
    }

    closeClick():void{
        this.visible=false;
    }
    loadData=()=>{
        NftApi.getNotice().then((d:INotice)=>{
            console.log(d)
            this.title_txt.text=d.title;
            this.content_txt.text=d.content
            this.time_txt.text=Util.getDateStrFormatByMs(d.time*1000,'Y-M-D h:m:s')
        })
    }
}