import { ui } from "./ui/layaMaxUI";

export default class DevPannel extends ui.DevPannelUI {
    /** @prop {name:devType, tips:"整数类型示例", type:Int, default:1}*/
    private devType: number = 1;
    private btnColorArr:Array <Laya.Sprite>=[];
    constructor() { super(); }
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        this.btnDev1.on(Laya.Event.CLICK,this,this.btnDevClick)
        this.btnDev2.on(Laya.Event.CLICK,this,this.btnDevClick)
        this.btnDev3.on(Laya.Event.CLICK,this,this.btnDevClick)

        this.btnColorArr=[this.color1,this.color2,this.color3,this.color4,this.color5,this.color6];
        for(let i in this.btnColorArr){
            this.btnColorArr[i].on(Laya.Event.CLICK,this,this.btnColorClick)
        }
    }

    btnColorClick(e:Laya.Event){
        let colorX:Laya.Sprite=e.currentTarget as Laya.Sprite
        colorX.alpha=colorX.alpha>0.5?0:1;
    }

    btnDevClick(e:Laya.Event):void{
        this.btnDev1.skin='gameimg/dev1_1.png'
        this.btnDev2.skin='gameimg/dev2_1.png'
        this.btnDev3.skin='gameimg/dev3_1.png'
        let curBtn:Laya.Image=e.currentTarget as Laya.Image
        switch (curBtn) {
            case this.btnDev1:
                this.devType=1
                break;
            case this.btnDev2:
                this.devType=2
                break;
            case this.btnDev3:
                this.devType=3
                break;
        }        
        curBtn.skin='gameimg/dev'+this.devType+'_2.png'
        console.log(curBtn.skin)
    }

    closeClick():void{
        this.visible=false;
    }

    onDisable(): void {
    }
}