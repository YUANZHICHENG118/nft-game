import AniMachine from "./AniMachine";
import DataBus from "./DataBus";
import DataLoading from "./DataLoading";
import DevPannel from "./DevPannel";
import EmailPannel from "./EmailPannel";
import GameEvent from "./GameEvent";
import HelpPannel from "./HelpPannel";
import Langue from "./Langue";
import LastHitPannel from "./LastHitPannel";
import MePannel from "./MePannel";
import NoticePannel from "./NoticePannel";
import RankPannel from "./RankPannel";
import SetPannel from "./SetPannel";
import {ui} from "./ui/layaMaxUI";
import TimeLine = Laya.TimeLine;

export default class Home extends ui.HomeUI {
    private dataBus: DataBus = DataBus.getDataBus();
    private devPannel: DevPannel
    private notiecPannel: NoticePannel
    private emailPannel: EmailPannel

    private mePannel: MePannel
    private rankPannel: RankPannel
    private setPannel: SetPannel
    private helpPannel: HelpPannel
    private timeoutGongGao: number
    private timeoutOfLoadData: number
    private stoneNum: number = 0
    private booms: Laya.Sprite = new Laya.Sprite()
    private boomLoopId: number = 0
    private hideTip: number = 0

    constructor() {
        super();
    }

    onEnable(): void {
        // 初始化 web3
        LayaBlock.initWeb3();
        LayaBlock.activeGame(DataBus.gameServer, this.machineGo, this.mainEnd, this.coinSoundPlay, this.mineSoundPlay)
        //初始化界面
        this.initUI();
        //初始化数据
        this.loadData();
        //注册事件
        this.addEvt();
        //this.testBlock();
    }

