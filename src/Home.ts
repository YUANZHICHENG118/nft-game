import DataBus from "./DataBus";
import GameEvent from "./GameEvent";
import { ui } from "./ui/layaMaxUI";

export default class Home extends ui.HomeUI{
    private dataBus:DataBus = DataBus.getDataBus();
    constructor() { super();}
    
    onEnable(): void {
        // 初始化 web3
        LayaBlock.initWeb3();
        this.testBlock();
        this.btnDevice.on(Laya.Event.MOUSE_DOWN,this,this.menuClick);
        this.btnExchange.on(Laya.Event.MOUSE_DOWN,this,this.menuClick);
        this.btnRank.on(Laya.Event.MOUSE_DOWN,this,this.menuClick);
        this.btnMe.on(Laya.Event.MOUSE_DOWN,this,this.menuClick);
        this.dataBus.on(GameEvent.flag1,this,this.onFlag1)
    }

    /**
     * 测试接口
     */
    testBlock=()=>{

        // 查询token 余额
        LayaBlock.getTokenBalance().then((d:number)=>{
            console.log("token balance=====",d)
        })
        // 查询eth 余额
        LayaBlock.getEthBalance().then((d:number)=>{
            console.log("eth balance=====",d)
        })

        // 查询是否授权 erc20 未授权进行授权事件触发
        LayaBlock.getTokenAllowance().then((d:boolean)=>{
            console.log("getTokenAllowance=====",d)
            if(!d){
                // 如果d为false 需要进行授权
                LayaBlock.tokenApprove().then((d:IApprove)=>{
                    console.log("tokenApprove=====",d.transactionHash)
                }).catch((e:ITransactionError)=>{
                    console.log("tokenApprove error=====",e)
                })
            }
        })

        //质押token
        LayaBlock.stakeToken(10000).then((d:ITransaction)=>{
            console.log("stakeToken=====",d.transactionHash)
        }).catch((e:ITransactionError)=>{
            console.log("stakeToken error=====",e)
        })


        LayaBlock.getGameServer().then((d:IGameServer[])=>{
            d.map(item=>{
                console.log("token=====",item.token)
            })
        })

        NftApi.getGameLoadDec().then((d:IGameLoadDec)=>{
            console.log("load dec zh=====",d.zh)

        })

        // 获取用户地址
        LayaBlock.getAccount().then(data=>{
            this.out_txt.text=data
        })
    }

    onFlag1(e):void{
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