import DataBus from "./DataBus";
import GameEvent from "./GameEvent";
import { ui } from "./ui/layaMaxUI";

export default class Home extends ui.HomeUI{
    private dataBus:DataBus = DataBus.getDataBus();
    constructor() { super();}
    
    onEnable(): void {
        // 初始化 web3
        LayaBlock.initWeb3();
        this.homeInit();
        this.testBlock();
        this.btnDevice.on(Laya.Event.MOUSE_DOWN,this,this.menuClick)
        this.btnExchange.on(Laya.Event.MOUSE_DOWN,this,this.menuClick)
        this.btnRank.on(Laya.Event.MOUSE_DOWN,this,this.menuClick)
        this.btnMe.on(Laya.Event.MOUSE_DOWN,this,this.menuClick)
        this.out_txt.on(Laya.Event.RIGHT_CLICK,this,this.clearOutTxt)
    }
    homeInit=()=>{
        //debugger
        this.out_txt.text=''
        //获取矿山数据
        LayaBlock.getMineData().then((d:IMine)=>{
            console.log(d)
            this.out_txt.text+='矿山数据'+d.surplus+'/'+d.total
        })

        // 获取用户基础数据
        LayaBlock.getUserBase().then((d:IUserBase)=>{
            this.out_txt.text+='\n用户基础数据：address'+JSON.stringify(d)
        })
    }
    menuClick(e:Laya.Event):void{
        let curBtn:Laya.Sprite=e.currentTarget as Laya.Sprite;
        switch(curBtn){
            case this.btnDevice:
                //我的设备NFT
                LayaBlock.getUserMachine().then((d:IMachine[])=>{
                    this.out_txt.text=JSON.stringify(d);
                })
                break;
            case this.btnExchange:
                
                break;
            case this.btnRank:
                LayaBlock.getRankTop().then((d:IRankTop[])=>{
                    console.log("getRankTop=====",d)
                    this.out_txt.text=JSON.stringify(d)
                })
                break;
            case this.btnMe:
                // 获取用户基础数据
                LayaBlock.getUserBase().then((d:IUserBase)=>{
                    this.out_txt.text='\n用户基础数据：address'+JSON.stringify(d)
                })
                break;
        }        
    }
    clearOutTxt=()=>{
        console.clear();
        this.out_txt.text='';
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


        LayaBlock.getRankTop().then((d:IRankTop[])=>{
            console.log("getRankTop=====",d)
        })
        LayaBlock.getMineData().then((d:IMine)=>{
            console.log("getMineData=====",d)
        })

        LayaBlock.getUserBase().then((d:IUserBase)=>{
            console.log("getUserBase=====",d)
        })

        LayaBlock.getUserStake().then((d:IStake)=>{
            console.log("getUserStake=====",d)
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

    onDisable(): void {
    }
}