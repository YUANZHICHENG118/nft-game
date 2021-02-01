import { ui } from "./ui/layaMaxUI";
import Util from "./Util";
//import Util from "./Util";

export default class ItemHelp extends ui.ItemHelpUI {
    constructor() { super(); this.width=660;this.height=220;}
    
    
    onEnable(): void {
    }

    onDisable(): void {
    }

    public setItem(sn:number,itemData:IHelp): void {
        this.title_txt.text=itemData.title
        this.content_txt.text=itemData.content
        //this.time_txt.text=Util.getDateStrFormatByMs(1000*itemData.time)
    }
}