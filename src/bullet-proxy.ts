interface Window {
  createBullet: (el: string, opts: any) => any
}

interface MainBulletOptions {
  data: any,
  padding: number,
  dataMap: (arr: any[]) => any,
  el: string
}

interface BulletItem {
  id: string,
  text: string,
  duration: number,
  color: string,
  scale: number,
  start: number,
  width: number,
  height: number,
  avatarUrl?: string,
  _index: number
}

window.onload = function () {
  console.log(`bullet-proxy.js loading`);
  class MainBullet {
    public root: HTMLElement;
    private _options: MainBulletOptions;
    private _isActive: boolean;
    private _data: BulletItem[] | [];
    private _channel: any;
    private _bulletQueue: [];
    constructor(el, opts) {
      console.log('constructor -> 进入主线程');
      this.root = document.querySelector(`${el}`);
      this._options = opts;
      this._isActive = true;
      this._data = [];
      this._channel = new Channel(this.root);
      this._bulletQueue = [];
      this._options = Object.assign({}, {
        type: 'json',
        dataMap: function(res) {
          if (res.length > 0) {
            return res.map(item => {
              return {
                id: item.id,
                text: item.text,
                duration: item.duration * 1,
                color: item.text_color.replace('0x', '#'),
                scale: item.text_scale * 1,
                start: item.offset_time * 1,
                avatarUrl: item.avatarUrl
              }
            }, opts)
          } else {
            return []
          }
        }
      }, opts)
      this.init()
    }

    init() {
      console.log(`init -> 启动弹幕渲染进程`);
      if(this._isActive) {
        this.createBulletContainer(true);
      } else {
        this.createBulletContainer(false);
      }
      let data = this._options.dataMap.call(null, this._options.data);
      this._data = data;
      let el = document.createElement('div');
      el.style.padding = `0px`;
      el.style.position = 'absolute';
      el.style.left = '-99999px';
      el.className = "xx-xxx-xxxx-xxx";
      document.body.appendChild(el);
      let size;
      this._data.forEach((item: BulletItem, index) => {
        el.textContent = item.text;
        el.style.fontSize = `${20 * item.scale}px`;
        el.style.padding = `${this._options.padding}||'0px'`
        size = el.getBoundingClientRect();
        item.width = size.width;
        item.height = size.height;
        item._index = ++index;
      });
      document.body.removeChild(document.querySelector('.xx-xxx-xxxx-xxx'));
      this.readData();
      // console.log(this._data)
    }
    // TODO: 自动创建元素
    createBulletContainer(isActive) {
      let bullet = C.createDom('dm-bullet-control', `<span class=${isActive ? 'start' : 'paused'}>${ isActive ? '开始' : '暂停' }</span>`, {}, 'dm-bullet-container');
      this.root.appendChild(bullet);
    }

    readData() {
      // 过滤下没有id的
      let bulletDataList = this._data.filter(item => item.id);
      let bullet;
      let container = this.root.querySelector('.bullet-wrapper') as HTMLElement;
      bulletDataList.forEach((item: BulletItem) => {
        bullet = new Bullet(container, item);
      });
    }
  }


  /**
   *  [ channel 弹幕的跑道]
   * @type { Class }
   */
  class Channel {
    private _root: HTMLElement;
    private _width: number;
    private _height: number;
    private _channels: any[];
    private _channelHeight: number;
    constructor(root: HTMLElement) {
      console.log(`constructor -> 正在初始化跑道`);
      this._root = root;
      this.reset();
    }

    reset() {
      setTimeout(() => {
        let container = this._root;
        let size = container.getBoundingClientRect()
        this._width = size.width
        this._height = size.height
        let fontSize = /mobile/ig.test(navigator.userAgent) ? 10 : 20
        let channelSize = Math.floor(this._height / fontSize)
        let channels = []
        for (let i = 0; i < channelSize; i++) {
          channels[i] = {
            id: i,
            queue: [],
            step: 99999,
            surplus: 0
          }
        };
        this._channels = channels;
        this._channelHeight = fontSize;
        console.log(`跑道个数 -> ${this._channels.length}`);
        console.log(`跑道高度 -> ${this._channelHeight}`);
      }, 200)
    }
  }

  /**
   * [ Bullet 弹幕构造类 ]
   * @type Bullet
   */
  class Bullet {
    id: string;
    text: string;
    duration: number;
    color: string;
    scale: number;
    start: number;
    width: number;
    height: number;
    avatarUrl?: string;
    _index: number;
    end: number;
    left: number;
    step: number;
    containerBoundingPos: {
      top: number,
      left: number,
      right: number,
      bottom: number,
      width: number,
      height: number
    }
    container: HTMLElement;
    _el: HTMLElement;
    constructor(container: HTMLElement, bulletOptions: BulletItem) {
      this._index = bulletOptions._index;
      this.duration = bulletOptions.duration;
      this.id = bulletOptions.id;
      this.width = bulletOptions.width;
      this.height = bulletOptions.height;
      this.start = bulletOptions.start;
      this.text = bulletOptions.text;
      this.container = container;
      let $el = document.createElement('div');
      $el.style.cssText = `color: ${this.color};`;
      $el.textContent = `${this.text}`;
      this.containerBoundingPos = this.container.getBoundingClientRect();
      this.left = this.containerBoundingPos.left
      this._el = $el;
      this.end = -this.width;
      this.step = (this.containerBoundingPos.width + this.width) / this.duration / 60;
      // console.log(`constructor -> 正在初始化第${ this._index }条弹幕实例`);
    }
  }

  window.createBullet = function (el: string, opts: any) {
    return new MainBullet(el, opts);
  }

  const damData = [
    {
      text: '我是一条弹幕',
      id: '3888',
      type: 2,
      text_color: 'black',
      duration: 1000,
      text_scale: 1,
      offset_time: 1000,
      avatarUrl: 'http://active.qiutianaimeili.com/one_year_head_3.jpg'
    },
    {
      text: '我是一条弹幕------111111',
      id: '3888',
      type: 2,
      text_color: 'black',
      duration: 1000,
      text_scale: 1,
      offset_time: 1000,
      avatarUrl: 'http://active.qiutianaimeili.com/one_year_head_3.jpg'
    }
  ]

  window.createBullet('#bullet-1', {data: damData, padding: 5});

}