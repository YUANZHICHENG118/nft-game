import { ui } from "./ui/layaMaxUI";

export default class ItemPlayDetail extends ui.ItemPlayDetailUI {
    private playDetail:IPlayDetail
    constructor() { super(); this.width=690;this.height=80;}
    
    onEnable(): void {
        this.btn.on(Laya.Event.CLICK,this,this.btnClick)    
    }

    btnClick(event):void{
        Laya.Browser.window.location.href = LayaBlock.blockChainUrl+'/tx/'+this.playDetail.txId
        event.stopPropagation();//阻止冒泡
    }

    onDisable(): void {
    }
    setItem(sn:number,itemData:IPlayDetail):void{
        this.playDetail=itemData
        this.machineAmounts_txt.text=this.sum(itemData.machineAmounts)+''
        this.load_txt.text=itemData.load+''
        this.machine_txt.text=itemData.machine+''
    }
    sum(arr:number[]):number{
        let sum:number=0
        for(let i:number=0;i<arr.length;i++){
            sum+=Number(arr[i])
        }
        return sum
    }
}