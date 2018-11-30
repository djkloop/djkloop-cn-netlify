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
  _bulletContainer: HTMLDivElement;
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
          })
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
    this.dataHandle();
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
        bullet.reset();
        bullet.attach();
      }
    });
  }

  dataHandle() {
    if(this.queue.length) {
      this.queue.forEach(item => {
        item.startMove();
      })
    }
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
  text_color: string;
  scale: number;
  start: number;
  width: number;
  height: number;
  avatarUrl?: string;;
  _index: number;
  end: number;
  left: number;
  top:  number;
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
    this.text_color = bulletOptions.color;
    this.container = container;
    let $el = document.createElement('div');
    let $containerEl = document.createElement('div');
    $el.style.cssText = `color: ${this.text_color};`;
    $el.textContent = `${this.text}`;
    this.containerBoundingPos = this.container.getBoundingClientRect();
    this.left = this.containerBoundingPos.left
    $containerEl.classList.add('bullet-item');
    $containerEl.setAttribute('data-row', String(this._index))
    $containerEl.appendChild($el);
    this._el = $containerEl;
    this.end = -this.width;
    this.step = (this.containerBoundingPos.width + this.width) / this.duration / 60;
    // console.log(`constructor -> 正在初始化第${ this._index }条弹幕实例`);
  }

  reset () {
    let _el = this._el;
    _el.style.left = `${this.left}px`;
    _el.style.top = `${this.top}px`;
  }

  attach () {
    this.container.appendChild(this._el);
  }

  startMove() {
    let leftDuration = (this._el.getBoundingClientRect().right - this.containerBoundingPos.left) / ((this.containerBoundingPos.width + this.width) / this.duration)
    this._el.style.transition = `-webkit-transform ${leftDuration}s linear 0s`
    setTimeout(() => {
      this._el.style.transform = `translateX(-${this._el.getBoundingClientRect().right - this.containerBoundingPos.left}px) translateY(0px) translateZ(0px)`
    }, 20)

  }
}

window.createBullet = function (el: string, opts: any) {
  return new MainBullet(el, opts);
}

const dyData = [];

for (let i = 0; i < 66; i++) {
  dyData.push(
    {
      text: 'flutter, 好啊 - ' + i,
      id: Math.random(),
      type: 2,
      text_color: C.createColor(),
      duration: 10,
      text_scale: 1,
      offset_time: 1000,
      avatarUrl: 'http://active.qiutianaimeili.com/one_year_head_3.jpg'
    }
  )
}

const damData = [
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
]
window.createBullet('#bullet-1', { data: damData.concat(dyData), padding: 5 });
}