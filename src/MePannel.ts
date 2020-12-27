import { ui } from "./ui/layaMaxUI";

export default class MePannel extends ui.MePannelUI {
    
    constructor() { super(); }
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        this.btnCopyRef.on(Laya.Event.CLICK,this,this.copyRef)
    }

    copyRef():void{
        eval('window.clipboardData.setData("text","hello")');
    }
    loadData():void{    
        console.log('getUserBase')  
        LayaBlock.getUserBase().then((d:IUserBase)=>{
            console.log(d)
            this.nick_txt.text=d.nick
            this.address_txt.text=d.address
            this.tokenAmount_txt.text=d.tokenAmount+''
            this.ref_txt.text=d.ref
        })
    }

    onDisable(): void {
    }

    closeClick():void{
        this.visible=false;
    }
}