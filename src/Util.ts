export default class Util{
    
    constructor() { }

    static getDateStrFormat=(date:Date, format = 'Y-M-D h:m:s')=> {
        format = format.replace('Y', date.getFullYear()+'');
        format = format.replace('M', Util.format_0n(date.getMonth() + 1));
        format = format.replace('D', Util.format_0n(date.getDate()));
        format = format.replace('h', Util.format_0n(date.getHours()));
        format = format.replace('m', Util.format_0n(date.getMinutes()));
        format = format.replace('s', Util.format_0n(date.getSeconds()));
        return format;
    }

    static getDateStrFormatByMs=(ms:number, format = 'Y-M-D h:m:s')=> {
        let date:Date=new Date(ms)
        return Util.getDateStrFormat(date,format);
    }

    static format_0n = (n:number) => {
        let str:string=n+'';
        if(n<10){
            str = '0' + n
          }
        return str;
    }
}