    initUI = () => {
        this.tip_mc.x = 1000;
        this.test_btn.visible = false;
        this.waitTip.visible = false
        //设备面板
        this.devPannel = new DevPannel();
        this.addChild(this.devPannel);
        this.devPannel.visible = false;
        this.devPannel.on('showWaitTip', this, this.showWaitTip)

        //公告面板
        this.notiecPannel = new NoticePannel()
        this.addChild(this.notiecPannel);
        this.notiecPannel.visible = false;
        //邮件面板
        this.emailPannel = new EmailPannel()
        this.addChild(this.emailPannel);
        this.emailPannel.visible = false;
        //我的面板
        this.mePannel = new MePannel()
        this.addChild(this.mePannel);
        this.mePannel.visible = false;
        //排行面板
        this.rankPannel = new RankPannel()
        this.addChild(this.rankPannel);
        this.rankPannel.visible = false;

        //设置面板
        this.setPannel = new SetPannel()
        this.addChild(this.setPannel);
        this.setPannel.visible = false;

        //帮助面板
        this.helpPannel = new HelpPannel()
        this.addChild(this.helpPannel);
        this.helpPannel.visible = false;
        this.onLanguage()

        this.cloud0.alpha = Math.random()

    }
    showWaitTip = () => {
        this.waitTip.visible = true;
        this.aniWait.play()
    }
    hideWaitTip = () => {
        this.waitTip.visible = false;
        this.aniWait.stop()
    }
    mainEnd = (data: ILastStraw) => {
        this.boom();

        let lastHitPannel: LastHitPannel = new LastHitPannel();
        lastHitPannel.data = data
        setTimeout(() => {
            Laya.Tween.to(this.booms, {alpha: 0}, 1000);
            lastHitPannel.popup(false, true)
        }, 3000);
    }
    boom = () => {
        console.log('boom=======')
        //运行爆炸
        Laya.timer.frameLoop(1, this, this.boomRun)
        Stone.dy = -this.shan.scaleY * 169
        this.booms.x = 216;
        this.booms.y = 440 + Stone.dy;
        this.addChildAt(this.booms, 2)
    }
    boomRun = () => {
        this.boomLoopId++
        if (this.boomLoopId % 1 == 0 && this.stoneNum < 80) {
            this.stoneNum++
            var stone: Stone = new Stone();
            this.booms.addChild(stone)
        }
        for (let i: number = 0; i < this.stoneNum; i++) {
            var stone: Stone = this.booms.getChildAt(i) as Stone
            stone.update();
        }
    }
    loadData = () => {
        clearTimeout(this.timeoutOfLoadData)
        this.timeoutOfLoadData = setTimeout(this.loadData, 5000);//5000ms 加载一次数据
        //获取矿山数据
        LayaBlock.getMineData().then((d: IMine) => {
            ////console.log(d,'矿山数据'+d.surplus+'/'+d.total)
            DataBus.mine = d;
            this.mine_txt.text = (d.surplus / d.total * 100).toFixed(2) + '%'
            this.mineProgress.scaleX = 1 - (0.13 + (d.surplus / d.total) * 0.87)
            this.shan.scaleY = (d.surplus / d.total) * 0.9 + 0.1
        })

        // 获取用户Mine数据
        LayaBlock.getUserMine().then((d: IUserMine) => {
            DataBus.userMine = d;
            this.ethAmount_txt.text = d.ethAmount + ''
            this.reward_txt.text = '$' + d.reward + ''
            this.rate_txt.text = (d.rate * 100).toFixed(2) + '%'
            this.rank_txt.text = d.rank + ''
        })

        /*
        LayaBlock.getUserBase().then((d:IUserBase)=>{
            DataBus.userBase=d
            this.mePannel.setIcon();
        })
        */

        LayaBlock.getAccount().then((d: string) => {
            DataBus.account = d;
        })
    }
    addEvt = () => {
        this.mine_mc.on(Laya.Event.CLICK, this, this.mineClick)
        this.ethAmount_mc.on(Laya.Event.CLICK, this, this.ethAmountClick)
        this.rank_mc.on(Laya.Event.CLICK, this, this.rankClick)
        this.rate_mc.on(Laya.Event.CLICK, this, this.rateClick)
        this.reward_mc.on(Laya.Event.CLICK, this, this.rewardClick)
        this.on(Laya.Event.CLICK, this, this.thisClick)

        this.btnDevice.on(Laya.Event.MOUSE_DOWN, this, this.menuClick)
        this.btnExchange.on(Laya.Event.MOUSE_DOWN, this, this.menuClick)
        this.btnRank.on(Laya.Event.MOUSE_DOWN, this, this.menuClick)
        this.btnMe.on(Laya.Event.MOUSE_DOWN, this, this.menuClick)
        this.devPannel.on(GameEvent.CLOSE_PANNEL, this, this.closePannel)
        this.btnNotice.on(Laya.Event.CLICK, this, this.showNoticePannel)
        this.btnEmail.on(Laya.Event.CLICK, this, this.showEmailPannel)
        this.btnHelp.on(Laya.Event.CLICK, this, this.showHelpPannel)
        this.btnSet.on(Laya.Event.CLICK, this, this.showSetPannel)
        this.btnChat.on(Laya.Event.CLICK, this, this.btnChatClick)
        this.dataBus.on(GameEvent.LANGUAGE_CHANGE, this, this.onLanguage)
        this.test_btn.on(Laya.Event.CLICK, this, this.test)
        Laya.timer.frameLoop(3, this, this.run)
    }
    thisClick = () => {
        if (this.tip_mc.x < 1000) {
            this.tip_mc.x = 1000
        }
    }
    run = () => {
        this.cloud0.x += 1;
        if (this.cloud0.x > 800) {
            this.cloud0.x = -200
            this.cloud0.y = 140 + Math.random() * 50;
            this.cloud0.scaleY = Math.random() * 0.5 + 0.5;
            this.cloud0.alpha = Math.random()
        }

        this.bird.x -= 2
        if (this.bird.x < -200) {
            this.bird.x = 750
            this.bird.y = 300 + Math.random() * 100
        }

    }
    test = () => {
        //this.machineGo({})
        let lastStraw: ILastStraw = {
            gameId: 123214,
            address: 'tom',
            machine: 99,
            load: 99,
            txId: 'ui43409834fd',
            blockNumber: 5445
        }

        this.mainEnd(lastStraw)

        /*
        let setting=Laya.loader.getRes('PartGold.part');
        let partGold:Laya.Particle2D=new Laya.Particle2D(setting);
        partGold.texture=Laya.loader.getRes('gameimg/icon1.png')
        partGold.x=350;
        partGold.y=500;
        this.addChild(partGold)
        partGold.play()
        */
    }
    onLanguage = () => {
        //切换语言
        this.gongGao_txt.text = Langue.defaultLangue.notice_0
        //console.log('当前语言：',Langue.defaultLangue)
        let arr = ['notice', 'email', 'chat', 'nav1', 'nav2', 'nav3', 'nav4', 'waitTip']
        for (let i in arr) {
            let txtName: string = arr[i]
            this[txtName + '_txt'].text = Langue.defaultLangue[txtName]
        }
    }
    btnChatClick = () => {
        alert('敬请期待')
    }
    closePannel = () => {
        this.selectBg.x = -300;
    }
    showHelpPannel = () => {
        this.helpPannel.visible = true;
        this.helpPannel.initData()
    }
    showSetPannel = () => {
        this.setPannel.visible = true;
    }
    showNoticePannel = () => {
        this.notiecPannel.visible = true;
        this.notiecPannel.loadData()
    }
    showEmailPannel = () => {
        this.emailPannel.visible = true;
        this.emailPannel.loadData();
    }
    mineSoundPlay = () => {
        //播放设备声音
        Laya.SoundManager.playSound("sound/machine.mp3", 1);
    }

