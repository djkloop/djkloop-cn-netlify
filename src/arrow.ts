declare interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}

interface ArrowProps {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  rotation?: number;
  fillStyle?: string;
  strokeStyle?: string;
  createPath(ctx: any): void
}


class Arrow implements ArrowProps {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  rotation?: number;
  fillStyle?: string;
  strokeStyle?: string;

  constructor(props: object) {
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

  createPath(ctx: any) {
    let w = this.w as number
    let h = this.h as number
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
  }

  render(ctx: any) {
    let { fillStyle, strokeStyle, rotation, x, y } = this;
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
  }
}