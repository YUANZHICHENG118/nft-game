import { ui } from "./ui/layaMaxUI";

export default class SetPannel extends ui.SetPannelUI {
    
    private config:object={
        'zh-CN':0,
        'en-US':1,
        'kr':2,

        0:'zh-CN',
        1:'en-US',
        2:'kr'
    }
    constructor() { super(); }
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        this.musicRadioGroup.on(Laya.Event.CHANGE,this,this.musicRadioGroupChange)
        this.soundRadioGroup.on(Laya.Event.CHANGE,this,this.soundRadioGroupChange)
        this.languageRadioGroup.on(Laya.Event.CHANGE,this,this.languageRadioGroupChange)
        this.init()
    }
    
    init():void{
        let language:string=LayaBlock.getLanguage()
        this.languageRadioGroup.selectedIndex=this.config[language]
        console.log('language',language,this.languageRadioGroup.selectedIndex)
        this.musicRadioGroup.selectedIndex=0
        this.soundRadioGroup.selectedIndex=0
        this.gas_txt.text='10.0'
    }

    musicRadioGroupChange():void{
        if(this.musicRadioGroup.selectedIndex==0){
            Laya.SoundManager.setMusicVolume(1)
        }else{
            Laya.SoundManager.setMusicVolume(0)
        }
    }

    soundRadioGroupChange():void{
        if(this.soundRadioGroup.selectedIndex==0){
            Laya.SoundManager.setSoundVolume(1)
        }else{
            Laya.SoundManager.setSoundVolume(0)
        }
    }

    languageRadioGroupChange():void{
        console.log(this.languageRadioGroup.selectedIndex)

        LayaBlock.setLanguage(this.config[this.languageRadioGroup.selectedIndex])
        //广播语言更改事件
    }

    onDisable(): void {
    }

    closeClick():void{
        this.visible=false;
    }
}