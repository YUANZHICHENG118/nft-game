import { ui } from "./ui/layaMaxUI";

export default class AniMachine extends ui.AniMachineUI {
    public machineConfig:object={1:{x:21,y:66,w:267,h:162},2:{x:13,y:0,w:241,h:225},3:{x:0,y:102,w:267,h:123}}
    public obj:any
    constructor() { super(); }    
    onEnable(): void {        
        this.img.x=this.machineConfig[this.obj.type].x;
        this.img.y=this.machineConfig[this.obj.type].y;
        let skin='machine/m'+this.obj.type +'_c'+this.obj.color+'.png';
        this.img.skin=skin
        this.ani1.play(0,true)
    }

    onDisable(): void {
    }
}