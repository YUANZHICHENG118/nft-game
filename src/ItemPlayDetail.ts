import { ui } from "./ui/layaMaxUI";

export default class ItemPlayDetail extends ui.ItemPlayDetailUI {
    
    constructor() { super(); this.width=660;this.height=80;}
    
    onEnable(): void {
    }

    onDisable(): void {
    }
    setItem(sn:number,itemData:IPlayDetail):void{
        //this.title_txt.text=itemData.title
    }
}