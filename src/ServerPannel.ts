import { ui } from "./ui/layaMaxUI";
export default class ServerPannel extends ui.ServerPannelUI {
    constructor() { super(); }
    
    onEnable(): void {
        this.btnEnter.on(Laya.Event.MOUSE_DOWN,this,this.btnEnterClick)
    }

    onDisable(): void {
    }

    btnEnterClick=()=>{
        console.log('open Home.scene')
        //Laya.Scene.open('Home.scene');
    }
}