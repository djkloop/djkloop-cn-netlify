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
  _index: number,
  step?: number,
  channel_id?: number[],
  top: number,
  left: number,
}

interface ChannelProps {
  _root: HTMLElement,
  _width: number,
  _height: number,
  _channels: any[],
  _channelHeight: number,
  reset: () => void,
  resetWithCb: (cb: any) => void,
  setChannelProps: (root: HTMLElement) => void,
  addBullet: (bullet: BulletItem) => void
}

window.onload = function () {
  console.log(`bullet-proxy.js loading`);

/**
 *  [ channel 弹幕的跑道]
 * @type { Class }
 */
class Channel implements ChannelProps {
  _root: HTMLElement;
  _width: number;
  _height: number;
  _channels: any[];
  _channelHeight: number;
  constructor(root: HTMLElement) {
    console.log(`constructor -> 正在初始化跑道`);
    this._root = root;
    this.reset();
  }

  reset() {
    setTimeout(() => {
      let container = this._root;
      this.setChannelProps(container);
      // console.log(`跑道个数 -> ${this._channels.length}`);
      // console.log(`跑道高度 -> ${this._channelHeight}`);
    }, 200)
  }

  resetWithCb(cb) {
    let container = this._root;
    this.setChannelProps(container);
    if (cb) {
      cb(true)
    }
  }

  setChannelProps(root: HTMLElement) {
    let size = root.getBoundingClientRect();
    this._width = size.width;
    this._height = size.height;
    let fontSize = /mobile/ig.test(navigator.userAgent) ? 10 : 20;
    let channelSize = Math.floor(this._height / fontSize);
    let channels = [];
    for (let i = 0; i < channelSize; i++) {
      channels[i] = {
        id: i,
        queue: [],
        step: 99999,
        surplus: 0
      }
    }
    this._channels = channels;
    this._channelHeight = fontSize;
  }

  addBullet(bullet: BulletItem) {
    let left = this._width;
    let channels = this._channels;
    let channelHeight = this._channelHeight;
    let occupy = Math.ceil(bullet.height / channelHeight);
    if (occupy > channels.length) {
      return {
        result: false,
        message: `exceed channels.length, occupy=${occupy},channelsSize=${channels.length}`
      }
    } else {
      let flag = true, channel, pos = -1;
      for (let i = 0, max = channels.length - occupy; i <= max; i++) {
        if (channels[i].queue.some(item => item.id === bullet.id)) {
          return {
            result: false,
            message: `excited, channelOrder=${i},id=${bullet.id}`
          }
        }
      }
      for (let i = 0, max = channels.length - occupy; i <= max; i++) {
        flag = true;
        for (let j = i; j < i + occupy; j++) {
          const channel = channels[j]
          if (channel.step < bullet.step || channel.surplus < 0) {
            flag = false;
            break;
          }
        }
        if (flag) {
          pos = i
          break
        }
      }
      if (pos !== -1) {
        for (let i = pos, max = pos + occupy; i < max; i++) {
          channel = channels[i]
          channel.queue.unshift(bullet)
          channel.step = bullet.step
          channel.surplus -= bullet.width
        }
        bullet.channel_id = [pos, occupy]
        bullet.top = pos * channelHeight
        bullet.left = left
        return {
          result: bullet,
          message: 'success'
        }
      } else {
        return {
          result: false,
          message: 'no step or surplus will right'
        }
      }
    }
  }
}


class MainBullet {
  public root: HTMLElement;
  private _options: MainBulletOptions;
  private _isActive: boolean;
  private _data: BulletItem[] | any[];
  private _channel: ChannelProps;
  private queue: any[];
  constructor(el, opts) {
    console.log('constructor -> 进入主线程');
    this.root = document.querySelector(`${el}`);
    this._options = opts;
    this._isActive = true;
    this._data = [];
    this._channel = new Channel(this.root);
    this.queue = [];
    this._options = Object.assign({}, {
      type: 'json',
      dataMap: function (res) {
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
    if (this._isActive) {
      this.createBulletContainer(true);
      this._channel.resetWithCb(this.onChange.bind(this));
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
    (this._data as BulletItem[]).forEach((item: BulletItem, index: number) => {
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

  start() {
    console.log(`start -> main-start`)
    this._channel.reset();
    this.init();
  }

  onChange(isActive) {
    console.log(isActive, ' isActive')
    // this.start();
  }


  // TODO: 自动创建元素
  createBulletContainer(isActive) {
    let bullet = C.createDom('dm-bullet-control', `<span class=${isActive ? 'start' : 'paused'}>${isActive ? '开始' : '暂停'}</span>`, {}, 'dm-bullet-container');
    this.root.appendChild(bullet);
  }

  readData() {
    // 过滤下没有id的
    let bulletDataList = (this._data as BulletItem[]).filter((item: BulletItem) => item.id);
    let bullet, result, channel = this._channel;
    let container = this.root.querySelector('.bullet-wrapper') as HTMLElement;
    bulletDataList.forEach((item: BulletItem) => {
      bullet = new Bullet(container, item);
      result = channel.addBullet(bullet);
      if (result.result) {
        this.queue.push(bullet)
        // bullet.reset();
        // bullet.attach();
      }
    });
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
  avatarUrl?: string;;
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
    id: '888',
    type: 2,
    text_color: 'black',
    duration: 1000,
    text_scale: 1,
    offset_time: 1000,
    avatarUrl: 'http://active.qiutianaimeili.com/one_year_head_3.jpg'
  }
]

window.createBullet('#bullet-1', { data: damData, padding: 5 });

}