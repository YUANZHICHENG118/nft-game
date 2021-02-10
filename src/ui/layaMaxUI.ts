/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
var REG: Function = Laya.ClassUtils.regClass;
export module ui {
    export class AniMachineUI extends Scene {
		public ani1:Laya.FrameAnimation;
		public img:Laya.Image;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("AniMachine");
        }
    }
    REG("ui.AniMachineUI",AniMachineUI);
    export class BlackBgUI extends Scene {
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("BlackBg");
        }
    }
    REG("ui.BlackBgUI",BlackBgUI);
    export class DataLoadingUI extends Dialog {
		public loading_ani:Laya.Animation;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("DataLoading");
        }
    }
    REG("ui.DataLoadingUI",DataLoadingUI);
    export class DevDetailUI extends View {
		public devPanel:Laya.Sprite;
		public btnClose:Laya.Sprite;
		public nav7_1_txt:Laya.Label;
		public machine:Laya.Image;
		public nav7_2_txt:Laya.Label;
		public load_txt:Laya.Label;
		public nav7_3_txt:Laya.Label;
		public level_txt:Laya.Label;
		public remark_txt:Laya.Label;
		public nav7_2_1_txt:Laya.Label;
		public mining_txt:Laya.Label;
		public btnExchange:Laya.Image;
		public nav7_4_txt:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("DevDetail");
        }
    }
    REG("ui.DevDetailUI",DevDetailUI);
    export class DevPannelUI extends Scene {
		public devPanel:Laya.Sprite;
		public btnClose:Laya.Sprite;
		public btnDev1:Laya.Image;
		public btnDev2:Laya.Image;
		public btnDev3:Laya.Image;
		public stakeTokenNft_btn:Laya.Image;
		public nav1_8_txt:Laya.Label;
		public get_btn:Laya.Image;
		public nav1_9_txt:Laya.Label;
		public addDev_mc:Laya.Image;
		public addNum_txt:Laya.TextInput;
		public btnOk:Laya.Image;
		public nav4_6_3_txt:Laya.Label;
		public addClose_btn:Laya.Sprite;
		public addTitle_txt:Laya.Label;
		public sort_btn:Laya.Sprite;
		public nav1_1_txt:Laya.Label;
		public color1:Laya.Sprite;
		public color2:Laya.Sprite;
		public color3:Laya.Sprite;
		public color4:Laya.Sprite;
		public color5:Laya.Sprite;
		public color6:Laya.Sprite;
		public nav1_4_txt:Laya.Label;
		public auto_btn:Laya.CheckBox;
		public nav1_3_txt:Laya.Label;
		public selectAll_btn:Laya.CheckBox;
		public nav1_5_txt:Laya.Label;
		public sumLoad_txt:Laya.Label;
		public nav1_6_txt:Laya.Label;
		public sumMining_txt:Laya.Label;
		public nav1_7_txt:Laya.Label;
		public total_txt:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("DevPannel");
        }
    }
    REG("ui.DevPannelUI",DevPannelUI);
    export class EmailPannelUI extends Dialog {
		public devPanel:Laya.Sprite;
		public btnClose:Laya.Sprite;
		public email_txt:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("EmailPannel");
        }
    }
    REG("ui.EmailPannelUI",EmailPannelUI);
    export class EntrancePannelUI extends Scene {
		public serverCombo:Laya.ComboBox;
		public btnEnter:Laya.Sprite;
		public start_txt:Laya.Text;
		public info_txt:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("EntrancePannel");
        }
    }
    REG("ui.EntrancePannelUI",EntrancePannelUI);
    export class HelpPannelUI extends View {
		public devPanel:Laya.Sprite;
		public btnClose:Laya.Sprite;
		public help_txt:Laya.Label;
		public btnVideo:Laya.Sprite;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("HelpPannel");
        }
    }
    REG("ui.HelpPannelUI",HelpPannelUI);
    export class HomeUI extends Scene {
		public cloud0:Laya.Sprite;
		public bird:Laya.Sprite;
		public selectBg:Laya.Sprite;
		public nav1_txt:Laya.Label;
		public nav2_txt:Laya.Label;
		public nav3_txt:Laya.Label;
		public nav4_txt:Laya.Label;
		public btnDevice:Laya.Sprite;
		public btnExchange:Laya.Sprite;
		public btnRank:Laya.Sprite;
		public btnMe:Laya.Sprite;
		public btnSet:Laya.Sprite;
		public btnHelp:Laya.Sprite;
		public btnNotice:Laya.Sprite;
		public notice_txt:Laya.Label;
		public gongGao_txt:Laya.Label;
		public test_btn:Laya.Sprite;
		public mine_mc:Laya.Image;
		public mineProgress:Laya.Image;
		public mine_txt:Laya.Label;
		public ethAmount_mc:Laya.Image;
		public ethAmount_txt:Laya.Label;
		public rank_mc:Laya.Image;
		public rank_txt:Laya.Label;
		public rate_mc:Laya.Image;
		public rate_txt:Laya.Label;
		public reward_mc:Laya.Image;
		public reward_txt:Laya.Label;
		public machines:Laya.Sprite;
		public mount_mask:Laya.Sprite;
		public shan:Laya.Sprite;
		public btnEmail:Laya.Sprite;
		public email_txt:Laya.Label;
		public btnChat:Laya.Sprite;
		public chat_txt:Laya.Label;
		public waitTip:Laya.Sprite;
		public aniWait:Laya.Animation;
		public waitTip_txt:Laya.Label;
		public tip_mc:Laya.Image;
		public tip_txt:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("Home");
        }
    }
    REG("ui.HomeUI",HomeUI);
    export class ItemCommissionUI extends View {
		public address_txt:Laya.Label;
		public amount_txt:Laya.Label;
		public nick_txt:Laya.Label;
		public btn:Laya.Sprite;
		public btnReceive:Laya.Image;
		public receive_txt:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("ItemCommission");
        }
    }
    REG("ui.ItemCommissionUI",ItemCommissionUI);
    export class ItemDevUI extends View {
		public bg:Laya.Image;
		public img:Laya.Image;
		public balance_txt:Laya.Text;
		public more_btn:Laya.Sprite;
		public del_btn:Laya.Sprite;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("ItemDev");
        }
    }
    REG("ui.ItemDevUI",ItemDevUI);
    export class ItemEmailUI extends View {
		public title_txt:Laya.Label;
		public notie_txt:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("ItemEmail");
        }
    }
    REG("ui.ItemEmailUI",ItemEmailUI);
    export class ItemHelpUI extends View {
		public title_txt:Laya.Label;
		public content_txt:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("ItemHelp");
        }
    }
    REG("ui.ItemHelpUI",ItemHelpUI);
    export class ItemIncomeUI extends View {
		public machineNum_txt:Laya.Label;
		public reward_txt:Laya.Label;
		public id_txt:Laya.Label;
		public btn:Laya.Sprite;
		public btnReceive:Laya.Image;
		public receive_txt:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("ItemIncome");
        }
    }
    REG("ui.ItemIncomeUI",ItemIncomeUI);
    export class ItemPlayDetailUI extends View {
		public bg:Laya.Image;
		public machineAmounts_txt:Laya.Label;
		public machine_txt:Laya.Label;
		public btn:Laya.Sprite;
		public load_txt:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("ItemPlayDetail");
        }
    }
    REG("ui.ItemPlayDetailUI",ItemPlayDetailUI);
    export class ItemRankUI extends Scene {
		public bg:Laya.Image;
		public snImg:Laya.Image;
		public load_txt:Laya.Label;
		public sn_txt:Laya.Label;
		public address_txt:Laya.Label;
		public btn:Laya.Sprite;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("ItemRank");
        }
    }
    REG("ui.ItemRankUI",ItemRankUI);
    export class LastHitPannelUI extends Dialog {
		public devPanel:Laya.Sprite;
		public btnVerify:Laya.Image;
		public verify_txt:Laya.Label;
		public msg_txt:Laya.Label;
		public btnClose:Laya.Image;
		public close_txt:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("LastHitPannel");
        }
    }
    REG("ui.LastHitPannelUI",LastHitPannelUI);
    export class MePannelUI extends View {
		public btnClose:Laya.Sprite;
		public btn0:Laya.Image;
		public nav4_1_txt:Laya.Label;
		public btn1:Laya.Image;
		public nav4_2_txt:Laya.Label;
		public btn2:Laya.Image;
		public nav4_3_txt:Laya.Label;
		public group0:Laya.Sprite;
		public nav4_4_txt:Laya.Label;
		public nick_txt:Laya.Label;
		public btnSetName:Laya.Sprite;
		public nav4_4_1_txt:Laya.Label;
		public nick2_txt:Laya.TextInput;
		public nav4_5_txt:Laya.Label;
		public address_txt:Laya.Label;
		public nav4_6_txt:Laya.Label;
		public ethAmount_txt:Laya.Label;
		public tokenAmount_txt:Laya.Label;
		public ethIcon:Laya.Image;
		public tokenIcon:Laya.Image;
		public lockNum_txt:Laya.Label;
		public btnLock:Laya.Sprite;
		public nav4_6_2_txt:Laya.Label;
		public btnUnLock:Laya.Sprite;
		public nav4_6_1_txt:Laya.Label;
		public lockPan_mc:Laya.Image;
		public lockNum2_txt:Laya.TextInput;
		public btnOk:Laya.Image;
		public nav4_6_3_txt:Laya.Label;
		public btnCloseLock:Laya.Sprite;
		public nav4_7_txt:Laya.Label;
		public ref_txt:Laya.Label;
		public btnCopyRef:Laya.Sprite;
		public nav4_8_txt:Laya.Label;
		public tip_mc:Laya.Image;
		public tip_txt:Laya.Label;
		public btnWen1:Laya.Sprite;
		public group1:Laya.Sprite;
		public nav5_1_txt:Laya.Label;
		public nav5_2_txt:Laya.Label;
		public nav5_3_txt:Laya.Label;
		public group2:Laya.Sprite;
		public nav6_1_txt:Laya.Label;
		public nav6_2_txt:Laya.Label;
		public nav6_3_txt:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("MePannel");
        }
    }
    REG("ui.MePannelUI",MePannelUI);
    export class NoticePannelUI extends Scene {
		public devPanel:Laya.Sprite;
		public btnClose:Laya.Sprite;
		public btnOk:Laya.Image;
		public home_0_txt:Laya.Label;
		public title_txt:Laya.Label;
		public notice_txt:Laya.Label;
		public content_txt:Laya.TextArea;
		public time_txt:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("NoticePannel");
        }
    }
    REG("ui.NoticePannelUI",NoticePannelUI);
    export class PlayDetailPannelUI extends View {
		public devPanel:Laya.Sprite;
		public btnClose:Laya.Sprite;
		public nav8_1_txt:Laya.Label;
		public nav8_2_txt:Laya.Label;
		public nav8_3_txt:Laya.Label;
		public nav8_0_txt:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("PlayDetailPannel");
        }
    }
    REG("ui.PlayDetailPannelUI",PlayDetailPannelUI);
    export class RankPannelUI extends View {
		public devPanel:Laya.Sprite;
		public btnClose:Laya.Sprite;
		public rankType0:Laya.Image;
		public nav3_0_txt:Laya.Label;
		public rankType1:Laya.Image;
		public nav3_1_txt:Laya.Label;
		public titleGroup0:Laya.Sprite;
		public nav3_3_txt:Laya.Label;
		public nav3_4_txt:Laya.Label;
		public nav3_5_txt:Laya.Label;
		public rankType2:Laya.Image;
		public nav3_2_txt:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("RankPannel");
        }
    }
    REG("ui.RankPannelUI",RankPannelUI);
    export class SetPannelUI extends Scene {
		public btnClose:Laya.Sprite;
		public setTitle_txt:Laya.Label;
		public musicSet_txt:Laya.Label;
		public music_txt:Laya.Label;
		public musicRadioGroup:Laya.RadioGroup;
		public sound_txt:Laya.Label;
		public soundRadioGroup:Laya.RadioGroup;
		public gasSet_txt:Laya.Label;
		public langSet_txt:Laya.Label;
		public languageRadioGroup:Laya.RadioGroup;
		public gas_txt:Laya.Label;
		public languageCombo:Laya.ComboBox;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("SetPannel");
        }
    }
    REG("ui.SetPannelUI",SetPannelUI);
    export class TipPannelUI extends Dialog {
		public devPanel:Laya.Sprite;
		public btnOk:Laya.Image;
		public ok_txt:Laya.Label;
		public msg_txt:Laya.Label;
		public btnClose:Laya.Image;
		public close_txt:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("TipPannel");
        }
    }
    REG("ui.TipPannelUI",TipPannelUI);
    export class ToastUI extends Dialog {
		public tip_txt:Laya.Text;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("Toast");
        }
    }
    REG("ui.ToastUI",ToastUI);
}
export module ui.prefab {
    export class profitPannelUI extends Scene {
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("prefab/profitPannel");
        }
    }
    REG("ui.prefab.profitPannelUI",profitPannelUI);
}