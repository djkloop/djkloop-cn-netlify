interface cInterFace {
	getOffset(ele: any): object;
	eventWrapper(ev: any): { x: number, y: number };
	toRad(ang: number): number;
	toAng(rad: number): number;
	rp(arr: Array[number], int: boolean): number;
	createColor(): string;
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
	createColor: function() {
		return `rgb(${C.rp([55, 255], true)}, ${C.rp([55, 255], true)}, ${C.rp([55, 255], true)})`
	}
};