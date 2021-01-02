import AniMachine from "./AniMachine";
import DataBus from "./DataBus";
import DevPannel from "./DevPannel";
import EmailPannel from "./EmailPannel";
import GameEvent from "./GameEvent";
import HelpPannel from "./HelpPannel";
import MePannel from "./MePannel";
import NoticePannel from "./NoticePannel";
import RankPannel from "./RankPannel";
import SetPannel from "./SetPannel";
import { ui } from "./ui/layaMaxUI";
import TimeLine = Laya.TimeLine;
export default class Home extends ui.HomeUI{
    private dataBus:DataBus = DataBus.getDataBus();
    private devPannel:DevPannel
    private notiecPannel:NoticePannel
    private emailPannel:EmailPannel

    private mePannel:MePannel
    private rankPannel:RankPannel
    private setPannel:SetPannel
    private helpPannel:HelpPannel
    private timeoutGongGao:number
    constructor() { super();}    
    onEnable (): void {
        // 初始化 web3
        LayaBlock.initWeb3();
        LayaBlock.activeGame(DataBus.gameServer,this.machineGo)
        //初始化界面
        this.initUI();
        //初始化数据
        this.DataInit();
        //注册事件
        this.addEvt();
        //this.testBlock();
    }
    initUI=()=>{
        //设备面板
        this.devPannel=new DevPannel();
        this.addChild(this.devPannel);        
        this.devPannel.visible=false;
        //公告面板
        this.notiecPannel=new NoticePannel()
        this.addChild(this.notiecPannel);        
        this.notiecPannel.visible=false;
        //邮件面板
        this.emailPannel=new EmailPannel()
        this.addChild(this.emailPannel);        
        this.emailPannel.visible=false;  
        //我的面板
        this.mePannel=new MePannel()
        this.addChild(this.mePannel);        
        this.mePannel.visible=false;       
        //排行面板
        this.rankPannel=new RankPannel()
        this.addChild(this.rankPannel);        
        this.rankPannel.visible=false;  

        //设置面板
        this.setPannel=new SetPannel()
        this.addChild(this.setPannel);        
        this.setPannel.visible=false;  

        //帮助面板
        this.helpPannel=new HelpPannel()
        this.addChild(this.helpPannel);        
        this.helpPannel.visible=false;  
    }
    DataInit=()=>{
        //获取矿山数据
        LayaBlock.getMineData().then((d:IMine)=>{
            console.log(d,'矿山数据'+d.surplus+'/'+d.total)
            this.mine_txt.text=d.surplus+'/'+d.total
            this.shan.scaleY=(d.surplus/d.total)*0.9+0.1
        })

        // 获取用户Mine数据
        LayaBlock.getUserMine().then((d:IUserMine)=>{
            this.ethAmount_txt.text=d.ethAmount+''
            this.reward_txt.text=d.reward+''
            this.rate_txt.text=d.rate*100+'%'
            this.rank_txt.text=d.rank+''
        })

        LayaBlock.getAccount().then((d:string)=>{
            DataBus.account=d;
        })
    }
    addEvt=()=>{
        this.btnDevice.on(Laya.Event.MOUSE_DOWN,this,this.menuClick)
        this.btnExchange.on(Laya.Event.MOUSE_DOWN,this,this.menuClick)
        this.btnRank.on(Laya.Event.MOUSE_DOWN,this,this.menuClick)
        this.btnMe.on(Laya.Event.MOUSE_DOWN,this,this.menuClick)
        this.devPannel.on(GameEvent.closePannel,this,this.closePannel)
        this.btnNotice.on(Laya.Event.CLICK,this,this.showNoticePannel)
        this.btnEmail.on(Laya.Event.CLICK,this,this.showEmailPannel)
        this.btnHelp.on(Laya.Event.CLICK,this,this.showHelpPannel)
        this.btnSet.on(Laya.Event.CLICK,this,this.showSetPannel)
        this.test_btn.on(Laya.Event.CLICK,this,this.test)     
    }
    test=()=>{
        this.machineGo({})
    }
    closePannel=()=>{
        this.selectBg.x=-300;
    }
    showHelpPannel=()=>{
        this.helpPannel.visible=true;
    }
    showSetPannel=()=>{
        this.setPannel.visible=true;
    }
    showNoticePannel=()=>{
        this.notiecPannel.visible=true;
        this.notiecPannel.loadData()
    }
    showEmailPannel=()=>{
        this.emailPannel.visible=true;
        this.emailPannel.loadData();
    }
    machineGo=(obj:any)=>{
        //obj={id:1,type:(Math.random()*3+1)|0,color:(Math.random()*6+1)|0}
        console.log('machineGo',obj)
        this.gongGao_txt.text='玩家'+obj.nick+'派出车辆挖矿'
        clearTimeout(this.timeoutGongGao)
        this.timeoutGongGao=setTimeout(() => {
            this.gongGao_txt.text=''
        }, 10000);
        let aniMachine:AniMachine=new AniMachine() 
        aniMachine.obj=obj;       
        aniMachine.scale(-0.5,0.5)
        aniMachine.pos(-100,1200)
        this.machines.addChild(aniMachine);        
        let timeLine:TimeLine = new TimeLine();
        let dy=30;
        timeLine.addLabel("road1",0).to(aniMachine,{x:900, y:814+dy},4000,null,0)   //右侧出洞
                .addLabel("road2",0).to(aniMachine,{x:800, y:490+dy, scaleX:0.3, scaleY:0.3, alpha:1},1000,null,0)     //上行，调整状态
                .addLabel("road3",0).to(aniMachine,{x:520, y:440+dy, scaleX:0.2, scaleY:0.2, alpha:1},4000,null,0)     //去中间
                .addLabel("road4",0).to(aniMachine,{x:400, y:430+dy, scaleX:0.1, scaleY:0.1, alpha:1},3000,null,0)     //去金山
                .addLabel("road5",0).to(aniMachine,{x:270, y:380+dy, scaleX:0.06, scaleY:0.06, alpha:1},6000,null,0)     //去金山后面
		timeLine.play(0,false);
		timeLine.on(Laya.Event.COMPLETE,this,this.onComplete);
		timeLine.on(Laya.Event.LABEL, this, this.onLabel);
    }

