import { ui } from "./ui/layaMaxUI";
import GameEvent from "./GameEvent";
import DataBus from "./DataBus";
import Langue from "./Langue";

export default class SetPannel extends ui.SetPannelUI {
    private dataBus:DataBus=DataBus.getDataBus()
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
        this.dataBus.on(GameEvent.LANGUAGE_CHANGE,this,this.onLanguage)
        this.onLanguage()
    }

    onLanguage=()=>{
        let arr=['setTitle','musicSet','music','sound','gasSet','langSet']
        for(let i in arr){
            let txtName:string=arr[i]
            this[txtName+'_txt'].text=Langue.defaultLangue[txtName]
        }
        this.musicRadioGroup.labels=this.soundRadioGroup.labels=Langue.defaultLangue.onOff
    }
    
    init():void{
        let language:string=LayaBlock.getLanguage()
        this.languageRadioGroup.selectedIndex=this.config[language]
        this.musicRadioGroup.selectedIndex=Number(Laya.LocalStorage.getItem('musicFlag'))
        this.soundRadioGroup.selectedIndex=Number(Laya.LocalStorage.getItem('soundFlag'))
        this.gas_txt.text='10.0'
    }

    musicRadioGroupChange():void{
        Laya.LocalStorage.setItem('musicFlag',this.musicRadioGroup.selectedIndex+'')
        if(this.musicRadioGroup.selectedIndex==0){
            Laya.SoundManager.setMusicVolume(1)
        }else{
            Laya.SoundManager.setMusicVolume(0)
        }
    }

    soundRadioGroupChange():void{
        Laya.LocalStorage.setItem('soundFlag',this.soundRadioGroup.selectedIndex+'')
        if(this.soundRadioGroup.selectedIndex==0){
            Laya.SoundManager.setSoundVolume(1)
        }else{
            Laya.SoundManager.setSoundVolume(0)
        }
    }

    languageRadioGroupChange():void{
        console.log(this.languageRadioGroup.selectedIndex)
        let lang:string=this.config[this.languageRadioGroup.selectedIndex]
        LayaBlock.setLanguage(lang)
        Langue.setLanguage(lang)
        //广播语言更改事件
        this.dataBus.event(GameEvent.LANGUAGE_CHANGE)
    }

    onDisable(): void {
    }

    closeClick():void{
        this.visible=false;
    }
}