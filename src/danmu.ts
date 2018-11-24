interface Window {
  _danmu_paused : boolean
}

interface runnerItem {
  url?: string;
  text?: string;
  type?: number
}

interface RunnerItem {
  name : number,
  runner : runnerItem,
  number : number
}

interface ThemeColor {
  background : string,
  color : string,
  name : string
}

interface AheadOptions {
  leafTime?: number,
  idx : number,
  ele : HTMLElement
}

const danmData = [
  {
    url: 'http://active.qiutianaimeili.com/one_year_head_27.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_2.jpg',
    text: '扎铁了，老心',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_3.jpg',
    text: '哎呀, 真香',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_4.jpg',
    text: '香蕉和枣子一起吃有特殊的味道香蕉和枣子一起吃有特殊的味道香蕉和枣子一起吃有特殊的味道',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_5.jpg',
    text: 'react-native - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_6.jpg',
    text: 'flutter - 大法好',
    type: 2
  },, {
    url: 'http://active.qiutianaimeili.com/one_year_head_7.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_9.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_8.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_10.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_11.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_20.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_21.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_22.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_23.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_24.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_25.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_26.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_27.jpg',
    text: '蚯蚓',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_28.jpg',
    text: '香蕉和枣子一起吃有特殊的味道',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_29.jpg',
    text: '听说下雨天和巧克力更配哦',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_30.jpg',
    text: 'iphone爆炸了',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_31.jpg',
    text: '不要在充电的时候玩手机',
    type: 1
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_32.jpg',
    text: '早睡早起好身体',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_33.jpg',
    text: '微微一笑很倾城',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_34.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_35.jpg',
    text: '西安的路好干净啊',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_36.jpg',
    text: '秋天爱美丽',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_20.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_21.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_22.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_23.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_24.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_25.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_26.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_27.jpg',
    text: '蚯蚓',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_28.jpg',
    text: '香蕉和枣子一起吃有特殊的味道',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_29.jpg',
    text: '听说下雨天和巧克力更配哦',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_30.jpg',
    text: 'iphone爆炸了',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_31.jpg',
    text: '不要在充电的时候玩手机',
    type: 1
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_32.jpg',
    text: '早睡早起好身体',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_33.jpg',
    text: '微微一笑很倾城',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_34.jpg',
    text: 'abcdefg',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_35.jpg',
    text: '西安的路好干净啊',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_36.jpg',
    text: '秋天爱美丽',
    type: 2
  }
]

