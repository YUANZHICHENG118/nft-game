window.LayaSocket = (function (exports) {
    'use strict';

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    class Socket {
        constructor(wsAddr, options, callback) {
            const url = wsAddr;
            _classCallCheck(this, Socket);
            this.options = options;
            this.messageMap = {};	// 消息订阅中心
            this.connState = 0;
            this.socket = null;
            this.url = url;
            this.chartCall = 0
            this.subArr = [];
            this.destroySocket = this.destroy;
            this.on = this.on;
            this.send = this.send;
            this.init(callback);
        }

        isConnect() {
            return this.connState === 2
        }

        async callAbsoluteSync(action, data) {
            let _this = this
            let setInt = setInterval(() => {
                if (_this.chartCall === 1) {
                    clearInterval(setInt);
                    return
                }
                const chartOpenCallback = this.messageMap['chartOpen'];
                if (chartOpenCallback) {
                    chartOpenCallback(data)
                    _this.chartCall = 1
                    clearInterval(setInt);
                } else {
                    _this.callAbsoluteSync(action, data)
                }
            }, 100)
        }

        init(callback) {
            this.connState = 1;
            let _this = this
            const BrowserWebSocket = window.WebSocket || window.MozWebSocket;
            const socket = new BrowserWebSocket(this.url);
            socket.onclose = this.onClose
            socket.onmessage = async evt => {
                try {
                    const result = JSON.parse(evt.data)
                    _this.onReceiver(result);
                } catch (err) {
                    console.log(err)
                }
            };
            socket.onerror = this.onError
            this.socket = socket;
            socket.onopen = async evt => {
                _this.connState = 2;
                new Promise(function (resolve, reject) {
                    callback(_this);
                })
            }
        }

        checkOpen() {
            return this.connState === 2;
        }

        onClose() {
            this.connState = 0;
        }

        send(data) {
            if (this.socket.readyState !== 1) {
                setTimeout(function () {
                    this.send(data);
                }.bind(this), 100);
            } else {
                this.socket.send(JSON.stringify(data));
            }

        }

        emit(data) {
            var _this2 = this;
            return new Promise(function (resolve) {
                _this2.socket.send(JSON.stringify(data));
                _this2.on('message', function (data) {
                    resolve(data);
                });
            });
        }

        checkHeartbeat() {
            var data = {
                'cmd': 'ping',
                'args': [Date.parse(new Date())],
                'id': '1368'
            };
            this.send(data);
        }

        onReceiver(data) {
            // 触发订阅中心回调
            const callback = this.messageMap[data.type];
            if (callback) callback(data);
        }

        on(name, handler) {
            this.messageMap[name] = handler;
        }

        doClose() {
            this.socket.close();
        }

        destroy() {
            this.socket.close();
            this.connState = 0;
            this.socket = null;
        }

        onError(err) {
        }


    }

    exports.Socket = Socket;

    return exports;

}({}));
