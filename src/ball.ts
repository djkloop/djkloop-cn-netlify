interface BallProps {
  x?: number;
  y?: number;
  r?: number;
  vx?: number;
  vy?: number;
  scaleX?: number;
  scaleY?: number;
  strokeStyle?: string;
  fillStyle?: string;
  alpha?: number;
  render(ctx: any): any;
}

class Ball implements BallProps {

  x?: number;
  y?: number;
  r?: number;
  vx?: number;
  vy?: number;
  scaleX?: number;
  scaleY?: number;
  strokeStyle?: string;
  fillStyle?: string;
  alpha?: number;

  constructor(props: Object) {
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

  render(ctx: any) {
    let { x, y, r, scaleX, scaleY, alpha, fillStyle, strokeStyle } = this;
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
  }
}