const danmData1 = [
  {
    url: 'http://active.qiutianaimeili.com/one_year_head_27.jpg',
    text: 'flutter - 大法好',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_2.jpg',
    text: '扎铁了，老心',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_3.jpg',
    text: '哎呀, 真香',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_3.jpg',
    text: '哎呀, 真香',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_3.jpg',
    text: '哎呀, 真香',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_3.jpg',
    text: '哎呀, 真香',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_3.jpg',
    text: '哎呀, 真香',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_3.jpg',
    text: '哎呀, 真香',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_3.jpg',
    text: '哎呀, 真香',
    type: 2
  }, {
    url: 'http://active.qiutianaimeili.com/one_year_head_3.jpg',
    text: '哎呀, 真香',
    type: 2
  }
]
window.onload = () => {
  window._danmu_paused = false;

  function returnHeight() {
    let danmu_video_box : HTMLElement = document.querySelector('.danmu-container-body')as HTMLElement;
    let danmu_client = danmu_video_box.getBoundingClientRect();
    let danmu_client_height = danmu_client.height;
    danmu_video.style.height = danmu_client_height - 1 + 'px';
  }
  console.log(`弹幕测试demo启动...`);
  let danmu_video_box : HTMLElement = document.querySelector('.danmu-container-body')as HTMLElement;
  let danmu_video = danmu_video_box.querySelector('video')as HTMLElement;
  let danmu_client = danmu_video_box.getBoundingClientRect();
  let danmu_client_height = danmu_client.height;
  danmu_video.style.height = danmu_client_height - 1 + 'px';
  //
  let STEP = 55;
  // 跑道个数
  let all_row_length = (danmu_client_height / STEP) >> 0;
  // 每行存在的弹幕条数
  let per_row_number = 20;
  let g_row_length = all_row_length * per_row_number;
  let fail_queue = [];
  let g_timeout = {};

  // 设置全部的跑道
  let all_row_array : RunnerItem[] = [];
  // 辅助map
  let all_row_finish_helper = {};
  let all_row_finish_runner_helper = {};
  let init_all_row_array = [];
  for (let i = 0; i < all_row_length; i++) {
    let runnerItem : RunnerItem = {
      name: i, // 每一条赛道
      runner: {}, // 存放赛道上的赛跑者，可以暂停
      number: 0 // 赛道上已经存在的选手个数
    };
    all_row_array.push(runnerItem);
    init_all_row_array[i] = i;
  };

  console.log(`初始化赛道 -> 总计 ${init_all_row_array.length} 条`)

  let array_map = {};
  let runner_idx_array = []; // 赛跑者对应的分组
  let g_runner_idx_manage = 0; // 所有的赛跑者idx分配中心
  let g_wish_number = 0;

  const init_runner_for_data = runners => {
    runners.forEach((runner, i) => {
      g_wish_number++;
      array_map[g_runner_idx_manage] = runner;
      runner_idx_array.push(g_runner_idx_manage);
      g_runner_idx_manage++;
    });
    console.log(`初始化弹幕总数 ${g_wish_number} ${array_map}`);
    console.log(array_map)
    document
      .querySelector('#all_runners')
      .innerHTML = String(g_wish_number);
  }

  // 初始化弹幕总条数
  init_runner_for_data([].concat(danmData, danmData));
  //
  const control_per_number = function () {
    //控制屏幕占有率
    document
      .querySelector('#screen_value')
      .innerHTML = String(per_row_number);
  }

  const run_finish = function (ev) {
    var _$target = ev.target;
    var runner_idx = _$target.getAttribute('data-index'),
      row_idx = _$target.getAttribute('data-row');
    _$target.setAttribute('data-finish', 'true'); //表示已经完成了赛跑，现在处于等待状态
    //					all_row_array.push(row_idx);
    var temp_rows = all_row_array.filter(function (rowData, i) {
      if (rowData.name == row_idx) {
        return rowData;
      }
    });
    if (temp_rows.length) { //如果找到了跑道
      temp_rows[0].number--; //赛场上的赛跑者少了一个
      delete temp_rows[0].runner[runner_idx];
    } else { //恢复被踢出的跑道
      all_row_array.push({
        name: row_idx,
        runner: all_row_finish_runner_helper[row_idx],
        number: (all_row_finish_helper[row_idx] - 1) //获取per的临时存储变量
      });
      delete all_row_finish_runner_helper[row_idx];
    }
    all_finish_runner_count++;
    document
      .querySelector('#screen_runner_all_number')
      .innerHTML = String(all_runner_count - all_finish_runner_count);
    if (all_runner_count - all_finish_runner_count > screen_runner_number_max) {
      screen_runner_number_max = all_runner_count - all_finish_runner_count;
      document
        .querySelector('#screen_runner_all_number_max')
        .innerHTML = String(screen_runner_number_max);
    }
    _$target.className = 'danmu-list-item unit';
    _$target.style.transform = 'translate(0px, 0px)';
    _$target.style.webkitTransform = 'translate(0px, 0px)';
    runner_idx_array.push(runner_idx);
    //如果有失败的请求，现在开始
    var fail_unit = fail_queue.shift();
    if (fail_unit) { //如果不是空对象
      console.log(' 失败', fail_unit)
      row_runner(fail_unit.row_idx, fail_unit.runners);
      document
        .querySelector('#fail_queue')
        .innerHTML = String(fail_queue.length);
    }
  }

  let play_count = 0; //播放的次数
  let all_runner_count = 0; //所有赛跑者上场的次数
  let all_finish_runner_count = 0; //所有完成赛跑人的个数，用来计算屏幕上的赛跑者个数
  let screen_runner_number_max = 0; //屏幕上赛跑者的出现的最大次数

  const init_runner = (idx : number, runner : runnerItem, $document : HTMLElement) => {
    if (!$document) {
      console.log('新建模式', $document)
      let _$div = document.createElement('div');
      // 设置样式
      _$div.setAttribute('class', 'danmu-list-item unit');
      _$div.setAttribute('data-finish', 'false');
      _$div.setAttribute('data-index', String(idx));
      _$div.setAttribute('data-type', String(runner.type));
      _$div.setAttribute('data-text', String(runner.text.split('').length));
      _$div.setAttribute('data-hash', String(new Date().getTime()));

      if (runner.type === 2) {
        let _$div_content_box = document.createElement('div');
        let _$div_img_box = document.createElement('div');
        let _$div_content = document.createElement('div');
        let _$div_img = document.createElement('div');

        _$div_content.setAttribute('class', 'danmu_list_item_content');
        _$div_content.innerHTML = runner.text;
        _$div_img.setAttribute('class', 'danmu_list_item_img');
        _$div_img.style.backgroundImage = `url${runner.url}`;
        _$div_content_box.appendChild(_$div_content);
        _$div_img_box.appendChild(_$div_img);
        _$div.appendChild(_$div_img_box);
        _$div.appendChild(_$div_content_box);
      }
      // 监听 css -> webkitAnimationEnd
      _$div
        .addEventListener('webkitAnimationEnd', function (ev) {
          console.log(ev, ' finish')
          run_finish(ev);
        });
      document
        .querySelector('#danmu-1 .danmu-container-lists')
        .appendChild(_$div);
      return {idx, ele: _$div}
    } else {
      console.log('不是新建模式', $document)
      let _$div = $document;
      _$div.setAttribute('class', 'danmu-list-item unit');
      _$div.setAttribute('data-finish', 'false'); //没有被初始化过的
      _$div.setAttribute('data-index', String(idx));
      _$div.setAttribute('data-type', String(runner.type));
      _$div.setAttribute('data-text', String(runner.text.split('').length));
      if (runner.type == 2) { //只是接受2类型
        var _$div_context = _$div.querySelector('.danmu_list_item_content');
        _$div_context.innerHTML = runner.text;
        var _$img_div = _$div.querySelector('.danmu_list_item_img');
      }
      return {idx, ele: _$div}
    }

  };

  const get_runner = () => {
    const row_runner_length = runner_idx_array.length;
    if (row_runner_length > 0) {
      all_runner_count++;
      play_count = all_runner_count / (g_row_length + 1) >> 0;
      document
        .querySelector('#runner_all_number')
        .innerHTML = String(all_runner_count);
      document
        .querySelector('#screen_runner_all_number')
        .innerHTML = String(all_runner_count - all_finish_runner_count);
      if (all_runner_count - all_finish_runner_count > screen_runner_number_max) {
        screen_runner_number_max = all_runner_count - all_finish_runner_count;
        document
          .querySelector('#screen_runner_all_number_max')
          .innerHTML = String(screen_runner_number_max);
      }
      // 这个地方拿到runndr_idx -> 根据实际情况取 这里是math.random
      let runner_idx = Math.random() * (row_runner_length) >> 0;
      let runner_data = array_map[runner_idx_array[runner_idx]];
      let runner = init_runner(runner_idx_array[runner_idx], runner_data, document.querySelector('.danmu-container-lists >.danmu-list-item[data-finish="true"][data-type="' + runner_data.type + '"]'));
      runner_idx_array.splice(runner_idx, 1);
      return runner;
    } else {
      return null;
    }
  }

  const THEME_COLOR_LIBARY = {
    'wish': [
      { //祝福语的配色方案
        background: 'rgba(255,206,0,.96)',
        color: 'black',
        name: 'black'
      }, {
        background: 'rgba(147,45,222,.96)',
        color: 'white',
        name: 'rgb(240,166,146)'
      }
    ]
  }

  const color_setting = function (type) : ThemeColor { //获取配色方案
    var length = THEME_COLOR_LIBARY[type].length;
    var idx = Math.random() * length >> 0;
    return THEME_COLOR_LIBARY[type][idx];
  }

  const go_run = (idx : number, ele : HTMLElement, runner : AheadOptions) => {
    let delay;
    let duration;
    if (per_row_number < 20) {
      delay = (1 / Math.sqrt(per_row_number)) * (.5 + ((play_count > 2)
        ? 1
        : Math.min(Math.random(), .5)) * (Math.abs(Math.sin(idx)) * 2 + Math.random() * 6)) + 's';
    } else {
      delay = '0s';
    }

    let runner_type = Number(ele.dataset.type);
    let runner_text_len = Number(ele.dataset.text);
    console.log(runner_type, ele.style.cssText)

    if (runner_type === 2) {
      let _color_setting = color_setting('wish');
      let $_child_img = ele.querySelector('.danmu_list_item_img')as HTMLDivElement;
      let $_child_content = ele.querySelector('.danmu_list_item_content')as HTMLDivElement;
      $_child_img.style.borderColor = _color_setting.background;
      $_child_content.style.cssText = `background: ${_color_setting.background};color: ${_color_setting.color}`;
      duration = Math.floor(8 + Math.abs(Math.cos(idx)) * Math.max(runner_text_len, 4) + Math.random() * Math.max(runner_text_len * 1.5, 10)) + 's';
      ele.style.top = Math.max((8 + (idx % all_row_length) * STEP + (Math.sin(Math.random() * 50)) * 10), 5) + 'px';
      console.log(ele.style, ' fuck')
    }

    let container_width = document
      .querySelector('.danmu-container-body')
      .getBoundingClientRect()
      .width;
    let ele_width = ele
      .getBoundingClientRect()
      .width;
    console.log(ele_width, runner)

    if (runner.leafTime) { //在后面的人
      console.log('GGGGGGGGGGGGGGG')
      var realLeafTime = runner.leafTime - parseFloat(delay);
      ////console.log(realLeafTime)
      if (realLeafTime > 0) { //有剩余 的时间
        var maxSpeed = container_width / realLeafTime;
        var maxDuration = (ele_width + container_width) / maxSpeed;
        // //console.log('*************last***************');
        // //console.log(parseFloat(duration), maxDuration);
        // //console.log('**************end***************'); 							duration =
        // maxDuration + 's';
        duration = Math.max(parseFloat(duration), maxDuration) + 's';
      }
    }

    ele.style.cssText += `animation-delay: ${delay}; -webkit-animation-delay: ${delay}; animation-duration: ${duration}; -webkit-animation-duration: ${duration}`;
    let _className = 'unit danmu-list-item ';

    if (play_count == 0) {
      _className += 'danmu_move';
    } else {
      _className += 'danmu_un_move';
    }
    console.log(ele.classList)
    ele.setAttribute('class', _className);
    ele.setAttribute('data-row', String(idx));

    delay = parseFloat(delay);
    duration = parseFloat(duration);

    const speed = ((ele_width + container_width) / duration);
    const show_time = ((ele_width) / speed);

    let next_delay;
    if (per_row_number < 20) {
      next_delay = ((delay + show_time + (duration - show_time) / per_row_number) * 1000);
      runner.leafTime = (duration - show_time - (duration - show_time) / per_row_number);
    } else {
      next_delay = ((delay + show_time) * 1000);
      runner.leafTime = (duration - show_time);
    }

    (function ($runner, row_idx, next_delay, aheadOption) {
      if (!window._danmu_paused) {
        var currentTime = +new Date();
        var fun = function () {
          row_runner(row_idx, aheadOption);
        }
        var _timeout = setTimeout(function () {
          delete g_timeout[_timeout];
          fun();
        }, next_delay);
        g_timeout[_timeout] = {
          currentTime: currentTime,
          delay: next_delay,
          fun: fun
        }
      } else {
        console.log('bbbb', next_delay);
      }
    })(ele, idx, next_delay, Object.assign({}, runner));

  }

  const match_row_runner = (row_idx : number, runners) => {
    // 跑到和赛道进行匹配
    let row_runner_idx : number;
    let RunnterItems = all_row_array.filter((runnterItem : RunnerItem, i : number) => {
      if (runnterItem.name === row_idx) {
        row_runner_idx = i;
        return runnterItem;
      }
    });
    if (RunnterItems && RunnterItems.length) {
      let runnerItem = RunnterItems[0];
      if (runnerItem && (runnerItem.number >= 0)) {
        let runner = get_runner();
        console.log(runner, ' wo ri ')
        if (runner) {
          runnerItem.number++;
          runnerItem[runner.idx] = runner.ele;

          // 如果赛道上的人数达到了最大值
          if (runnerItem.number >= per_row_number) {
            all_row_finish_helper[row_idx] = runnerItem.number; //相当于per_row_number的暂存旗
            all_row_finish_runner_helper[row_idx] = Object.assign({}, runnerItem.runner); //复制runner_helper
            all_row_array.splice(row_runner_idx, 1);
          }
          go_run(row_idx, runner.ele, runner);
        } else {
          fail_queue.push({
            row_idx: row_idx,
            runners: Object.assign({}, runners)
          });
          console.log('失败了这么多')
          document
            .querySelector('#fail_queue')
            .innerHTML = String(fail_queue.length);
        }
      }
    } else {
      fail_queue.push({
        row_idx: row_idx,
        runners: Object.assign({}, runners)
      });
    }
  }

  const row_runner = (row_idx : number, runner = {}) => {
    if (row_idx === -1) {
      console.log(`开始给每条赛道塞人...`);
      if (init_all_row_array.length) {
        // 如果有参赛者的人才能放 每条赛道的id
        let _row_id = init_all_row_array[0];
        match_row_runner(_row_id, runner);
        init_all_row_array.splice(0, 1); //将第一个删除
        row_runner(-1, {});
      }
    } else {
      console.log(`不是初始化...`, row_idx, runner)
      match_row_runner(row_idx, runner);
    }
  }

  const begin_barrage = () => {
    console.log(`开始播放弹幕`);
    control_per_number();
    row_runner(-1, {});
  }
  begin_barrage();

  window.addEventListener('resize', debounce(returnHeight, 300));
}

const debounce = function (fn : Function, delay : number) {
  let args = arguments,
    context : any = this,
    timer : any = null;

  return function () {
    if (timer) {
      clearTimeout(timer);

      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    }
  }
}