import DataBus from "./DataBus";
import GameEvent from "./GameEvent";
import { ui } from "./ui/layaMaxUI";

export default class Home extends ui.HomeUI{
    private dataBus:DataBus = DataBus.getDataBus();
    constructor() { super();}
    
    onEnable(): void {
        // 初始化 web3
        LayaBlock.initWeb3();
        this.btnDevice.on(Laya.Event.MOUSE_DOWN,this,this.menuClick);
        this.btnExchange.on(Laya.Event.MOUSE_DOWN,this,this.menuClick);
        this.btnRank.on(Laya.Event.MOUSE_DOWN,this,this.menuClick);
        this.btnMe.on(Laya.Event.MOUSE_DOWN,this,this.menuClick);
        this.dataBus.on(GameEvent.flag1,this,this.onFlag1)
    }

    onFlag1(e):void{
        //1111测试获取钱包地址接口默认返回0x0000000
        LayaBlock.getAccount().then(data=>{
            this.out_txt.text=data
        })

    }

    menuClick(e:Laya.Event):void{
        let curBtn:Laya.Sprite=e.currentTarget as Laya.Sprite;
        switch(curBtn){
            case this.btnDevice:
                this.selectBg.x=curBtn.x;
                this.num_txt.value='01';
                eval('COMM.loadData(1)');
                break;
            case this.btnExchange:
                this.selectBg.x=curBtn.x;
                this.num_txt.value='02'
                eval('COMM.loadData(2)');
                break;
            case this.btnRank:
                this.selectBg.x=curBtn.x;
                this.num_txt.value='03';
                eval('COMM.loadData(3)');
                break;
            case this.btnMe:
                this.selectBg.x=curBtn.x;
                this.num_txt.value='04';
                eval('COMM.loadData(4)');
                break;
        }
        
    }

    onDisable(): void {
    }
}