    coinSoundPlay = () => {
        //播放金币声音
        Laya.SoundManager.playSound("sound/coin.mp3", 1);
    }
    machineGo = (obj: any) => {
        this.hideWaitTip()
        this.gongGao_txt.text = '玩家' + obj.nick + '派出车辆挖矿'
        clearTimeout(this.timeoutGongGao)
        this.timeoutGongGao = setTimeout(() => {
            this.gongGao_txt.text = Langue.defaultLangue.notice_0
        }, 10000);
        let aniMachine: AniMachine = new AniMachine()
        aniMachine.obj = obj;
        aniMachine.scale(-0.5, 0.5)
        aniMachine.pos(-100, 1200)
        this.machines.addChild(aniMachine);
        let timeLine: TimeLine = new TimeLine();
        let dy = 30;
        timeLine.addLabel("road1", 0).to(aniMachine, {x: 900, y: 814 + dy}, 4000, null, 0)   //右侧出洞
            .addLabel("road2", 0).to(aniMachine, {
            x: 800,
            y: 490 + dy,
            scaleX: 0.3,
            scaleY: 0.3,
            alpha: 1
        }, 1000, null, 0)     //上行，调整状态
            .addLabel("road3", 0).to(aniMachine, {
            x: 520,
            y: 440 + dy,
            scaleX: 0.2,
            scaleY: 0.2,
            alpha: 1
        }, 4000, null, 0)     //去中间
            .addLabel("road4", 0).to(aniMachine, {
            x: 400,
            y: 430 + dy,
            scaleX: 0.1,
            scaleY: 0.1,
            alpha: 1
        }, 3000, null, 0)     //去金山
            .addLabel("road5", 0).to(aniMachine, {
            x: 270,
            y: 380 + dy,
            scaleX: 0.06,
            scaleY: 0.06,
            alpha: 1
        }, 6000, null, 0)     //去金山后面
        timeLine.play(0, false);
        timeLine.on(Laya.Event.COMPLETE, this, this.onComplete);
        timeLine.on(Laya.Event.LABEL, this, this.onLabel);
    }

    private onComplete(): void {
        //console.log("timeLine complete!!!!");
    }

    private onLabel(label: String): void {
        //console.log("LabelName:" + label);
    }

