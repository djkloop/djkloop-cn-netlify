var C = {
    getOffset: function (ele) {
        var mouse = {
            x: 0,
            y: 0
        };
        ele.addEventListener("mousemove", function (e) {
            var _a = C.eventWrapper(e), x = _a.x, y = _a.y;
            mouse.x = x;
            mouse.y = y;
        }, false);
        return mouse;
    },
    eventWrapper: function (ev) {
        var pageX = ev.pageX, pageY = ev.pageY, target = ev.target;
        var _a = target.getBoundingClientRect(), left = _a.left, top = _a.top;
        return {
            x: pageX - left,
            y: pageY - top
        };
    },
    toRad: function (ang) {
        return ang * Math.PI / 180;
    },
    toAng: function (rad) {
        return rad * 180 / Math.PI;
    },
    rp: function (arr, int) {
        var max = Math.max.apply(Math, arr);
        var min = Math.min.apply(Math, arr);
        var num = Math.random() * (max - min) + min;
        return int ? Math.round(num) : num;
    },
    createColor: function () {
        return "rgb(" + C.rp([55, 255], 1) + ", " + C.rp([55, 255], 1) + ", " + C.rp([55, 255], 1) + ")";
    }
};
