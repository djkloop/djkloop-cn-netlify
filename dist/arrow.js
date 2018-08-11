"use strict";
var Arrow = /** @class */ (function () {
    function Arrow(props) {
        this.x = 0;
        this.y = 0;
        this.w = 30;
        this.h = 15;
        this.rotation = 0;
        this.fillStyle = 'rgba(0,191,255, .3)';
        this.strokeStyle = 'rgba(0, 0, 0, 0)';
        Object.assign(this, props);
        return this;
    }
    Arrow.prototype.createPath = function (ctx) {
        var w = this.w;
        var h = this.h;
        ctx.beginPath();
        ctx.moveTo(-w / 2, -h / 2);
        ctx.lineTo(w / 10, -h / 2);
        ctx.lineTo(w / 10, -h);
        ctx.lineTo(w / 2, 0);
        ctx.lineTo(w / 10, h);
        ctx.lineTo(w / 10, h / 2);
        ctx.lineTo(-w / 2, h / 2);
        ctx.closePath();
        return this;
    };
    Arrow.prototype.render = function (ctx) {
        var _a = this, fillStyle = _a.fillStyle, strokeStyle = _a.strokeStyle, rotation = _a.rotation, x = _a.x, y = _a.y;
        ctx.save();
        ctx.fillStyle = fillStyle;
        ctx.strokeStyle = strokeStyle;
        ctx.translate(x, y);
        ctx.rotate(rotation);
        this.createPath(ctx);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        return this;
    };
    return Arrow;
}());
