import { ui } from "./ui/layaMaxUI";

export default class DataLoading extends ui.DataLoadingUI {
    
    constructor() { super(); this.width=750;this.height=1334}
    
    onEnable(): void {
    }

    onDisable(): void {
    }

    onOpened():void{
        this.loading_ani.play(0,true)
    }
    onClosed():void{
        this.loading_ani.stop();
        //this.loading_ani.destroy();
        //this.destroy()
    }

}