var Ball = /** @class */ (function () {
    function Ball(props) {
        this.x = 0;
        this.y = 0;
        this.r = 20;
        this.vx = 0;
        this.vy = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.strokeStyle = 'rgba(0, 0, 0, 0)';
        this.fillStyle = 'rgb(57, 119, 224)';
        this.alpha = 1;
        Object.assign(this, props);
        return this;
    }
    Ball.prototype.render = function (ctx) {
        var _a = this, x = _a.x, y = _a.y, r = _a.r, scaleX = _a.scaleX, scaleY = _a.scaleY, alpha = _a.alpha, fillStyle = _a.fillStyle, strokeStyle = _a.strokeStyle;
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scaleX, scaleY);
        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        return this;
    };
    return Ball;
}());
