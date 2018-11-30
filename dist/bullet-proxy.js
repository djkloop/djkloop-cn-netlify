window.onload = function () {
    console.log("bullet-proxy.js loading");
    /**
     *  [ channel 弹幕的跑道]
     * @type { Class }
     */
    var Channel = /** @class */ (function () {
        function Channel(root) {
            console.log("constructor -> \u6B63\u5728\u521D\u59CB\u5316\u8DD1\u9053");
            this._root = root;
            this.reset();
        }
        Channel.prototype.reset = function () {
            var _this = this;
            setTimeout(function () {
                var container = _this._root;
                _this.setChannelProps(container);
                // console.log(`跑道个数 -> ${this._channels.length}`);
                // console.log(`跑道高度 -> ${this._channelHeight}`);
            }, 200);
        };
        Channel.prototype.resetWithCb = function (cb) {
            var container = this._root;
            this.setChannelProps(container);
            if (cb) {
                cb(true);
            }
        };
        Channel.prototype.setChannelProps = function (root) {
            var size = root.getBoundingClientRect();
            this._width = size.width;
            this._height = size.height;
            var fontSize = /mobile/ig.test(navigator.userAgent) ? 10 : 20;
            var channelSize = Math.floor(this._height / fontSize);
            var channels = [];
            for (var i = 0; i < channelSize; i++) {
                channels[i] = {
                    id: i,
                    queue: [],
                    step: 99999,
                    surplus: 0
                };
            }
            this._channels = channels;
            this._channelHeight = fontSize;
        };
        Channel.prototype.addBullet = function (bullet) {
            var left = this._width;
            var channels = this._channels;
            var channelHeight = this._channelHeight;
            var occupy = Math.ceil(bullet.height / channelHeight);
            if (occupy > channels.length) {
                return {
                    result: false,
                    message: "exceed channels.length, occupy=" + occupy + ",channelsSize=" + channels.length
                };
            }
            else {
                var flag = true, channel = void 0, pos = -1;
                for (var i = 0, max = channels.length - occupy; i <= max; i++) {
                    if (channels[i].queue.some(function (item) { return item.id === bullet.id; })) {
                        return {
                            result: false,
                            message: "excited, channelOrder=" + i + ",id=" + bullet.id
                        };
                    }
                }
                for (var i = 0, max = channels.length - occupy; i <= max; i++) {
                    flag = true;
                    for (var j = i; j < i + occupy; j++) {
                        var channel_1 = channels[j];
                        if (channel_1.step < bullet.step || channel_1.surplus < 0) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        pos = i;
                        break;
                    }
                }
                if (pos !== -1) {
                    for (var i = pos, max = pos + occupy; i < max; i++) {
                        channel = channels[i];
                        channel.queue.unshift(bullet);
                        channel.step = bullet.step;
                        channel.surplus -= bullet.width;
                    }
                    bullet.channel_id = [pos, occupy];
                    bullet.top = pos * channelHeight;
                    bullet.left = left;
                    return {
                        result: bullet,
                        message: 'success'
                    };
                }
                else {
                    return {
                        result: false,
                        message: 'no step or surplus will right'
                    };
                }
            }
        };
        return Channel;
    }());
    var MainBullet = /** @class */ (function () {
        function MainBullet(el, opts) {
            console.log('constructor -> 进入主线程');
            this.root = document.querySelector("" + el);
            this._options = opts;
            this._isActive = true;
            this._data = [];
            this._channel = new Channel(this.root);
            this.queue = [];
            this._options = Object.assign({}, {
                type: 'json',
                dataMap: function (res) {
                    if (res.length > 0) {
                        return res.map(function (item) {
                            return {
                                id: item.id,
                                text: item.text,
                                duration: item.duration * 1,
                                color: item.text_color.replace('0x', '#'),
                                scale: item.text_scale * 1,
                                start: item.offset_time * 1,
                                avatarUrl: item.avatarUrl
                            };
                        });
                    }
                    else {
                        return [];
                    }
                }
            }, opts);
            this.init();
        }
        MainBullet.prototype.init = function () {
            var _this = this;
            console.log("init -> \u542F\u52A8\u5F39\u5E55\u6E32\u67D3\u8FDB\u7A0B");
            if (this._isActive) {
                this.createBulletContainer(true);
                this._channel.resetWithCb(this.onChange.bind(this));
            }
            else {
                this.createBulletContainer(false);
            }
            var data = this._options.dataMap.call(null, this._options.data);
            this._data = data;
            var el = document.createElement('div');
            el.style.padding = "0px";
            el.style.position = 'absolute';
            el.style.left = '-99999px';
            el.className = "xx-xxx-xxxx-xxx";
            document.body.appendChild(el);
            var size;
            this._data.forEach(function (item, index) {
                el.textContent = item.text;
                el.style.fontSize = 20 * item.scale + "px";
                el.style.padding = _this._options.padding + "||'0px'";
                size = el.getBoundingClientRect();
                item.width = size.width;
                item.height = size.height;
                item._index = ++index;
            });
            document.body.removeChild(document.querySelector('.xx-xxx-xxxx-xxx'));
            this.readData();
            this.dataHandle();
            // console.log(this._data)
        };
        MainBullet.prototype.start = function () {
            console.log("start -> main-start");
            this._channel.reset();
            this.init();
        };
        MainBullet.prototype.onChange = function (isActive) {
            console.log(isActive, ' isActive');
            // this.start();
        };
        // TODO: 自动创建元素
        MainBullet.prototype.createBulletContainer = function (isActive) {
            var bullet = C.createDom('dm-bullet-control', "<span class=" + (isActive ? 'start' : 'paused') + ">" + (isActive ? '开始' : '暂停') + "</span>", {}, 'dm-bullet-container');
            this.root.appendChild(bullet);
        };
        MainBullet.prototype.readData = function () {
            var _this = this;
            // 过滤下没有id的
            var bulletDataList = this._data.filter(function (item) { return item.id; });
            var bullet, result, channel = this._channel;
            var container = this.root.querySelector('.bullet-wrapper');
            bulletDataList.forEach(function (item) {
                bullet = new Bullet(container, item);
                result = channel.addBullet(bullet);
                if (result.result) {
                    _this.queue.push(bullet);
                    bullet.reset();
                    bullet.attach();
                }
            });
        };
        MainBullet.prototype.dataHandle = function () {
            if (this.queue.length) {
                this.queue.forEach(function (item) {
                    item.startMove();
                });
            }
        };
        return MainBullet;
    }());
    /**
     * [ Bullet 弹幕构造类 ]
     * @type Bullet
     */
    var Bullet = /** @class */ (function () {
        function Bullet(container, bulletOptions) {
            this._index = bulletOptions._index;
            this.duration = bulletOptions.duration;
            this.id = bulletOptions.id;
            this.width = bulletOptions.width;
            this.height = bulletOptions.height;
            this.start = bulletOptions.start;
            this.text = bulletOptions.text;
            this.text_color = bulletOptions.color;
            this.container = container;
            var $el = document.createElement('div');
            var $containerEl = document.createElement('div');
            $el.style.cssText = "color: " + this.text_color + ";";
            $el.textContent = "" + this.text;
            this.containerBoundingPos = this.container.getBoundingClientRect();
            this.left = this.containerBoundingPos.left;
            $containerEl.classList.add('bullet-item');
            $containerEl.setAttribute('data-row', String(this._index));
            $containerEl.appendChild($el);
            this._el = $containerEl;
            this.end = -this.width;
            this.step = (this.containerBoundingPos.width + this.width) / this.duration / 60;
            // console.log(`constructor -> 正在初始化第${ this._index }条弹幕实例`);
        }
        ;
        Bullet.prototype.reset = function () {
            var _el = this._el;
            _el.style.left = this.left + "px";
            _el.style.top = this.top + "px";
        };
        Bullet.prototype.attach = function () {
            this.container.appendChild(this._el);
        };
        Bullet.prototype.startMove = function () {
            var _this = this;
            var leftDuration = (this._el.getBoundingClientRect().right - this.containerBoundingPos.left) / ((this.containerBoundingPos.width + this.width) / this.duration);
            this._el.style.transition = "-webkit-transform " + leftDuration + "s linear 0s";
            setTimeout(function () {
                _this._el.style.transform = "translateX(-" + (_this._el.getBoundingClientRect().right - _this.containerBoundingPos.left) + "px) translateY(0px) translateZ(0px)";
            }, 20);
        };
        return Bullet;
    }());
    window.createBullet = function (el, opts) {
        return new MainBullet(el, opts);
    };
    var dyData = [];
    for (var i = 0; i < 66; i++) {
        dyData.push({
            text: 'flutter, 好啊 - ' + i,
            id: Math.random(),
            type: 2,
            text_color: C.createColor(),
            duration: 10,
            text_scale: 1,
            offset_time: 1000,
            avatarUrl: 'http://active.qiutianaimeili.com/one_year_head_3.jpg'
        });
    }
    var damData = [
        {
            text: 'flutter, 好啊',
            id: '381',
            type: 2,
            text_color: 'black',
            duration: 10,
            text_scale: 1,
            offset_time: 1000,
            avatarUrl: 'http://active.qiutianaimeili.com/one_year_head_3.jpg'
        },
        {
            text: 'flutter, 好啊',
            id: '381211',
            type: 2,
            text_color: 'black',
            duration: 10,
            text_scale: 1,
            offset_time: 1000,
            avatarUrl: 'http://active.qiutianaimeili.com/one_year_head_3.jpg'
        },
        {
            text: 'flutter, 真香',
            id: '328',
            type: 2,
            text_color: 'black',
            duration: 10,
            text_scale: 1,
            offset_time: 1000,
            avatarUrl: 'http://active.qiutianaimeili.com/one_year_head_3.jpg'
        },
        {
            text: 'flutter, 666',
            id: '348',
            type: 2,
            text_color: 'black',
            duration: 10,
            text_scale: 1,
            offset_time: 1000,
            avatarUrl: 'http://active.qiutianaimeili.com/one_year_head_3.jpg'
        },
        {
            text: 'flutter, 是谷歌出的',
            id: '3888a',
            type: 2,
            text_color: 'black',
            duration: 10,
            text_scale: 1,
            offset_time: 1000,
            avatarUrl: 'http://active.qiutianaimeili.com/one_year_head_3.jpg'
        },
        {
            text: 'flutter, 是谷歌出的',
            id: '38883333',
            type: 2,
            text_color: 'black',
            duration: 10,
            text_scale: 1,
            offset_time: 1000,
            avatarUrl: 'http://active.qiutianaimeili.com/one_year_head_3.jpg'
        },
        {
            text: '我是一条弹幕',
            id: '388811111',
            type: 2,
            text_color: 'black',
            duration: 10,
            text_scale: 1,
            offset_time: 1000,
            avatarUrl: 'http://active.qiutianaimeili.com/one_year_head_3.jpg'
        },
        {
            text: '我是一条测试弹幕-1',
            id: '3888',
            type: 2,
            text_color: 'black',
            duration: 10,
            text_scale: 1,
            offset_time: 1000,
            avatarUrl: 'http://active.qiutianaimeili.com/one_year_head_3.jpg'
        },
        {
            text: '我是一条红色弹幕',
            id: '3888111111',
            type: 2,
            text_color: 'red',
            duration: 10,
            text_scale: 1,
            offset_time: 1000,
            avatarUrl: 'http://active.qiutianaimeili.com/one_year_head_3.jpg'
        },
        {
            text: 'ReactNative, 好啊',
            id: '3888ff',
            type: 2,
            text_color: 'black',
            duration: 10,
            text_scale: 1,
            offset_time: 1000,
            avatarUrl: 'http://active.qiutianaimeili.com/one_year_head_3.jpg'
        },
        {
            text: 'ReactNative, 是facebook出的',
            id: '8fdsfsd88',
            type: 2,
            text_color: 'black',
            duration: 12,
            text_scale: 1,
            offset_time: 1000,
            avatarUrl: 'http://active.qiutianaimeili.com/one_year_head_3.jpg'
        },
        {
            text: 'ReactNative, 666',
            id: '883231328',
            type: 2,
            text_color: 'black',
            duration: 12,
            text_scale: 1,
            offset_time: 1000,
            avatarUrl: 'http://active.qiutianaimeili.com/one_year_head_3.jpg'
        },
        {
            text: 'ReactNative, 真香',
            id: '88811',
            type: 2,
            text_color: 'black',
            duration: 12,
            text_scale: 1,
            offset_time: 1000,
            avatarUrl: 'http://active.qiutianaimeili.com/one_year_head_3.jpg'
        },
    ];
    window.createBullet('#bullet-1', { data: damData.concat(dyData), padding: 5 });
};
