interface cInterFace {
		getOffset(ele : any) : object;
		eventWrapper(ev : any) : {x: number, y: number};
		toRad(ang : number) : number;
		toAng(rad : number) : number;
}

const C : cInterFace = {
		getOffset: function (ele) {
				let mouse = {
						x: 0,
						y: 0
				};
				ele.addEventListener("mousemove", function (e : any) {
						let {x, y} = C.eventWrapper(e);
						mouse.x = x;
						mouse.y = y;

				}, false);
				return mouse;
		},
		eventWrapper: function (ev) {
				let {pageX, pageY, target} = ev;
				let {left, top} = target.getBoundingClientRect();
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
		}
};