    private onComplete():void
    {
        //console.log("timeLine complete!!!!");
    }
    private onLabel(label:String):void
    {
        //console.log("LabelName:" + label);
    }
        
    menuClick(e:Laya.Event):void{
        let curBtn:Laya.Sprite=e.currentTarget as Laya.Sprite;
        this.selectBg.x=curBtn.x
        switch(curBtn){
            case this.btnDevice:
                this.devPannel.visible=true;
                this.devPannel.initList();
                break;
            case this.btnExchange:  
                Laya.Browser.window.location.href = LayaBlock.exchangeUrl
                break;
            case this.btnRank:
                this.rankPannel.visible=true
                this.rankPannel.initList()                
                break;
            case this.btnMe:
                this.mePannel.visible=true
                // 获取用户基础数据
                this.mePannel.loadData()
                break;
        }
    }

    /**
     * 测试接口
     */
    testBlock=()=>{
        console.log('♥♥')
        // 查询1155余额
        
        // 查询token 余额
        LayaBlock.getTokenBalance().then((d:number)=>{
            console.log("token balance=====",d)
        })
        // 查询eth 余额
        LayaBlock.getEthBalance().then((d:number)=>{
            console.log("eth balance=====",d)
        })

        // 查询1155余额
        LayaBlock.getUserMachine().then((d:IMachine[])=>{
            d.map((item:IMachine)=>{
                console.log("getUserMachine====",item)
            })
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
        // LayaBlock.stakeToken(100).then((d:ITransaction)=>{
        //     console.log("stakeToken=====",d.transactionHash)
        // }).catch((e:ITransactionError)=>{
        //     console.log("stakeToken error=====",e)
        // })

        //领取1155 nft
        // LayaBlock.receive1155().then((d:ITransaction)=>{
        //     console.log("receive1155=====",d.transactionHash)
        // }).catch((e:ITransactionError)=>{
        //     console.log("receive11556 error=====",e)
        // })

        //转账1155
        // LayaBlock.stakeTokenNft([5,6],[10,17]).then((d:ITransaction)=>{
        //     console.log("stakeTokenNft=====",d.transactionHash)
        // }).catch((e:ITransactionError)=>{
        //     console.log("stakeTokenNft error=====",e)
        // })

        // //赎回本金
        // LayaBlock.withdrawCapital().then((d:ITransaction)=>{
        //     console.log("withdrawCapital=====",d.transactionHash)
        // }).catch((e:ITransactionError)=>{
        //     console.log("withdrawCapital error=====",e)
        // })


        // //赎回收益
        // LayaBlock.withdrawAward(1).then((d:ITransaction)=>{
        //     console.log("withdrawAward=====",d.transactionHash)
        // }).catch((e:ITransactionError)=>{
        //     console.log("withdrawAward error=====",e)
        // })


        // LayaBlock.getRankTop10().then((d:IRankTop[])=>{
        //     console.log("getRankTop=====",d)
        // })
        // LayaBlock.getMineData().then((d:IMine)=>{
        //     console.log("getMineData=====",d)
        // })

        // LayaBlock.getUserBase().then((d:IUserBase)=>{
        //     console.log("getUserBase=====",d)
        // })

        // LayaBlock.getUserStake().then((d:IStake)=>{
        //     console.log("getUserStake=====",d)
        // })

        // LayaBlock.getGameServer().then((d:IGameServer[])=>{
        //     d.map(item=>{
        //         console.log("token=====",item.symbol)
        //     })
        // })



        // // 获取用户地址
        // LayaBlock.getAccount().then(d=>{
        //     console.log(d);
        // })
    }

    onDisable(): void {
    }
}