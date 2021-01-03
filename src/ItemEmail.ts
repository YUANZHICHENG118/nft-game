import { ui } from "./ui/layaMaxUI";

export default class ItemEmail extends ui.ItemEmailUI {
    
    constructor() { super(); this.width=660;this.height=200;}
    
    onEnable(): void {
    }

    onDisable(): void {
    }
    setItem(sn:number,itemData:IEmail):void{
        //this.title_txt.text=itemData.title
    }
}