    mineClick(e: Laya.Event): void {
        clearTimeout(this.hideTip)
        this.hideTip = setTimeout(() => {
            this.tip_mc.x = 1000
        }, 3000)
        this.tip_mc.x = 59
        this.tip_txt.text = Langue.defaultLangue.t1 + '：' + DataBus.mine.total + '\n' + Langue.defaultLangue.t2 + '：' + (DataBus.mine.total - DataBus.mine.surplus) + '\n' + Langue.defaultLangue.t3 + '：' + DataBus.mine.surplus
        e.stopPropagation()
    }

    ethAmountClick(e: Laya.Event): void {
        clearTimeout(this.hideTip)
        this.hideTip = setTimeout(() => {
            this.tip_mc.x = 1000
        }, 3000)
        this.tip_mc.x = this.ethAmount_mc.x
        this.tip_txt.text = Langue.defaultLangue.t4 + '：' + DataBus.userMine.ethAmount + '\n' + Langue.defaultLangue.t5 + '：' + DataBus.userMine.tokenAmount
        e.stopPropagation()
    }

    rankClick(e: Laya.Event): void {
        clearTimeout(this.hideTip)
        this.hideTip = setTimeout(() => {
            this.tip_mc.x = 1000
        }, 3000)
        this.tip_mc.x = this.rank_mc.x
        this.tip_txt.text = Langue.defaultLangue.t6 + '：' + DataBus.userMine.amount + '\n' + Langue.defaultLangue.t7 + '：' + DataBus.userMine.rank
        e.stopPropagation()
    }

    rateClick(e: Laya.Event): void {
        clearTimeout(this.hideTip)
        this.hideTip = setTimeout(() => {
            this.tip_mc.x = 1000
        }, 3000)
        this.tip_mc.x = this.rate_mc.x
        this.tip_txt.text = Langue.defaultLangue.t6 + '：' + DataBus.userMine.amount + '\n' + Langue.defaultLangue.t8 + '：' + DataBus.userMine.rate
        e.stopPropagation()
    }

    rewardClick(e: Laya.Event): void {
        clearTimeout(this.hideTip)
        this.hideTip = setTimeout(() => {
            this.tip_mc.x = 1000
        }, 3000)
        this.tip_mc.x = 571
        this.tip_txt.text = Langue.defaultLangue.t9 + '：' + DataBus.userMine.reward + '$'
        e.stopPropagation()
    }

    menuClick(e: Laya.Event): void {
        let curBtn: Laya.Sprite = e.currentTarget as Laya.Sprite;
        this.selectBg.x = curBtn.x
        switch (curBtn) {
            case this.btnDevice:
                this.devPannel.visible = true;
                this.devPannel.initList();
                break;
            case this.btnExchange:
                this.showMarket();
                //Laya.Browser.window.location.href = LayaBlock.exchangeUrl
                break;
            case this.btnRank:
                this.rankPannel.visible = true
                this.rankPannel.initList()
                break;
            case this.btnMe:
                this.mePannel.visible = true
                // 获取用户基础数据
                this.mePannel.loadData()
                break;
        }
    }

    showMarket = () => {
        let market = Laya.Browser.document.getElementById('market');
        if (market) {
            market.style.display = 'block'
            return;
        }
        let iframe = Laya.Browser.document.createElement("iframe");
        iframe.id = 'market';
        iframe.style.position = "absolute";
        iframe.style.zIndex = 100;
        iframe.style.left = "0px";
        iframe.style.top = "0px";
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = '0px';
        iframe.src = "/market/index.html";
        Laya.Browser.document.body.appendChild(iframe);
    };

