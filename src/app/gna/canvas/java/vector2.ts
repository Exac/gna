// ENGINE.CORE

export class Vector2 {

  constructor (public x: number, public y: number) { }

  public length (): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public max (): number {
    return Math.max(this.x, this.y);
  }

  public dot (v: Vector2): number {
    return this.x * v.x + this.y * v.y;
  }

  public normalized (): Vector2 {
    const len: number = this.length();
    return new Vector2(this.x / len, this.y / len);
  }

  public cross (v): number {
    return this.x * v.y - this.y * v.x;
  }

  public lerp (v: Vector2, lerpFactor: number): Vector2 {
    return v.sub(this).mul(lerpFactor).add(this);
  }

  public rotate (angle: number): Vector2 {
    const rad = angle * (Math.PI / 180);
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    return new Vector2(this.x * cos - this.y * sin,
      this.x * sin + this.y * cos);
  }

  public add (a: number | Vector2, b?: number): Vector2 {
    if (typeof a === 'number') {
      return new Vector2(this.x + a, this.y + a);
    } else if (a instanceof Vector2) {
      return new Vector2(this.x + a.x, this.y + a.y);
    } else {
      throw new TypeError('a is neither a number or a Vector2');
    }
  }

  public sub (a: number | Vector2, b?: number): Vector2 {
    if (typeof a === 'number') {
      return new Vector2(this.x - a, this.y - b);
    } else if (a instanceof Vector2) {
      return new Vector2(this.x - a.x, this.y - a.y);
    } else {
      throw new TypeError('a is neither a number or a Vector2');
    }

  }

  public mul (a: number | Vector2, b?: number): Vector2 {
    if (typeof a === 'number') {
      return new Vector2(this.x * a, this.y * b);
    } else if (a instanceof Vector2) {
      return new Vector2(this.x * a.x, this.y * a.y);
    } else {
      throw new TypeError('a is neither a number or a Vector2');
    }

  }


  public div (a: number | Vector2, b?: number): Vector2 {
    if (typeof a === 'number') {
      return new Vector2(this.x / a, this.y / b);
    } else if (a instanceof Vector2) {
      return new Vector2(this.x / a.x, this.y / a.y);
    } else {
      throw new TypeError('a is neither a number or a Vector2');
    }

  }

  public abs (): Vector2 {
    return new Vector2(Math.abs(this.x), Math.abs(this.y));
  }

  public toString (): string {
    return '[' + this.x + ', ' + this.y + ']';
  }

  public set (a: number | Vector2, b?: number): Vector2 {
    if (typeof a === 'number') {
      this.x = a;
      this.y = b;
    } else if (a instanceof Vector2) {
      this.x = a.x;
      this.y = a.y;
    } else {
      throw new TypeError('a is neither a number or a Vector2');
    }
    return this;
  }

  public getX (): number {
    return this.x;
  }

  public getY (): number {
    return this.y;
  }

  public setX (x: number): void {
    this.x = x;
  }

  public setY (y: number): void {
    this.y = y;
  }

  public equals (v: Vector2): boolean {
    return this.x === v.x && this.y === v.y;
  }
}
