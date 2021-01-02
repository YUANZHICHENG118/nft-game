import { ui } from "./ui/layaMaxUI";

export default class SetPannel extends ui.SetPannelUI {
    
    constructor() { super(); }
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        this.musicRadioGroup.on(Laya.Event.CHANGE,this,this.musicRadioGroupChange)
        this.soundRadioGroup.on(Laya.Event.CHANGE,this,this.soundRadioGroupChange)
        this.languageRadioGroup.on(Laya.Event.CHANGE,this,this.languageRadioGroupChange)
    }

    musicRadioGroupChange():void{
        console.log(this.musicRadioGroup.selectedIndex)
    }

    soundRadioGroupChange():void{
        console.log(this.soundRadioGroup.selectedIndex)
    }

    languageRadioGroupChange():void{
        console.log(this.languageRadioGroup.selectedIndex)
    }

    onDisable(): void {
    }

    closeClick():void{
        this.visible=false;
    }
}