    hideMarket = () => {
        let market = Laya.Browser.document.getElementById('market');
        if (market) market.style.display = 'none'
    }
    /**
     * 测试接口
     */
    testBlock = () => {
        ////console.log('♥♥')
        // 查询1155余额

        // 查询token 余额
        LayaBlock.getTokenBalance().then((d: number) => {
            ////console.log("token balance=====",d)
        })
        // 查询eth 余额
        LayaBlock.getEthBalance().then((d: number) => {
            ////console.log("eth balance=====",d)
        })

        // 查询1155余额
        LayaBlock.getUserMachine().then((d: IMachine[]) => {
            d.map((item: IMachine) => {
                ////console.log("getUserMachine====",item)
            })
        })

        // 查询是否授权 erc20 未授权进行授权事件触发
        LayaBlock.getTokenAllowance().then((d: boolean) => {
            ////console.log("getTokenAllowance=====",d)
            if (!d) {
                // 如果d为false 需要进行授权
                LayaBlock.tokenApprove().then((d: IApprove) => {
                    ////console.log("tokenApprove=====",d.transactionHash)
                }).catch((e: ITransactionError) => {
                    ////console.log("tokenApprove error=====",e)
                })
            }
        })

        //质押token
        // LayaBlock.stakeToken(3000).then((d:ITransaction)=>{
        //     ////console.log("stakeToken=====",d.transactionHash)
        // }).catch((e:ITransactionError)=>{
        //     ////console.log("stakeToken error=====",e)
        // })

        //领取1155 nft
        // LayaBlock.receive1155().then((d:ITransaction)=>{
        //     ////console.log("receive1155=====",d.transactionHash)
        // }).catch((e:ITransactionError)=>{
        //     ////console.log("receive11556 error=====",e)
        // })

        //转账1155
        // LayaBlock.stakeTokenNft([5,6],[10,17]).then((d:ITransaction)=>{
        //     ////console.log("stakeTokenNft=====",d.transactionHash)
        // }).catch((e:ITransactionError)=>{
        //     ////console.log("stakeTokenNft error=====",e)
        // })

        // //赎回本金
        // LayaBlock.withdrawCapital().then((d:ITransaction)=>{
        //     ////console.log("withdrawCapital=====",d.transactionHash)
        // }).catch((e:ITransactionError)=>{
        //     ////console.log("withdrawCapital error=====",e)
        // })


        // //赎回收益
        // LayaBlock.withdrawAward(1).then((d:ITransaction)=>{
        //     ////console.log("withdrawAward=====",d.transactionHash)
        // }).catch((e:ITransactionError)=>{
        //     ////console.log("withdrawAward error=====",e)
        // })


        // LayaBlock.getRankTop10().then((d:IRankTop[])=>{
        //     ////console.log("getRankTop=====",d)
        // })
        // LayaBlock.getMineData().then((d:IMine)=>{
        //     ////console.log("getMineData=====",d)
        // })

        // LayaBlock.getUserBase().then((d:IUserBase)=>{
        //     ////console.log("getUserBase=====",d)
        // })

        // LayaBlock.getUserStake().then((d:IStake)=>{
        //     ////console.log("getUserStake=====",d)
        // })

        // LayaBlock.getGameServer().then((d:IGameServer[])=>{
        //     d.map(item=>{
        //         ////console.log("token=====",item.symbol)
        //     })
        // })


        // // 获取用户地址
        // LayaBlock.getAccount().then(d=>{
        //     ////console.log(d);
        // })
    }

    onDisable(): void {
    }
}


import Image = Laya.Image;

class Stone extends Image {
    private vx: number = 0;
    private vy: number = 0;
    private maxY: number = 50;//地面位置Y
    static G: number = 2;
    static dy: number = 0;//爆炸点偏移值
    constructor() {
        super();
        this.skin = 'gameimg/icon1.png'
        this.vx = Math.random() * 20 - 10;
        this.vy = -Math.random() * 10 - 10;
        this.x = Math.random() * 100 - 50;
        this.maxY = Math.random() * 50 + 10 - Stone.dy;//每个粒子落地点不同
        this.scaleX = this.scaleY = Math.random() * 0.4 + 0.1;
    }

    public update(): void {
        if (this.y > this.maxY) {
            return
        }
        this.x += this.vx;
        this.vy += Stone.G
        this.y += this.vy
    }
}
