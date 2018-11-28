interface cInterFace {
	getOffset(ele: any): object;
	eventWrapper(ev: any): { x: number, y: number };
	toRad(ang: number): number;
	toAng(rad: number): number;
	rp(arr: number[], int: number): number;
	createColor(): string;
	createDom(el: string, tpl: string, attrs: any, cname: string): HTMLElement;
}

const C: cInterFace = {
	getOffset: function (ele) {
		let mouse = {
			x: 0,
			y: 0
		};
		ele.addEventListener("mousemove", function (e: any) {
			let { x, y } = C.eventWrapper(e);
			mouse.x = x;
			mouse.y = y;

		}, false);
		return mouse;
	},
	eventWrapper: function (ev) {
		let { pageX, pageY, target } = ev;
		let { left, top } = target.getBoundingClientRect();
		return {
			x: pageX - left,
			y: pageY - top
		}
	},
	toRad: function (ang) {
		return ang * Math.PI / 180;
	},
	toAng: function (rad) {
		return rad * 180 / Math.PI;
	},
	rp: function (arr, int) {
		const max = Math.max(...arr);
		const min = Math.min(...arr);
		const num = Math.random() * (max - min) + min;
		return int ? Math.round(num) : num;
	},
	createColor: function () {
		return `rgb(${C.rp([55, 255], 1)}, ${C.rp([55, 255], 1)}, ${C.rp([55, 255], 1)})`
	},
	createDom: function (el = 'div', tpl = '', attrs = {}, cname = '') {
		let dom = document.createElement(el)
		dom.className = cname
		dom.innerHTML = tpl
		Object.keys(attrs).forEach(item => {
			let key = item
			let value = attrs[item]
			if (el === 'video' || el === 'audio') {
				if (value) {
					dom.setAttribute(key, value)
				}
			} else {
				dom.setAttribute(key, value)
			}
		})
		return dom
	}
};