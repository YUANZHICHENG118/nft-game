(function (global, factory) {
    "use strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ? factory(global, true) : function (w) {
            if (!w.document) {
                throw new Error("jQuery requires a window with a document");
            }
            return factory(w);
        };
    } else {
        factory(global);
    }

// Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    //加载时的描述
    let gameLoadDec = {
        zh:'公园2020年',
        en:'abcd',
        kr:'abcd'
    };

    const getGameLoadDec=()=>{
        return new Promise(function(resolve, reject){
            resolve(gameLoadDec)
        });
    }

    /**
     * 获取nick
     * @param address
     * @returns {Promise<any>}
     */
    const getNick=(address)=>{
        return new Promise(function(resolve, reject){
            resolve({address:"0x000",nick:"第五敌人"})
        });
    }

    /**
     * 保存nick
     * @param address
     * @returns {Promise<any>}
     */
    const saveNick=(data)=>{
        return new Promise(function(resolve, reject){
            resolve({code:1,msg:'success',data:{address:"0x000",nick:"第五敌人"}})
        });
    }

    /**
     * 获取最新公告
     * @returns {Promise<any>}
     */
    const getNotice=()=>{
        return new Promise(function(resolve, reject){
            resolve({id:1,title:"系统维护公告",time:1607050113,content:"系统维护公告内容"})
        });
    }

    /**
     * 获取邮件
     * @returns {Promise<any>}
     */
    const getEmail=(address)=>{
        const data=[{
            id:1,
            type:0,
            title:"领取token",
            time:1607050113,
            content:"领取token内容",
            del:0,//0 未删除 1 已删除
            read:0, //0 未读 1 已读
            receive:0 // 0未领取 1 已领取
        },{
            id:2,
            type:1,
            title:"测试测试",
            time:1607050113,
            content:"测试测试",
            del:1,//0 未删除 1 已删除
            read:1, //0 未读 1 已读
            receive:1 // 0未领取 1 已领取
        }]
        return new Promise(function(resolve, reject){
            resolve(data)
        });
    }

    /**
     * 获取帮助数据
     * @returns {Promise<any>}
     */
    const getHelp=()=>{
        const data=[{
            id:1,
            title:'帮助文档测的',
            time:1607050113,
            content:'内容测试'
        },{
            id:1,
            title:'帮助文档测的',
            time:1607050113,
            content:'内容测试'
        }]
        return new Promise(function(resolve, reject){
            resolve(data)
        });
    }

    /**
     * 我的佣金明细
     * @returns {Promise<any>}
     */
    const getCommission=()=>{
        const data=[{
            nick:'第二敌人',
            address:'0xsssssssssss', // 地址
            amount:100, //数量
            txId:'', // 哈希
            receive:0 // 0未领取 1 已领取
        },{
            nick:'第五敌人',
            address:'0xsssssssssss', // 地址
            amount:100, //数量
            txId:'', // 哈希
            receive:1 // 0未领取 1 已领取
        }]
        return new Promise(function(resolve, reject){
            resolve(data)
        });
    }

    var api = {
        getGameLoadDec:getGameLoadDec,
        getNick:getNick,
        saveNick:saveNick,
        getNotice:getNotice,
        getEmail:getEmail,
        getHelp:getHelp,
        getCommission:getCommission
    }
    if (!noGlobal) {
        window.NftApi = api;
    }
    return NftApi;
})
