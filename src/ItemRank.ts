import { ui } from "./ui/layaMaxUI";

export default class ItemRank extends ui.ItemRankUI{
    
    constructor() { super(); this.width=750;this.height=80;}
    
    onEnable(): void {
    }

    onDisable(): void {
    }
    public setItem(sn:number,itemData:any): void {
        this.load_txt.text=itemData.load;
        this.address_txt.text=itemData.addressShort;
        if(sn==-1){
            this.snImg.visible=false;
            this.sn_txt.visible=true;
            this.bg.skin='gameimg/rankbg1.png'
        }else if(sn<=2){
            this.snImg.visible=true;
            this.sn_txt.visible=false
            this.snImg.skin='gameimg/sn'+(sn+1)+'.png'
            this.bg.skin='gameimg/rankbg1.png'
        }else{
            this.snImg.visible=false;
            this.sn_txt.visible=true;
            this.sn_txt.text=sn+1+''
            this.bg.skin='gameimg/rankbg0.png'
        }

    }
}