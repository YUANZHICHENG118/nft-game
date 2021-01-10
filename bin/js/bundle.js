(function () {
	'use strict';

	var View = Laya.View;
	var Dialog = Laya.Dialog;
	var Scene = Laya.Scene;
	var REG = Laya.ClassUtils.regClass;
	var ui;
	(function (ui) {
	    class AniMachineUI extends Scene {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("AniMachine");
	        }
	    }
	    ui.AniMachineUI = AniMachineUI;
	    REG("ui.AniMachineUI", AniMachineUI);
	    class BlackBgUI extends Scene {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("BlackBg");
	        }
	    }
	    ui.BlackBgUI = BlackBgUI;
	    REG("ui.BlackBgUI", BlackBgUI);
	    class DataLoadingUI extends Dialog {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("DataLoading");
	        }
	    }
	    ui.DataLoadingUI = DataLoadingUI;
	    REG("ui.DataLoadingUI", DataLoadingUI);
	    class DevDetailUI extends View {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("DevDetail");
	        }
	    }
	    ui.DevDetailUI = DevDetailUI;
	    REG("ui.DevDetailUI", DevDetailUI);
	    class DevPannelUI extends Scene {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("DevPannel");
	        }
	    }
	    ui.DevPannelUI = DevPannelUI;
	    REG("ui.DevPannelUI", DevPannelUI);
	    class EmailPannelUI extends Dialog {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("EmailPannel");
	        }
	    }
	    ui.EmailPannelUI = EmailPannelUI;
	    REG("ui.EmailPannelUI", EmailPannelUI);
	    class EntrancePannelUI extends Scene {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("EntrancePannel");
	        }
	    }
	    ui.EntrancePannelUI = EntrancePannelUI;
	    REG("ui.EntrancePannelUI", EntrancePannelUI);
	    class HelpPannelUI extends View {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("HelpPannel");
	        }
	    }
	    ui.HelpPannelUI = HelpPannelUI;
	    REG("ui.HelpPannelUI", HelpPannelUI);
	    class HomeUI extends Scene {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("Home");
	        }
	    }
	    ui.HomeUI = HomeUI;
	    REG("ui.HomeUI", HomeUI);
	    class ItemCommissionUI extends View {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("ItemCommission");
	        }
	    }
	    ui.ItemCommissionUI = ItemCommissionUI;
	    REG("ui.ItemCommissionUI", ItemCommissionUI);
	    class ItemDevUI extends View {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("ItemDev");
	        }
	    }
	    ui.ItemDevUI = ItemDevUI;
	    REG("ui.ItemDevUI", ItemDevUI);
	    class ItemEmailUI extends View {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("ItemEmail");
	        }
	    }
	    ui.ItemEmailUI = ItemEmailUI;
	    REG("ui.ItemEmailUI", ItemEmailUI);
	    class ItemHelpUI extends View {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("ItemHelp");
	        }
	    }
	    ui.ItemHelpUI = ItemHelpUI;
	    REG("ui.ItemHelpUI", ItemHelpUI);
	    class ItemIncomeUI extends View {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("ItemIncome");
	        }
	    }
	    ui.ItemIncomeUI = ItemIncomeUI;
	    REG("ui.ItemIncomeUI", ItemIncomeUI);
	    class ItemPlayDetailUI extends View {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("ItemPlayDetail");
	        }
	    }
	    ui.ItemPlayDetailUI = ItemPlayDetailUI;
	    REG("ui.ItemPlayDetailUI", ItemPlayDetailUI);
	    class ItemRankUI extends Scene {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("ItemRank");
	        }
	    }
	    ui.ItemRankUI = ItemRankUI;
	    REG("ui.ItemRankUI", ItemRankUI);
	    class LastHitPannelUI extends Dialog {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("LastHitPannel");
	        }
	    }
	    ui.LastHitPannelUI = LastHitPannelUI;
	    REG("ui.LastHitPannelUI", LastHitPannelUI);
	    class MePannelUI extends View {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("MePannel");
	        }
	    }
	    ui.MePannelUI = MePannelUI;
	    REG("ui.MePannelUI", MePannelUI);
	    class NoticePannelUI extends Scene {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("NoticePannel");
	        }
	    }
	    ui.NoticePannelUI = NoticePannelUI;
	    REG("ui.NoticePannelUI", NoticePannelUI);
	    class PlayDetailPannelUI extends View {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("PlayDetailPannel");
	        }
	    }
	    ui.PlayDetailPannelUI = PlayDetailPannelUI;
	    REG("ui.PlayDetailPannelUI", PlayDetailPannelUI);
	    class RankPannelUI extends View {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("RankPannel");
	        }
	    }
	    ui.RankPannelUI = RankPannelUI;
	    REG("ui.RankPannelUI", RankPannelUI);
	    class SetPannelUI extends Scene {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("SetPannel");
	        }
	    }
	    ui.SetPannelUI = SetPannelUI;
	    REG("ui.SetPannelUI", SetPannelUI);
	})(ui || (ui = {}));
	(function (ui) {
	    var prefab;
	    (function (prefab) {
	        class profitPannelUI extends Scene {
	            constructor() { super(); }
	            createChildren() {
	                super.createChildren();
	                this.loadScene("prefab/profitPannel");
	            }
	        }
	        prefab.profitPannelUI = profitPannelUI;
	        REG("ui.prefab.profitPannelUI", profitPannelUI);
	    })(prefab = ui.prefab || (ui.prefab = {}));
	})(ui || (ui = {}));

	class DataLoading extends ui.DataLoadingUI {
	    constructor() { super(); this.width = 750; this.height = 1334; }
	    onEnable() {
	    }
	    onDisable() {
	    }
	    onOpened() {
	        this.loading_ani.play(0, true);
	    }
	    onClosed() {
	        this.loading_ani.stop();
	    }
	}

	class GameEvent extends Laya.Script {
	    constructor() {
	        super();
	    }
	}
	GameEvent.FLAG1 = "flag1";
	GameEvent.CLOSE_PANNEL = 'closePannel';
	GameEvent.LANGUAGE_CHANGE = 'languageChange';
	GameEvent.DETAILE = 'detaile';
	GameEvent.RANK_MORE = 'rankMore';
	GameEvent.COMMISSION_MORE = 'commissionMore';
	GameEvent.INCOME_MORE = 'incomeMove';

	class DataBus extends Laya.EventDispatcher {
	    constructor() {
	        super();
	        this.dataLoading = new DataLoading();
	    }
	    static getDataBus() {
	        if (!this.instance) {
	            this.instance = new DataBus();
	        }
	        return this.instance;
	    }
	    addEvt() {
	        Laya.stage.on('gameData', this, this.onGameData);
	    }
	    onEnable() {
	    }
	    onGameData(data) {
	        console.log('DataBus收到数据：', data);
	        this.event(GameEvent.FLAG1, data);
	    }
	    onDisable() {
	    }
	    showLoading() {
	        this.dataLoading.popup(false, false);
	    }
	    hideLoading() {
	        this.dataLoading.close();
	    }
	}
	DataBus.instance = null;
	DataBus.account = '';

	class Langue extends Laya.EventDispatcher {
	    constructor() {
	        super();
	    }
	    static setLanguage(lang) {
	        if (lang == 'zh-CN') {
	            Langue.defaultLangue = Langue.cn;
	        }
	        else if (lang == 'en-US') {
	            Langue.defaultLangue = Langue.en;
	        }
	        else if (lang == 'kr') {
	            Langue.defaultLangue = Langue.kr;
	        }
	    }
	}
	Langue.cn = {
	    start: '开始',
	    ok: '确定',
	    close: '关闭',
	    notice_0: '等待矿工派出设备',
	    notice: '公告',
	    email: '邮件',
	    chat: '聊天',
	    help: '帮助',
	    home_0: '我知道了',
	    home_1: '一键领取',
	    home_2: '一键读取',
	    nav1: '设备',
	    nav2: '交易',
	    nav3: '排行',
	    nav4: '我的',
	    nav1_1: '低 → 高',
	    nav1_2: '高 → 低',
	    nav1_3: '全选',
	    nav1_4: '自动匹配',
	    nav1_5: '总载重：',
	    nav1_6: '总挖矿：',
	    nav1_7: '总车辆：',
	    nav1_8: '开始挖矿',
	    nav3_0: '当前TOP10',
	    nav3_1: '当前TOP50',
	    nav3_2: '全网TOP50',
	    nav3_3: '排名',
	    nav3_4: '账号',
	    nav3_5: '运走量',
	    nav4_1: '基本信息',
	    nav4_2: '我的收益',
	    nav4_3: '返佣明细',
	    nav4_4: '昵称',
	    nav4_4_1: '保存',
	    nav4_5: '我的地址',
	    nav4_6: '钱包',
	    nav4_7: '邀请链接',
	    nav4_8: '复制',
	    nav5_1: '期数',
	    nav5_2: '派出设备',
	    nav5_3: '收益(ETH/CM)',
	    nav5_4: '已领取',
	    nav5_5: '未领取',
	    nav5_6: '已发放',
	    nav5_7: '未发放',
	    nav6_1: '昵称',
	    nav6_2: '地址',
	    nav6_3: '奖励',
	    nav7_1: '设备详情：',
	    nav7_2: '载重/挖矿：',
	    nav7_3: '等级：',
	    nav8_0: '派出记录',
	    nav8_1: '总派出',
	    nav8_2: '总挖矿',
	    nav8_3: '总运走',
	    setTitle: '设置',
	    musicSet: '音效设置',
	    music: '音乐',
	    sound: '音效',
	    gasSet: '手续费',
	    langSet: '语言设置',
	    onOff: '开          ,关',
	    waitTip: '设备就绪等待发车',
	    verify: '验证',
	    lastHit: '完成了最后一击'
	};
	Langue.en = {
	    start: 'start',
	    ok: 'OK',
	    close: 'Close',
	    notice_0: 'Waiting for absenteeism',
	    notice: 'Notice',
	    email: 'Mail',
	    chat: 'Chat',
	    help: 'Help',
	    home_0: 'I got it',
	    home_1: 'receive',
	    home_2: 'reading',
	    nav1: 'device',
	    nav2: 'transaction',
	    nav3: 'ranking',
	    nav4: 'mine',
	    nav1_1: 'low->High',
	    nav1_2: 'High->low',
	    nav1_3: 'All',
	    nav1_4: 'Automatic',
	    nav1_5: 'load',
	    nav1_6: 'mining',
	    nav1_7: '总车辆：',
	    nav1_8: 'Start',
	    nav3_0: 'TOP10',
	    nav3_1: 'TOP50',
	    nav3_2: 'AllTOP50',
	    nav3_3: 'rank',
	    nav3_4: 'Account',
	    nav3_5: 'volume',
	    nav4_1: 'Basic',
	    nav4_2: 'My',
	    nav4_3: 'Rebate',
	    nav4_4: 'nickname',
	    nav4_4_1: 'save',
	    nav4_5: 'Address',
	    nav4_6: 'Wallet',
	    nav4_7: 'Invitation',
	    nav4_8: 'copy',
	    nav5_1: 'periods',
	    nav5_2: 'Send ',
	    nav5_3: 'income',
	    nav5_4: 'collect',
	    nav5_5: 'not received',
	    nav5_6: 'issued',
	    nav5_7: 'Unreleased',
	    nav6_1: 'nick',
	    nav6_2: 'address',
	    nav6_3: 'reward ',
	    alert1: 'please ...',
	    nav7_1: 'details: ',
	    nav7_2: 'load/Mining:',
	    nav7_3: 'level:',
	    nav8_0: 'Dispatch record',
	    nav8_1: 'Always dispatched',
	    nav8_2: 'Total mining',
	    nav8_3: 'total transport',
	    setTitle: 'Setting',
	    musicSet: 'Music Setting',
	    music: 'Music',
	    sound: 'Sound',
	    gasSet: 'Gas',
	    langSet: 'Language',
	    onOff: 'on         ,off',
	    waitTip: 'wait...',
	    verify: 'verify',
	    lastHit: '完成了最后一击'
	};
	Langue.kr = {
	    start: 'start',
	    ok: '확인',
	    close: '닫기',
	    notice: '발표',
	    notice_0: 'wait...',
	    email: '우편',
	    chat: '채팅',
	    help: '도움말',
	    home_0: '알았어요',
	    home_1: '수신 할 하나의 열쇠',
	    home_2: '원키 읽기',
	    nav1: '장치',
	    nav2: '트랜잭션',
	    nav3: '순위',
	    nav4: '나의 것',
	    nav1_1: '낮은',
	    nav1_2: '높음',
	    nav1_3: '모두 선택',
	    nav1_4: '자동 일치',
	    nav1_5: '총 부하',
	    nav1_6: '총 채굴',
	    nav1_7: '总车辆',
	    nav1_8: '채굴 시작',
	    nav3_1: '현재',
	    nav3_2: '전체 네트워크',
	    nav3_3: '순위',
	    nav3_4: '계정',
	    nav3_5: '배송량',
	    nav4_1: '기본 정보',
	    nav4_2: '내 수입',
	    nav4_3: '환급 내역',
	    nav4_4: '별명',
	    nav4_4_1: 'save',
	    nav4_5: '내 주소',
	    nav4_6: '지갑',
	    nav4_7: '초대 링크',
	    nav4_8: '복사',
	    nav5_1: '기수',
	    nav5_2: "파견 설비",
	    nav5_3: '수익(ETH/CM)',
	    nav5_4: "수령",
	    nav5_5: "미 수령",
	    nav5_6: '발행 됨',
	    nav5_7: '출시되지 않음',
	    nav6_1: "닉네임",
	    nav6_2: "주소",
	    nav6_3: "보상",
	    alert1: "please...",
	    nav7_1: '설비 상세 정보:',
	    nav7_2: "적재/채굴:",
	    nav7_3: "등급:",
	    nav8_0: '파견 기록',
	    nav8_1: '항상 파견 됨',
	    nav8_2: '총 채굴',
	    nav8_3: '총 이동 거리',
	    setTitle: '설정',
	    musicSet: '사 운 드 설정',
	    music: '음악',
	    sound: '사 운 드 효과',
	    gasSet: 'Gas',
	    langSet: '언어 설정',
	    onOff: '열다          ,관문',
	    waitTip: 'wait...',
	    verify: 'verify',
	    lastHit: '完成了最后一击'
	};

	class ItemDev extends ui.ItemDevUI {
	    constructor() {
	        super();
	        this.size(ItemDev.WID, ItemDev.HEI);
	    }
	    onEnable() {
	        this.btn.on(Laya.Event.CLICK, this, this.btnClick);
	    }
	    btnClick(event) {
	        Laya.stage.event(GameEvent.DETAILE, this.sn);
	        event.stopPropagation();
	    }
	    onDisable() {
	    }
	    setItem(sn, itemData) {
	        this.sn = sn;
	        var __scale = (ItemDev.WID - 20) / ItemDev.machinaWid[itemData.type - 1][0];
	        var __y = 0.5 * (ItemDev.HEI - ItemDev.machinaWid[itemData.type - 1][1] * __scale);
	        this.img.scaleX = this.img.scaleY = __scale;
	        this.img.y = __y;
	        this.img.skin = 'machine/m' + itemData.type + '_' + itemData.color + '.png';
	        if (itemData.selected) {
	            this.bg.skin = 'gameimg/bg2.png';
	            this.btn.visible = true;
	        }
	        else {
	            this.bg.skin = 'gameimg/bg1.png';
	            this.btn.visible = false;
	        }
	    }
	}
	ItemDev.WID = 147;
	ItemDev.HEI = 134;
	ItemDev.machinaWid = [[230, 123], [293, 209], [312, 133]];

	class DevDetail extends ui.DevDetailUI {
	    constructor() {
	        super();
	        this.dataBus = DataBus.getDataBus();
	        this.onLanguage = () => {
	            let arr = ['nav7_1', 'nav7_2', 'nav7_3'];
	            for (let i in arr) {
	                let txtName = arr[i];
	                this[txtName + '_txt'].text = Langue.defaultLangue[txtName];
	            }
	        };
	    }
	    onEnable() {
	        this.btnClose.on(Laya.Event.CLICK, this, this.closeClick);
	        this.dataBus.on(GameEvent.LANGUAGE_CHANGE, this, this.onLanguage);
	        this.onLanguage();
	    }
	    onDisable() {
	    }
	    closeClick() {
	        this.visible = false;
	    }
	    setData(d) {
	        console.log('设备详情:', d);
	        this.machine.skin = 'machine/m' + d.type + '_' + d.color + '.png';
	        this.load_txt.text = d.load + '/' + d.mining;
	        this.level_txt.text = d.level + '';
	        this.remark_txt.text = d.remark;
	    }
	}

	var List = Laya.List;
	var Handler = Laya.Handler;
	class DevPannel extends ui.DevPannelUI {
	    constructor() {
	        super();
	        this.devTypeArr = [1, 2, 3];
	        this.selectColorArr = [1, 2, 3, 4, 5, 6];
	        this.sort = 'DESC';
	        this.devArr = [];
	        this.btnColorArr = [];
	        this.list = new List();
	        this.hasInitList = false;
	        this.dataBus = DataBus.getDataBus();
	        this.devDetail = new DevDetail();
	        this.loading = false;
	        this.onDetaile = (e) => {
	            this.devDetail.visible = true;
	            let d = this.listData0[e];
	            this.devDetail.setData(d);
	        };
	        this.onLanguage = () => {
	            let arr = ['nav1_3', 'nav1_4', 'nav1_5', 'nav1_6', 'nav1_7', 'nav1_8'];
	            for (let i in arr) {
	                let txtName = arr[i];
	                this[txtName + '_txt'].text = Langue.defaultLangue[txtName];
	            }
	        };
	    }
	    onEnable() {
	        this.btnColorArr = [this.color1, this.color2, this.color3, this.color4, this.color5, this.color6];
	        this.devArr = [this.btnDev1, this.btnDev2, this.btnDev3];
	        this.btnClose.on(Laya.Event.CLICK, this, this.closeClick);
	        this.btnDev1.on(Laya.Event.CLICK, this, this.btnDevClick);
	        this.btnDev2.on(Laya.Event.CLICK, this, this.btnDevClick);
	        this.btnDev3.on(Laya.Event.CLICK, this, this.btnDevClick);
	        this.sort_btn.on(Laya.Event.CLICK, this, this.sortClick);
	        for (let i in this.btnColorArr) {
	            this.btnColorArr[i].on(Laya.Event.CLICK, this, this.btnColorClick);
	        }
	        this.selectAll_btn.on(Laya.Event.CHANGE, this, this.selectAllClick);
	        this.auto_btn.on(Laya.Event.CLICK, this, this.autoClick);
	        this.stakeTokenNft_btn.on(Laya.Event.CLICK, this, this.stakeTokenNft);
	        this.list.itemRender = ItemDev;
	        this.list.repeatX = 4;
	        this.list.x = 50;
	        this.list.y = 423;
	        this.list.height = 600;
	        this.list.spaceX = 20;
	        this.list.spaceY = 20;
	        this.list.vScrollBarSkin = "";
	        this.list.selectEnable = true;
	        this.list.selectHandler = new Handler(this, this.onSelect);
	        this.list.renderHandler = new Handler(this, this.updateItem);
	        this.addChild(this.list);
	        this.stakeTokenNft_btn.disabled = false;
	        this.dataBus.on(GameEvent.LANGUAGE_CHANGE, this, this.onLanguage);
	        this.onLanguage();
	        this.devDetail.visible = false;
	        this.addChild(this.devDetail);
	        Laya.stage.on(GameEvent.DETAILE, this, this.onDetaile);
	    }
	    stakeTokenNft() {
	        if (this.loading == true) {
	            return;
	        }
	        var machineNum = 0;
	        var obj = {};
	        for (var i in this.listData) {
	            if (this.listData[i].selected == true) {
	                machineNum++;
	                let id = this.listData[i].id;
	                if (obj[id]) {
	                    obj[id] += 1;
	                }
	                else {
	                    obj[id] = 1;
	                }
	            }
	        }
	        if (machineNum == 0) {
	            alert(Langue.defaultLangue.alert1);
	            return;
	        }
	        console.log('obj', obj);
	        this.dataBus.showLoading();
	        this.loading = true;
	        LayaBlock.stakeTokenNft(obj, (d) => {
	            console.log("d------", d.message);
	            this.dataBus.hideLoading();
	            this.loading = false;
	            this.event('showWaitTip');
	        }).then((d) => {
	            console.log('stakeTokenNft=====派车接口返回数据:', d);
	        }).catch((e) => {
	            console.log('error=====派车接口返回数据:', e.message);
	        });
	        this.closeClick();
	        this.event(GameEvent.LANGUAGE_CHANGE);
	    }
	    selectAllClick(e) {
	        for (let i in this.listData) {
	            this.listData[i].selected = this.selectAll_btn.selected;
	        }
	        this.list.array = this.listData;
	        this.listData && this.listData.map(item => {
	            this.updateSum(item);
	        });
	    }
	    autoClick(e) {
	        console.log("自动匹配");
	    }
	    sortClick() {
	        if (this.sort == 'DESC') {
	            this.sort = 'ASC';
	            this.nav1_1_txt.text = Langue.defaultLangue['nav1_1'];
	        }
	        else {
	            this.sort = 'DESC';
	            this.nav1_1_txt.text = Langue.defaultLangue['nav1_2'];
	        }
	        this.updateList();
	    }
	    initList() {
	        if (this.hasInitList == true) {
	            return;
	        }
	        this.devTypeArr = [1, 2, 3];
	        this.selectColorArr = [1, 2, 3, 4, 5, 6];
	        this.sort = 'DESC';
	        this.btnDev1.skin = 'gameimg/dev1_2.png';
	        this.btnDev2.skin = 'gameimg/dev2_2.png';
	        this.btnDev3.skin = 'gameimg/dev3_2.png';
	        this.btnColorArr = [this.color1, this.color2, this.color3, this.color4, this.color5, this.color6];
	        for (let i in this.btnColorArr) {
	            this.btnColorArr[i].alpha = 1;
	        }
	        this.sort = 'ASC';
	        this.nav1_1_txt.text = Langue.defaultLangue['nav1_1'];
	        this.selectAll_btn.selected = false;
	        this.auto_btn.selected = false;
	        this.updateList();
	    }
	    loadData(params) {
	        this.dataBus.showLoading();
	        LayaBlock.getUserMachine(params).then((d) => {
	            this.dataBus.hideLoading();
	            console.log('设备列表：', d);
	            this.listData0 = d;
	            this.listData = [];
	            for (let i in d) {
	                this.listData.push({ id: d[i].id, type: d[i].type, color: d[i].color, selected: false });
	            }
	            this.list.array = this.listData;
	        });
	    }
	    updateItem(cell, index) {
	        cell.setItem(index, this.listData[index]);
	    }
	    onSelect(index) {
	        this.listData[index].selected = !this.listData[index].selected;
	        this.updateSum(this.listData[index]);
	    }
	    updateSum(car) {
	        let selectData = { load: 0, mining: 0, total: 0, realLoad: 0 };
	        let id = car.id;
	        if (car.selected == true) {
	            selectData = LayaBlock.selectMachine(id, true);
	        }
	        else {
	            selectData = LayaBlock.selectMachine(id, false);
	        }
	        this.sumLoad_txt.text = selectData.realLoad.toString() + "";
	        this.sumMining_txt.text = selectData.mining.toString() + "";
	        this.total_txt.text = selectData.total.toString() + "";
	    }
	    onClickList(e) {
	        console.log(e.type);
	    }
	    btnColorClick(e) {
	        let colorX = e.currentTarget;
	        colorX.alpha = colorX.alpha > 0.5 ? 0 : 1;
	        this.selectColorArr = [];
	        for (let i in this.btnColorArr) {
	            if (this.btnColorArr[i].alpha > 0.5) {
	                this.selectColorArr.push(1 + Number(i));
	            }
	        }
	        this.updateList();
	    }
	    btnDevClick(e) {
	        let curBtn = e.currentTarget;
	        let type = Number(curBtn.skin.charAt(11));
	        console.log('===', curBtn.skin.charAt(13));
	        let color = Number(curBtn.skin.charAt(13));
	        color = color == 1 ? 2 : 1;
	        curBtn.skin = 'gameimg/dev' + type + '_' + color + '.png';
	        console.log('curBtn.skin=', curBtn.skin);
	        this.devTypeArr = [];
	        for (var i in this.devArr) {
	            if (this.devArr[i].skin.indexOf('_2.png') > 0) {
	                this.devTypeArr.push(Number(i) + 1);
	            }
	        }
	        console.log(this.devTypeArr);
	        this.updateList();
	    }
	    updateList() {
	        const params = {
	            type: this.devTypeArr,
	            color: this.selectColorArr,
	            sort: this.sort
	        };
	        console.log('params', params);
	        this.loadData(params);
	    }
	    closeClick() {
	        let sumLoad = 0;
	        let sumMining = 0;
	        let total = 0;
	        this.sumLoad_txt.text = sumLoad + '';
	        this.sumMining_txt.text = sumMining + '';
	        this.total_txt.text = total + '';
	        this.visible = false;
	    }
	    onDisable() {
	    }
	}

	class EntrancePannel extends ui.EntrancePannelUI {
	    constructor() {
	        super();
	        this.info = '...';
	        this.wordPos = 0;
	        this.onLanguage = () => {
	            let arr = ['start'];
	            for (let i in arr) {
	                let txtName = arr[i];
	                this[txtName + '_txt'].text = Langue.defaultLangue[txtName];
	            }
	        };
	    }
	    onEnable() {
	        LayaBlock.getGameServer().then((d) => {
	            console.log('gameServer:', d);
	            this.gameServerList = d;
	            var labels = [];
	            for (let i in d) {
	                labels.push(d[i].name);
	            }
	            this.serverCombo.labels = labels.join();
	            if (labels.length == 1) {
	                this.serverCombo.selectedIndex = 0;
	            }
	        });
	        LayaBlock.getGameLoadDec().then((d) => {
	            if (d.dec == undefined) {
	                d.dec = '......';
	            }
	            this.info = d.dec;
	            let lang = LayaBlock.getLanguage();
	            Langue.setLanguage(lang);
	            console.log('game 描述：', d);
	            Laya.timer.frameLoop(5, this, this.printWord);
	            this.onLanguage();
	        });
	        this.btnEnter.on(Laya.Event.CLICK, this, this.enterGame);
	    }
	    printWord() {
	        this.wordPos++;
	        this.info_txt.text = this.info.substring(0, this.wordPos);
	        if (this.wordPos == this.info.length) {
	            Laya.timer.clearAll(this);
	        }
	    }
	    onDisable() {
	    }
	    enterGame() {
	        Laya.timer.clearAll(this);
	        DataBus.gameServer = this.gameServerList[this.serverCombo.selectedIndex];
	        Laya.Scene.closeAll();
	        Laya.Scene.open('Home.scene');
	    }
	}

	class AniMachine extends ui.AniMachineUI {
	    constructor() {
	        super();
	        this.machineConfig = { 1: { x: 21, y: 66, w: 267, h: 162 }, 2: { x: 13, y: 0, w: 241, h: 225 }, 3: { x: 0, y: 102, w: 267, h: 123 } };
	    }
	    onEnable() {
	        this.img.x = this.machineConfig[this.obj.type].x;
	        this.img.y = this.machineConfig[this.obj.type].y;
	        let skin = 'machine/m' + this.obj.type + '_c' + this.obj.color + '.png';
	        this.img.skin = skin;
	        this.ani1.play(0, true);
	    }
	    onDisable() {
	    }
	}

	class ItemEmail extends ui.ItemEmailUI {
	    constructor() { super(); this.width = 660; this.height = 200; }
	    onEnable() {
	    }
	    onDisable() {
	    }
	    setItem(sn, itemData) {
	    }
	}

	var Handler$1 = Laya.Handler;
	var List$1 = Laya.List;
	class EmailPannel extends ui.EmailPannelUI {
	    constructor() {
	        super();
	        this.list = new List$1();
	        this.dataBus = DataBus.getDataBus();
	        this.onLanguage = () => {
	            let arr = ['email'];
	            for (let i in arr) {
	                let txtName = arr[i];
	                this[txtName + '_txt'].text = Langue.defaultLangue[txtName];
	            }
	        };
	        this.loadData = () => {
	            console.log('加载邮件参数：', DataBus.account);
	            LayaBlock.getEmail(DataBus.account).then((d) => {
	                console.log('邮件d:', d);
	                this.list.array = d;
	            });
	        };
	    }
	    onEnable() {
	        this.btnClose.on(Laya.Event.CLICK, this, this.closeClick);
	        this.list.itemRender = ItemEmail;
	        this.list.repeatX = 1;
	        this.list.x = 45;
	        this.list.y = 140;
	        this.list.height = 1000;
	        this.list.width = 660;
	        this.list.spaceX = 20;
	        this.list.spaceY = 20;
	        this.list.vScrollBarSkin = "";
	        this.list.selectEnable = true;
	        this.list.array = [];
	        this.list.selectHandler = new Handler$1(this, this.onSelect);
	        this.list.renderHandler = new Handler$1(this, this.updateItem);
	        this.addChild(this.list);
	        this.dataBus.on(GameEvent.LANGUAGE_CHANGE, this, this.onLanguage);
	        this.onLanguage();
	        this.loadData();
	    }
	    updateItem(cell, index) {
	        cell.setItem(index, this.listData[index]);
	    }
	    onSelect(index) {
	    }
	    onDisable() {
	    }
	    closeClick() {
	        this.visible = false;
	    }
	}

	class Util {
	    constructor() {
	    }
	}
	Util.getDateStrFormat = (date, format = 'Y-M-D h:m:s') => {
	    format = format.replace('Y', date.getFullYear() + '');
	    format = format.replace('M', Util.format_0n(date.getMonth() + 1));
	    format = format.replace('D', Util.format_0n(date.getDate()));
	    format = format.replace('h', Util.format_0n(date.getHours()));
	    format = format.replace('m', Util.format_0n(date.getMinutes()));
	    format = format.replace('s', Util.format_0n(date.getSeconds()));
	    return format;
	};
	Util.getDateStrFormatByMs = (ms, format = 'Y-M-D h:m:s') => {
	    let date = new Date(ms);
	    return Util.getDateStrFormat(date, format);
	};
	Util.format_0n = (n) => {
	    let str = n + '';
	    if (n < 10) {
	        str = '0' + n;
	    }
	    return str;
	};

	class ItemHelp extends ui.ItemHelpUI {
	    constructor() { super(); this.width = 660; this.height = 220; }
	    onEnable() {
	    }
	    onDisable() {
	    }
	    setItem(sn, itemData) {
	        this.title_txt.text = itemData.title;
	        this.content_txt.text = itemData.content;
	        this.time_txt.text = Util.getDateStrFormatByMs(1000 * itemData.time);
	    }
	}

	var Handler$2 = Laya.Handler;
	var List$2 = Laya.List;
	class HelpPannel extends ui.HelpPannelUI {
	    constructor() {
	        super();
	        this.list = new List$2();
	        this.dataBus = DataBus.getDataBus();
	        this.hasInit = false;
	        this.onLanguage = () => {
	            let arr = ['help'];
	            for (let i in arr) {
	                let txtName = arr[i];
	                this[txtName + '_txt'].text = Langue.defaultLangue[txtName];
	            }
	        };
	        this.initData = () => {
	            if (this.hasInit == true) {
	                return;
	            }
	            this.hasInit = true;
	            LayaBlock.getHelp().then((d) => {
	                console.log('帮助接口返回==', d);
	                this.listData = d;
	                this.list.array = this.listData;
	            });
	        };
	    }
	    onEnable() {
	        this.btnClose.on(Laya.Event.CLICK, this, this.closeClick);
	        this.btnVideo.on(Laya.Event.CLICK, this, this.btnVideoClick);
	        this.list.itemRender = ItemHelp;
	        this.list.repeatX = 1;
	        this.list.x = 45;
	        this.list.y = 428;
	        this.list.height = 848;
	        this.list.width = 660;
	        this.list.spaceX = 20;
	        this.list.spaceY = 20;
	        this.list.vScrollBarSkin = "";
	        this.list.selectEnable = true;
	        this.list.array = [];
	        this.list.selectHandler = new Handler$2(this, this.onSelect);
	        this.list.renderHandler = new Handler$2(this, this.updateItem);
	        this.addChild(this.list);
	        this.dataBus.on(GameEvent.LANGUAGE_CHANGE, this, this.onLanguage);
	        this.onLanguage();
	    }
	    updateItem(cell, index) {
	        cell.setItem(index, this.listData[index]);
	    }
	    onSelect(index) {
	    }
	    onDisable() {
	    }
	    closeClick() {
	        this.visible = false;
	    }
	    btnVideoClick() {
	        Laya.Browser.window.location.href = 'video/1.mp4';
	    }
	    creatVideo() {
	        let divElement = Laya.Browser.createElement("div");
	        divElement.className = "div";
	        Laya.Browser.document.body.appendChild(divElement);
	        Laya.Utils.fitDOMElementInArea(divElement, this, 0, 0, Laya.stage.width, Laya.stage.height);
	        let videoElement = Laya.Browser.createElement("video");
	        videoElement.setAttribute("id", "myvideo");
	        this.videoElement = videoElement;
	        videoElement.controls = true;
	        videoElement.autoPlay = false;
	        videoElement.setAttribute("webkit-playsinline", true);
	        videoElement.setAttribute("playsinline", true);
	        videoElement.setAttribute("x5-video-player-type", 'h5');
	        videoElement.setAttribute("x-webkit-airplay", true);
	        videoElement.setAttribute("x5-video-orientation", "portrait");
	        videoElement.setAttribute('preload', 'auto');
	        videoElement.setAttribute('width', '100%');
	        videoElement.setAttribute('height', '40%');
	        videoElement.style.zInddex = Laya.Render.canvas.style.zIndex + 1;
	        videoElement.type = "vedio/mp4";
	        videoElement.src = "video/1.mp4";
	        videoElement.play();
	        divElement.appendChild(videoElement);
	        this.divElement = divElement;
	    }
	    videoEvent() {
	    }
	}

	class LastHitPannel extends ui.LastHitPannelUI {
	    constructor() { super(); this.width = 750; this.height = 1334; }
	    onEnable() {
	        this.btnClose.on(Laya.Event.CLICK, this, this.closeClick);
	        this.msg_txt.text = this.data.gameId + Langue.defaultLangue.lastHit;
	        this.verify_txt.text = Langue.defaultLangue.verify;
	        this.close_txt.text = Langue.defaultLangue.close;
	        this.btnVerify.on(Laya.Event.CLICK, this, this.gotoVerify);
	    }
	    onDisable() {
	    }
	    closeClick() {
	        this.close();
	    }
	    onClosed() {
	        this.destroy();
	    }
	    gotoVerify() {
	        Laya.Browser.window.location.href = LayaBlock.blockChainUrl + '/tx/' + this.data.txId;
	    }
	}

	class ItemCommission extends ui.ItemCommissionUI {
	    constructor() { super(); this.width = 660; this.height = 80; }
	    onEnable() {
	        this.btn.visible = false;
	        this.btn.on(Laya.Event.CLICK, this, this.btnClick);
	    }
	    onDisable() {
	    }
	    setItem(sn, itemData) {
	        this.itemData = itemData;
	        this.nick_txt.text = itemData.nick;
	        this.address_txt.text = itemData.address;
	        this.amount_txt.text = itemData.amount + '';
	        if (itemData.receive) {
	            this.receive_txt.text = Langue.defaultLangue.nav5_6;
	            this.btnReceive.skin = 'gameimg/smallBtn1.png';
	        }
	        else {
	            this.receive_txt.text = Langue.defaultLangue.nav5_7;
	            this.btnReceive.skin = 'gameimg/smallBtn0.png';
	        }
	    }
	    btnClick(event) {
	        Laya.stage.event(GameEvent.COMMISSION_MORE, this.itemData);
	        event.stopPropagation();
	    }
	}

	class ItemIncome extends ui.ItemIncomeUI {
	    constructor() { super(); this.width = 660; this.height = 80; }
	    onEnable() {
	        this.btn.on(Laya.Event.CLICK, this, this.btnClick);
	        this.btnReceive.on(Laya.Event.CLICK, this, this.btnReceiveClick);
	    }
	    btnReceiveClick(event) {
	        if (this.itemData.status == false) {
	            return;
	        }
	        this.btnReceive.disabled = true;
	        LayaBlock.withdrawAward(this.itemData.gameId).then((d) => {
	            console.log('交易结果：', d);
	        });
	        event.stopPropagation();
	    }
	    btnClick(event) {
	        Laya.stage.event(GameEvent.INCOME_MORE, this.itemData);
	        event.stopPropagation();
	    }
	    onDisable() {
	    }
	    setItem(sn, itemData) {
	        this.itemData = itemData;
	        this.id_txt.text = itemData.gameId + '';
	        this.machineNum_txt.text = itemData.machineNum + '';
	        this.reward_txt.text = itemData.ethReward + '/' + itemData.tokenReward;
	        this.btnReceive.disabled = !itemData.status;
	        if (Number(itemData.ethReward) + Number(itemData.tokenReward) == 0) {
	            itemData.receive = false;
	        }
	        if (itemData.receive) {
	            this.receive_txt.text = Langue.defaultLangue.nav5_5;
	            this.btnReceive.skin = 'gameimg/smallBtn1.png';
	        }
	        else {
	            this.receive_txt.text = Langue.defaultLangue.nav5_4;
	            this.btnReceive.skin = 'gameimg/smallBtn0.png';
	        }
	    }
	}

	class ItemPlayDetail extends ui.ItemPlayDetailUI {
	    constructor() { super(); this.width = 690; this.height = 80; }
	    onEnable() {
	        this.btn.on(Laya.Event.CLICK, this, this.btnClick);
	    }
	    btnClick(event) {
	        Laya.Browser.window.location.href = LayaBlock.blockChainUrl + '/tx/' + this.playDetail.txId;
	        event.stopPropagation();
	    }
	    onDisable() {
	    }
	    setItem(sn, itemData) {
	        this.playDetail = itemData;
	        this.machineAmounts_txt.text = this.sum(itemData.machineAmounts) + '';
	        this.load_txt.text = itemData.load + '';
	        this.machine_txt.text = itemData.machine + '';
	    }
	    sum(arr) {
	        let sum = 0;
	        for (let i = 0; i < arr.length; i++) {
	            sum += Number(arr[i]);
	        }
	        return sum;
	    }
	}

	var Handler$3 = Laya.Handler;
	var List$3 = Laya.List;
	class PlayDetaiPannel extends ui.PlayDetailPannelUI {
	    constructor() {
	        super();
	        this.list = new List$3();
	        this.dataBus = DataBus.getDataBus();
	        this.onLanguage = () => {
	            let arr = ['nav8_0', 'nav8_1', 'nav8_2', 'nav8_3'];
	            for (let i in arr) {
	                let txtName = arr[i];
	                this[txtName + '_txt'].text = Langue.defaultLangue[txtName];
	            }
	        };
	        this.loadData = (e) => {
	            LayaBlock.getPlayDetail(e.gameId, e.address).then((d) => {
	                console.log('派出详情参数：:', d);
	                this.list.array = this.listData = d;
	            });
	        };
	    }
	    onEnable() {
	        this.btnClose.on(Laya.Event.CLICK, this, this.closeClick);
	        this.list.itemRender = ItemPlayDetail;
	        this.list.repeatX = 1;
	        this.list.x = 30;
	        this.list.y = 190;
	        this.list.height = 1100;
	        this.list.width = 690;
	        this.list.spaceX = 0;
	        this.list.spaceY = 5;
	        this.list.vScrollBarSkin = "";
	        this.list.selectEnable = true;
	        this.list.array = [];
	        this.list.selectHandler = new Handler$3(this, this.onSelect);
	        this.list.renderHandler = new Handler$3(this, this.updateItem);
	        this.addChild(this.list);
	        this.dataBus.on(GameEvent.LANGUAGE_CHANGE, this, this.onLanguage);
	        this.onLanguage();
	    }
	    updateItem(cell, index) {
	        cell.setItem(index, this.listData[index]);
	    }
	    onSelect(index) {
	    }
	    onDisable() {
	    }
	    closeClick() {
	        this.visible = false;
	    }
	}

	var List$4 = Laya.List;
	var Handler$4 = Laya.Handler;
	class MePannel extends ui.MePannelUI {
	    constructor() {
	        super();
	        this.clicked1 = false;
	        this.clicked2 = false;
	        this.btnType = 0;
	        this.list1 = new List$4();
	        this.list2 = new List$4();
	        this.loading = false;
	        this.itemX = 0;
	        this.itemY = 42;
	        this.dataBus = DataBus.getDataBus();
	        this.onList1More = (e) => {
	            this.playDetailPannel.loadData(e);
	            this.playDetailPannel.visible = true;
	        };
	        this.onList2More = (e) => {
	            console.log(e);
	            alert('返佣弹出什么呢？');
	        };
	        this.onLanguage = () => {
	            let arr = ['nav4_1', 'nav4_2', 'nav4_3', 'nav4_4', 'nav4_4_1', 'nav4_5', 'nav4_6', 'nav4_7', 'nav4_8', 'nav5_1', 'nav5_2', 'nav5_3', 'nav6_1', 'nav6_2', 'nav6_3'];
	            for (let i in arr) {
	                let txtName = arr[i];
	                this[txtName + '_txt'].text = Langue.defaultLangue[txtName];
	            }
	        };
	    }
	    onEnable() {
	        this.nick2_txt.visible = this.btnSetName.visible = false;
	        this.btnClose.on(Laya.Event.CLICK, this, this.closeClick);
	        this.btnCopyRef.on(Laya.Event.CLICK, this, this.copyRef);
	        this.btnSetName.on(Laya.Event.CLICK, this, this.btnSetNameClick);
	        this.nick_txt.on(Laya.Event.CLICK, this, this.nickClick);
	        this.btn0.on(Laya.Event.CLICK, this, this.btnClick);
	        this.btn1.on(Laya.Event.CLICK, this, this.btnClick);
	        this.btn2.on(Laya.Event.CLICK, this, this.btnClick);
	        this.group0.visible = true;
	        this.group1.visible = this.group2.visible = false;
	        this.list1.itemRender = ItemIncome;
	        this.list1.repeatX = 1;
	        this.list1.x = this.itemX;
	        this.list1.y = this.itemY;
	        this.list1.height = 1100;
	        this.list1.width = 688;
	        this.list1.spaceX = 0;
	        this.list1.spaceY = 5;
	        this.list1.vScrollBarSkin = "";
	        this.list1.selectEnable = true;
	        this.list1.selectHandler = new Handler$4(this, this.onSelect1);
	        this.list1.renderHandler = new Handler$4(this, this.updateItem1);
	        this.list1.array = this.listData1;
	        this.group1.addChild(this.list1);
	        this.list2.itemRender = ItemCommission;
	        this.list2.repeatX = 1;
	        this.list2.x = this.itemX;
	        this.list2.y = this.itemY;
	        this.list2.height = 1100;
	        this.list2.width = 688;
	        this.list2.spaceX = 0;
	        this.list2.spaceY = 5;
	        this.list2.vScrollBarSkin = "";
	        this.list2.selectEnable = true;
	        this.list2.selectHandler = new Handler$4(this, this.onSelect2);
	        this.list2.renderHandler = new Handler$4(this, this.updateItem2);
	        this.list2.array = this.listData2;
	        this.group2.addChild(this.list2);
	        this.playDetailPannel = new PlayDetaiPannel();
	        this.playDetailPannel.visible = false;
	        this.addChild(this.playDetailPannel);
	        Laya.stage.on(GameEvent.INCOME_MORE, this, this.onList1More);
	        Laya.stage.on(GameEvent.COMMISSION_MORE, this, this.onList2More);
	        this.dataBus.on(GameEvent.LANGUAGE_CHANGE, this, this.onLanguage);
	        this.onLanguage();
	    }
	    updateItem1(cell, index) {
	        cell.setItem(index, this.listData1[index]);
	    }
	    onSelect1(index) {
	    }
	    updateItem2(cell, index) {
	        cell.setItem(index, this.listData2[index]);
	    }
	    onSelect2(index) {
	    }
	    btnClick(e) {
	        let curBtn = e.currentTarget;
	        let selectBtnType = Number(curBtn.name.charAt(3));
	        console.log(this.btnType, selectBtnType);
	        if (this.btnType == selectBtnType) {
	            return;
	        }
	        else {
	            this.btnType = selectBtnType;
	        }
	        this.btn0.skin = this.btn1.skin = this.btn2.skin = 'gameimg/labBg0.png';
	        curBtn.skin = 'gameimg/labBg1.png';
	        this.group0.visible = this.group1.visible = this.group2.visible = false;
	        this['show' + this.btnType]();
	    }
	    show0() {
	        this.group0.visible = true;
	    }
	    show1() {
	        this.group1.visible = true;
	        if (this.clicked1 == false) {
	            this.loadData1();
	        }
	    }
	    show2() {
	        this.group2.visible = true;
	        if (this.clicked2 == false) {
	            this.loadData2();
	        }
	    }
	    loadData1() {
	        this.clicked1 = true;
	        this.dataBus.showLoading();
	        this.loading = true;
	        LayaBlock.getUserIncome().then((d) => {
	            this.dataBus.hideLoading();
	            this.loading = false;
	            console.log('我的收益', d);
	            this.list1.array = this.listData1 = d;
	        });
	    }
	    loadData2() {
	        this.clicked2 = true;
	        this.dataBus.showLoading();
	        this.loading = true;
	        LayaBlock.getCommission().then((d) => {
	            this.dataBus.hideLoading();
	            this.loading = false;
	            this.list2.array = this.listData2 = d;
	        });
	    }
	    nickClick() {
	        this.nick2_txt.visible = this.btnSetName.visible = true;
	    }
	    btnSetNameClick() {
	        DataBus.userBase.nick = this.nick_txt.text = this.nick2_txt.text;
	        this.nick2_txt.visible = this.btnSetName.visible = false;
	        let nick = { nick: this.nick2_txt.text, address: DataBus.userBase.address };
	        LayaBlock.saveNick(nick).then((d) => {
	            console.log('d==', d);
	            if (Boolean(d) == false) {
	                alert('保存失败');
	            }
	        });
	    }
	    copyRef() {
	        alert('调用复制函数');
	    }
	    loadData() {
	        this.dataBus.showLoading();
	        this.loading = true;
	        LayaBlock.getUserBase().then((d) => {
	            this.dataBus.hideLoading();
	            this.loading = false;
	            DataBus.userBase = d;
	            if (d.nick == null || d.nick == '') {
	                this.nick2_txt.text = '';
	                this.nick2_txt.visible = this.btnSetName.visible = true;
	            }
	            else {
	                this.nick_txt.text = this.nick2_txt.text = d.nick;
	            }
	            this.address_txt.text = d.address;
	            this.ethAmount_txt.text = 'ETH:' + d.ethAmount;
	            this.tokenAmount_txt.text = d.tokenSymbol + ':' + d.tokenAmount;
	            this.ref_txt.text = d.ref;
	            this.nick2_txt;
	        });
	    }
	    onDisable() {
	    }
	    closeClick() {
	        this.visible = false;
	    }
	}

	class NoticePannel extends ui.NoticePannelUI {
	    constructor() {
	        super();
	        this.dataBus = DataBus.getDataBus();
	        this.onLanguage = () => {
	            let arr = ['notice', 'home_0'];
	            for (let i in arr) {
	                let txtName = arr[i];
	                this[txtName + '_txt'].text = Langue.defaultLangue[txtName];
	            }
	        };
	        this.loadData = () => {
	            LayaBlock.getNotice().then((d) => {
	                console.log(d);
	                this.title_txt.text = d.title;
	                this.content_txt.text = d.content;
	                this.time_txt.text = Util.getDateStrFormatByMs(d.time * 1000, 'Y-M-D h:m:s');
	            });
	        };
	    }
	    onEnable() {
	        this.btnClose.on(Laya.Event.CLICK, this, this.closeClick);
	        this.btnOk.on(Laya.Event.CLICK, this, this.closeClick);
	        this.dataBus.on(GameEvent.LANGUAGE_CHANGE, this, this.onLanguage);
	        this.onLanguage();
	    }
	    onDisable() {
	    }
	    closeClick() {
	        this.visible = false;
	    }
	}

	class ItemRank extends ui.ItemRankUI {
	    constructor() { super(); this.width = 750; this.height = 80; }
	    onEnable() {
	        this.btn.on(Laya.Event.CLICK, this, this.btnClick);
	    }
	    onDisable() {
	    }
	    setItem(sn, itemData) {
	        this.sn = sn;
	        this.itemData = itemData;
	        this.load_txt.text = itemData.load;
	        this.address_txt.text = itemData.addressShort;
	        if (sn == -1) {
	            this.snImg.visible = false;
	            this.sn_txt.visible = true;
	            this.bg.skin = 'gameimg/rankbg1.png';
	        }
	        else if (sn <= 2) {
	            this.snImg.visible = true;
	            this.sn_txt.visible = false;
	            this.snImg.skin = 'gameimg/sn' + (sn + 1) + '.png';
	            this.bg.skin = 'gameimg/rankbg1.png';
	        }
	        else {
	            this.snImg.visible = false;
	            this.sn_txt.visible = true;
	            this.sn_txt.text = sn + 1 + '';
	            this.bg.skin = 'gameimg/rankbg0.png';
	        }
	    }
	    btnClick(event) {
	        Laya.stage.event(GameEvent.RANK_MORE, this.itemData);
	        event.stopPropagation();
	    }
	}

	var List$5 = Laya.List;
	var Handler$5 = Laya.Handler;
	class RankPannel extends ui.RankPannelUI {
	    constructor() {
	        super();
	        this.sort = 'DESC';
	        this.list = new List$5();
	        this.hasInitList = false;
	        this.listData = [];
	        this.itemX = 30;
	        this.itemY0 = 189;
	        this.itemY1 = 290;
	        this.loading = false;
	        this.rankType = 0;
	        this.dataBus = DataBus.getDataBus();
	        this.onRankMore = (e) => {
	            console.log(e);
	            this.playDetailPannel.loadData(e);
	            this.playDetailPannel.visible = true;
	        };
	        this.onLanguage = () => {
	            let arr = ['nav3_0', 'nav3_1', 'nav3_2', 'nav3_3', 'nav3_4', 'nav3_5'];
	            for (let i in arr) {
	                let txtName = arr[i];
	                this[txtName + '_txt'].text = Langue.defaultLangue[txtName];
	            }
	        };
	    }
	    onEnable() {
	        this.btnClose.on(Laya.Event.CLICK, this, this.closeClick);
	        this.list.itemRender = ItemRank;
	        this.list.repeatX = 1;
	        this.list.x = this.itemX;
	        this.list.y = this.itemY1;
	        this.list.height = 1000;
	        this.list.spaceX = 20;
	        this.list.spaceY = 10;
	        this.list.vScrollBarSkin = "";
	        this.list.selectEnable = true;
	        this.list.selectHandler = new Handler$5(this, this.onSelect);
	        this.list.renderHandler = new Handler$5(this, this.updateItem);
	        this.list.array = this.listData;
	        this.addChild(this.list);
	        this.lastItem = new ItemRank();
	        this.lastItem.x = this.itemX;
	        this.lastItem.y = this.itemY0;
	        this.addChild(this.lastItem);
	        this.myItem = new ItemRank();
	        this.myItem.x = this.itemX;
	        this.myItem.y = 1220;
	        this.addChild(this.myItem);
	        this.rankType0.on(Laya.Event.CLICK, this, this.rankTypeClick);
	        this.rankType1.on(Laya.Event.CLICK, this, this.rankTypeClick);
	        this.rankType2.on(Laya.Event.CLICK, this, this.rankTypeClick);
	        this.dataBus.on(GameEvent.LANGUAGE_CHANGE, this, this.onLanguage);
	        Laya.stage.on(GameEvent.RANK_MORE, this, this.onRankMore);
	        this.onLanguage();
	        this.playDetailPannel = new PlayDetaiPannel();
	        this.playDetailPannel.visible = false;
	        this.addChild(this.playDetailPannel);
	    }
	    rankTypeClick(e) {
	        if (this.loading == true) {
	            return;
	        }
	        let curBtn = e.currentTarget;
	        let selectRankType = Number(curBtn.name.charAt(8));
	        console.log('---------', selectRankType, this.rankType);
	        if (this.rankType == selectRankType) {
	            return;
	        }
	        else {
	            this.rankType = selectRankType;
	        }
	        this.rankType0.skin = this.rankType1.skin = this.rankType2.skin = 'gameimg/labBg0.png';
	        curBtn.skin = 'gameimg/labBg1.png';
	        this.updateList();
	    }
	    updateItem(cell, index) {
	        cell.setItem(index, this.listData[index]);
	    }
	    onSelect(index) {
	        this.listData[index].selected = !this.listData[index].selected;
	    }
	    onDisable() {
	    }
	    closeClick() {
	        this.visible = false;
	    }
	    initList() {
	        if (this.hasInitList == true) {
	            return;
	        }
	        this.hasInitList = true;
	        this.sort = 'DESC';
	        this.rankType0.skin = 'gameimg/labBg1.png';
	        this.rankType1.skin = 'gameimg/labBg0.png';
	        this.rankType2.skin = 'gameimg/labBg0.png';
	        this.sort = 'ASC';
	        this.updateList();
	    }
	    updateList() {
	        console.log('rankType:', this.rankType);
	        this.loading = true;
	        if (this.rankType == 0) {
	            this.loadData10();
	            this.myItem.visible = this.lastItem.visible = true;
	            this.list.y = this.itemY1;
	        }
	        else if (this.rankType == 1) {
	            this.loadDataMe();
	            this.myItem.visible = this.lastItem.visible = true;
	            this.list.y = this.itemY1;
	        }
	        else if (this.rankType == 2) {
	            this.loadData100();
	            this.myItem.visible = this.lastItem.visible = false;
	            this.list.y = this.itemY0;
	        }
	    }
	    loadDataMe() {
	        this.dataBus.showLoading();
	        LayaBlock.getUserRank().then((d) => {
	            this.dataBus.hideLoading();
	            this.loading = false;
	            this.myItem.setItem(-1, d);
	            this.myItem.sn_txt.text = 'ME';
	        });
	    }
	    loadDataLast() {
	        this.dataBus.showLoading();
	        LayaBlock.getLastStraw().then((d) => {
	            this.loading = false;
	            this.dataBus.hideLoading();
	            this.loading = false;
	            this.lastItem.setItem(-1, d);
	            this.lastItem.sn_txt.text = 'LAST';
	        });
	    }
	    loadData10() {
	        this.dataBus.showLoading();
	        LayaBlock.getRankTop10().then((d) => {
	            this.dataBus.hideLoading();
	            this.loading = false;
	            this.listData = [];
	            for (let i in d) {
	                this.listData.push({ sn: i, load: d[i].load, addressShort: d[i].addressShort, address: d[i].address, gameId: d[i].gameId });
	            }
	            this.list.array = this.listData;
	            this.loading = false;
	        });
	    }
	    loadData50() {
	        this.dataBus.showLoading();
	        LayaBlock.getRankTop50().then((d) => {
	            this.dataBus.hideLoading();
	            this.loading = false;
	            this.listData = [];
	            for (let i in d) {
	                this.listData.push({ sn: i, load: d[i].load, addressShort: d[i].addressShort, address: d[i].address, gameId: d[i].gameId });
	            }
	            this.list.array = this.listData;
	            this.loading = false;
	        });
	    }
	    loadData100() {
	        this.dataBus.showLoading();
	        LayaBlock.getGameRankTop50().then((d) => {
	            this.dataBus.hideLoading();
	            this.loading = false;
	            this.listData = [];
	            for (let i in d) {
	                this.listData.push({ sn: i, load: d[i].load, addressShort: d[i].addressShort, address: d[i].address, gameId: d[i].gameId });
	            }
	            this.list.array = this.listData;
	            this.loading = false;
	        });
	    }
	}

	class SetPannel extends ui.SetPannelUI {
	    constructor() {
	        super();
	        this.dataBus = DataBus.getDataBus();
	        this.config = {
	            'zh-CN': 0,
	            'en-US': 1,
	            'kr': 2,
	            0: 'zh-CN',
	            1: 'en-US',
	            2: 'kr'
	        };
	        this.onLanguage = () => {
	            let arr = ['setTitle', 'musicSet', 'music', 'sound', 'gasSet', 'langSet'];
	            for (let i in arr) {
	                let txtName = arr[i];
	                this[txtName + '_txt'].text = Langue.defaultLangue[txtName];
	            }
	            this.musicRadioGroup.labels = this.soundRadioGroup.labels = Langue.defaultLangue.onOff;
	        };
	    }
	    onEnable() {
	        this.btnClose.on(Laya.Event.CLICK, this, this.closeClick);
	        this.musicRadioGroup.on(Laya.Event.CHANGE, this, this.musicRadioGroupChange);
	        this.soundRadioGroup.on(Laya.Event.CHANGE, this, this.soundRadioGroupChange);
	        this.languageRadioGroup.on(Laya.Event.CHANGE, this, this.languageRadioGroupChange);
	        this.init();
	        this.dataBus.on(GameEvent.LANGUAGE_CHANGE, this, this.onLanguage);
	        this.onLanguage();
	    }
	    init() {
	        let language = LayaBlock.getLanguage();
	        this.languageRadioGroup.selectedIndex = this.config[language];
	        this.musicRadioGroup.selectedIndex = Number(Laya.LocalStorage.getItem('musicFlag'));
	        this.soundRadioGroup.selectedIndex = Number(Laya.LocalStorage.getItem('soundFlag'));
	        this.gas_txt.text = '10.0';
	    }
	    musicRadioGroupChange() {
	        Laya.LocalStorage.setItem('musicFlag', this.musicRadioGroup.selectedIndex + '');
	        if (this.musicRadioGroup.selectedIndex == 0) {
	            Laya.SoundManager.setMusicVolume(1);
	        }
	        else {
	            Laya.SoundManager.setMusicVolume(0);
	        }
	    }
	    soundRadioGroupChange() {
	        Laya.LocalStorage.setItem('soundFlag', this.soundRadioGroup.selectedIndex + '');
	        if (this.soundRadioGroup.selectedIndex == 0) {
	            Laya.SoundManager.setSoundVolume(1);
	        }
	        else {
	            Laya.SoundManager.setSoundVolume(0);
	        }
	    }
	    languageRadioGroupChange() {
	        console.log(this.languageRadioGroup.selectedIndex);
	        let lang = this.config[this.languageRadioGroup.selectedIndex];
	        LayaBlock.setLanguage(lang);
	        Langue.setLanguage(lang);
	        this.dataBus.event(GameEvent.LANGUAGE_CHANGE);
	    }
	    onDisable() {
	    }
	    closeClick() {
	        this.visible = false;
	    }
	}

	var TimeLine = Laya.TimeLine;
	class Home extends ui.HomeUI {
	    constructor() {
	        super();
	        this.dataBus = DataBus.getDataBus();
	        this.stoneNum = 0;
	        this.booms = new Laya.Sprite();
	        this.boomLoopId = 0;
	        this.initUI = () => {
	            this.waitTip.visible = false;
	            this.devPannel = new DevPannel();
	            this.addChild(this.devPannel);
	            this.devPannel.visible = false;
	            this.devPannel.on('showWaitTip', this, this.showWaitTip);
	            this.notiecPannel = new NoticePannel();
	            this.addChild(this.notiecPannel);
	            this.notiecPannel.visible = false;
	            this.emailPannel = new EmailPannel();
	            this.addChild(this.emailPannel);
	            this.emailPannel.visible = false;
	            this.mePannel = new MePannel();
	            this.addChild(this.mePannel);
	            this.mePannel.visible = false;
	            this.rankPannel = new RankPannel();
	            this.addChild(this.rankPannel);
	            this.rankPannel.visible = false;
	            this.setPannel = new SetPannel();
	            this.addChild(this.setPannel);
	            this.setPannel.visible = false;
	            this.helpPannel = new HelpPannel();
	            this.addChild(this.helpPannel);
	            this.helpPannel.visible = false;
	            this.onLanguage();
	            this.cloud0.alpha = Math.random();
	        };
	        this.showWaitTip = () => {
	            this.waitTip.visible = true;
	            this.aniWait.play();
	        };
	        this.hideWaitTip = () => {
	            this.waitTip.visible = false;
	            this.aniWait.stop();
	        };
	        this.mainEnd = (data) => {
	            this.boom();
	            let lastHitPannel = new LastHitPannel();
	            lastHitPannel.data = data;
	            setTimeout(() => {
	                Laya.Tween.to(this.booms, { alpha: 0 }, 1000);
	                lastHitPannel.popup(false, true);
	            }, 3500);
	        };
	        this.boom = () => {
	            console.log('boom=======');
	            Laya.timer.frameLoop(1, this, this.boomRun);
	            Stone.dy = -this.shan.scaleY * 169;
	            this.booms.x = 216;
	            this.booms.y = 440 + Stone.dy;
	            this.addChildAt(this.booms, 2);
	        };
	        this.boomRun = () => {
	            this.boomLoopId++;
	            if (this.boomLoopId % 2 == 0 && this.stoneNum < 50) {
	                this.stoneNum++;
	                var stone = new Stone();
	                this.booms.addChild(stone);
	            }
	            for (let i = 0; i < this.stoneNum; i++) {
	                var stone = this.booms.getChildAt(i);
	                stone.update();
	            }
	        };
	        this.loadData = () => {
	            clearTimeout(this.timeoutOfLoadData);
	            this.timeoutOfLoadData = setTimeout(this.loadData, 5000);
	            LayaBlock.getMineData().then((d) => {
	                this.mine_txt.text = d.surplus + '/' + d.total;
	                this.shan.scaleY = (d.surplus / d.total) * 0.9 + 0.1;
	            });
	            LayaBlock.getUserMine().then((d) => {
	                this.ethAmount_txt.text = d.ethAmount + '';
	                this.reward_txt.text = d.reward + '';
	                this.rate_txt.text = (d.rate * 100).toFixed(2) + '%';
	                this.rank_txt.text = d.rank + '';
	            });
	            LayaBlock.getAccount().then((d) => {
	                DataBus.account = d;
	            });
	        };
	        this.addEvt = () => {
	            this.btnDevice.on(Laya.Event.MOUSE_DOWN, this, this.menuClick);
	            this.btnExchange.on(Laya.Event.MOUSE_DOWN, this, this.menuClick);
	            this.btnRank.on(Laya.Event.MOUSE_DOWN, this, this.menuClick);
	            this.btnMe.on(Laya.Event.MOUSE_DOWN, this, this.menuClick);
	            this.devPannel.on(GameEvent.CLOSE_PANNEL, this, this.closePannel);
	            this.btnNotice.on(Laya.Event.CLICK, this, this.showNoticePannel);
	            this.btnEmail.on(Laya.Event.CLICK, this, this.showEmailPannel);
	            this.btnHelp.on(Laya.Event.CLICK, this, this.showHelpPannel);
	            this.btnSet.on(Laya.Event.CLICK, this, this.showSetPannel);
	            this.btnChat.on(Laya.Event.CLICK, this, this.btnChatClick);
	            this.dataBus.on(GameEvent.LANGUAGE_CHANGE, this, this.onLanguage);
	            this.test_btn.on(Laya.Event.CLICK, this, this.test);
	            Laya.timer.frameLoop(3, this, this.run);
	        };
	        this.run = () => {
	            this.cloud0.x += 1;
	            if (this.cloud0.x > 800) {
	                this.cloud0.x = -200;
	                this.cloud0.y = 140 + Math.random() * 50;
	                this.cloud0.scaleY = Math.random() * 0.5 + 0.5;
	                this.cloud0.alpha = Math.random();
	            }
	            this.bird.x -= 2;
	            if (this.bird.x < -200) {
	                this.bird.x = 750;
	                this.bird.y = 300 + Math.random() * 100;
	            }
	        };
	        this.test = () => {
	            let lastStraw = {
	                gameId: 123214,
	                address: 'tom',
	                machine: 99,
	                load: 99,
	                txId: 'ui43409834fd',
	                blockNumber: 5445
	            };
	            this.mainEnd(lastStraw);
	        };
	        this.onLanguage = () => {
	            this.gongGao_txt.text = Langue.defaultLangue.notice_0;
	            let arr = ['notice', 'email', 'chat', 'nav1', 'nav2', 'nav3', 'nav4', 'waitTip'];
	            for (let i in arr) {
	                let txtName = arr[i];
	                this[txtName + '_txt'].text = Langue.defaultLangue[txtName];
	            }
	        };
	        this.btnChatClick = () => {
	            alert('敬请期待');
	        };
	        this.closePannel = () => {
	            this.selectBg.x = -300;
	        };
	        this.showHelpPannel = () => {
	            this.helpPannel.visible = true;
	            this.helpPannel.initData();
	        };
	        this.showSetPannel = () => {
	            this.setPannel.visible = true;
	        };
	        this.showNoticePannel = () => {
	            this.notiecPannel.visible = true;
	            this.notiecPannel.loadData();
	        };
	        this.showEmailPannel = () => {
	            this.emailPannel.visible = true;
	            this.emailPannel.loadData();
	        };
	        this.machineGo = (obj) => {
	            this.hideWaitTip();
	            this.gongGao_txt.text = '玩家' + obj.nick + '派出车辆挖矿';
	            clearTimeout(this.timeoutGongGao);
	            this.timeoutGongGao = setTimeout(() => {
	                this.gongGao_txt.text = Langue.defaultLangue.notice_0;
	            }, 10000);
	            let aniMachine = new AniMachine();
	            aniMachine.obj = obj;
	            aniMachine.scale(-0.5, 0.5);
	            aniMachine.pos(-100, 1200);
	            this.machines.addChild(aniMachine);
	            let timeLine = new TimeLine();
	            let dy = 30;
	            timeLine.addLabel("road1", 0).to(aniMachine, { x: 900, y: 814 + dy }, 4000, null, 0)
	                .addLabel("road2", 0).to(aniMachine, { x: 800, y: 490 + dy, scaleX: 0.3, scaleY: 0.3, alpha: 1 }, 1000, null, 0)
	                .addLabel("road3", 0).to(aniMachine, { x: 520, y: 440 + dy, scaleX: 0.2, scaleY: 0.2, alpha: 1 }, 4000, null, 0)
	                .addLabel("road4", 0).to(aniMachine, { x: 400, y: 430 + dy, scaleX: 0.1, scaleY: 0.1, alpha: 1 }, 3000, null, 0)
	                .addLabel("road5", 0).to(aniMachine, { x: 270, y: 380 + dy, scaleX: 0.06, scaleY: 0.06, alpha: 1 }, 6000, null, 0);
	            timeLine.play(0, false);
	            timeLine.on(Laya.Event.COMPLETE, this, this.onComplete);
	            timeLine.on(Laya.Event.LABEL, this, this.onLabel);
	        };
	        this.testBlock = () => {
	            LayaBlock.getTokenBalance().then((d) => {
	            });
	            LayaBlock.getEthBalance().then((d) => {
	            });
	            LayaBlock.getUserMachine().then((d) => {
	                d.map((item) => {
	                });
	            });
	            LayaBlock.getTokenAllowance().then((d) => {
	                if (!d) {
	                    LayaBlock.tokenApprove().then((d) => {
	                    }).catch((e) => {
	                    });
	                }
	            });
	        };
	    }
	    onEnable() {
	        LayaBlock.initWeb3();
	        LayaBlock.activeGame(DataBus.gameServer, this.machineGo, this.mainEnd);
	        this.initUI();
	        this.loadData();
	        this.addEvt();
	    }
	    onComplete() {
	    }
	    onLabel(label) {
	    }
	    menuClick(e) {
	        let curBtn = e.currentTarget;
	        this.selectBg.x = curBtn.x;
	        switch (curBtn) {
	            case this.btnDevice:
	                this.devPannel.visible = true;
	                this.devPannel.initList();
	                break;
	            case this.btnExchange:
	                Laya.Browser.window.location.href = LayaBlock.exchangeUrl;
	                break;
	            case this.btnRank:
	                this.rankPannel.visible = true;
	                this.rankPannel.initList();
	                break;
	            case this.btnMe:
	                this.mePannel.visible = true;
	                this.mePannel.loadData();
	                break;
	        }
	    }
	    onDisable() {
	    }
	}
	var Image = Laya.Image;
	class Stone extends Image {
	    constructor() {
	        super();
	        this.vx = 0;
	        this.vy = 0;
	        this.maxY = 50;
	        this.skin = 'gameimg/icon1.png';
	        this.vx = Math.random() * 20 - 10;
	        this.vy = -Math.random() * 10 - 10;
	        this.x = Math.random() * 100 - 50;
	        this.maxY = Math.random() * 50 + 10 - Stone.dy;
	        this.scaleX = this.scaleY = Math.random() * 0.4 + 0.1;
	    }
	    update() {
	        if (this.y > this.maxY) {
	            return;
	        }
	        this.x += this.vx;
	        this.vy += Stone.G;
	        this.y += this.vy;
	    }
	}
	Stone.G = 2;
	Stone.dy = 0;

	class GameConfig {
	    constructor() {
	    }
	    static init() {
	        var reg = Laya.ClassUtils.regClass;
	        reg("DevPannel.ts", DevPannel);
	        reg("EntrancePannel.ts", EntrancePannel);
	        reg("Home.ts", Home);
	    }
	}
	GameConfig.width = 750;
	GameConfig.height = 1333;
	GameConfig.scaleMode = "showall";
	GameConfig.screenMode = "none";
	GameConfig.alignV = "top";
	GameConfig.alignH = "left";
	GameConfig.startScene = "EntrancePannel.scene";
	GameConfig.sceneRoot = "";
	GameConfig.debug = false;
	GameConfig.stat = false;
	GameConfig.physicsDebug = false;
	GameConfig.exportSceneToJson = true;
	GameConfig.init();

	class Main {
	    constructor() {
	        if (window["Laya3D"])
	            Laya3D.init(GameConfig.width, GameConfig.height);
	        else
	            Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
	        Laya["Physics"] && Laya["Physics"].enable();
	        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
	        Laya.stage.scaleMode = GameConfig.scaleMode;
	        Laya.stage.screenMode = GameConfig.screenMode;
	        Laya.stage.alignV = GameConfig.alignV;
	        Laya.stage.alignH = GameConfig.alignH;
	        Laya.stage.bgColor = "#e4d6c3";
	        Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
	        if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
	            Laya.enableDebugPanel();
	        if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
	            Laya["PhysicsDebugDraw"].enable();
	        if (GameConfig.stat)
	            Laya.Stat.show();
	        Laya.alertGlobalError(true);
	        var pro_res = [
	            { url: "loading/loadingBg.png", type: Laya.Loader.IMAGE },
	            { url: "res/atlas/loading.atlas", type: Laya.Loader.ATLAS }
	        ];
	        Laya.loader.load(pro_res, Laya.Handler.create(this, this.onProLoaded));
	    }
	    onProLoaded() {
	        this.progressShow();
	        var res = [
	            { url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS },
	            { url: "res/atlas/loading.atlas", type: Laya.Loader.ATLAS },
	            { url: "res/atlas/gameimg.atlas", type: Laya.Loader.ATLAS },
	            { url: "res/atlas/machine.atlas", type: Laya.Loader.ATLAS },
	            { url: "gameimg/bg.png", type: Laya.Loader.IMAGE },
	            { url: "gameimg/bg0.png", type: Laya.Loader.IMAGE },
	            { url: "gameimg/color.png", type: Laya.Loader.IMAGE },
	            { url: "gameimg/menuBarIcon.png", type: Laya.Loader.IMAGE },
	            { url: "gameimg/rankbg0.png", type: Laya.Loader.IMAGE },
	            { url: "gameimg/rankbg1.png", type: Laya.Loader.IMAGE },
	            { url: "gameimg/shanX.png", type: Laya.Loader.IMAGE },
	            { url: "gameimg/tu.png", type: Laya.Loader.IMAGE },
	            { url: "gameimg/videoImg.png", type: Laya.Loader.IMAGE },
	            { url: "sound/bg.mp3", type: Laya.Loader.SOUND },
	        ];
	        Laya.loader.load(res, null, Laya.Handler.create(this, this.onProgress, null, false));
	    }
	    progressShow() {
	        this.loadingPage = new Laya.Sprite();
	        let loadingBg = new Laya.Image("loading/loadingBg.png");
	        this.loadingBar = new Laya.Image('loading/loadingBar.png');
	        this.loadingBar.pos(359 + 18, 544 + 141);
	        this.loadingBar.rotation = 180;
	        this.loadingPage.addChild(loadingBg);
	        this.loadingPage.addChild(this.loadingBar);
	        Laya.stage.addChild(this.loadingPage);
	    }
	    onProgress(pro) {
	        this.loadingBar.scaleY = pro;
	        if (pro == 1) {
	            Laya.timer.once(10, this, this.onLoad);
	        }
	    }
	    onLoad() {
	        Laya.stage.removeChild(this.loadingPage);
	        Laya.SoundManager.playMusic("sound/bg.mp3", 0);
	        let musicFlag = Number(Laya.LocalStorage.getItem('musicFlag'));
	        if (musicFlag == 1) {
	            Laya.SoundManager.setMusicVolume(0);
	        }
	        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	    }
	    onVersionLoaded() {
	        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	        Laya.AtlasInfoManager.enable("fileconfig.json");
	    }
	    onConfigLoaded() {
	        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
	        DataBus.getDataBus().addEvt();
	    }
	}
	new Main();

}());
