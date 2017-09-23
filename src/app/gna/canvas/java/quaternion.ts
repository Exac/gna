import { Vector3 } from './vector3';
import { Matrix4 } from './matrix4';
import { IQuaternion } from './QuaternionInterface';

// ENGINE.CORE

export class Quaternion implements IQuaternion {

  public x: number;
  public y: number;
  public z: number;
  public w: number;

  constructor (x: number | Vector3 | Matrix4, y?: number, z?: number, w?: number) {
    if (x instanceof Vector3 && typeof y === 'number') {
      const sinHalfAngle = Math.sin(y / 2);
      const cosHalfAngle = Math.cos(y / 2);

      this.x = x.x * sinHalfAngle;
      this.y = x.y * sinHalfAngle;
      this.z = x.z * sinHalfAngle;
      this.w = cosHalfAngle;
    } else if (typeof x === 'number') {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
    } else if (x instanceof Matrix4) {
      // This creates circular dependency.
      // From Ken Shoemake's "Quaternion Calculus and Fast Animation" article
      const trace: number = x.Get(0, 0) + x.Get(1, 1) + x.Get(2, 2);
      if (trace > 0) {
        const s: number = 0.5 / Math.sqrt(trace + 1.0);
        this.w = 0.25 / s;
        this.x = (x.Get(1, 2) - x.Get(2, 1)) * s;
        this.y = (x.Get(2, 0) - x.Get(0, 2)) * s;
        this.z = (x.Get(0, 1) - x.Get(1, 0)) * s;
      } else {
        if (x.Get(0, 0) > x.Get(1, 1) && x.Get(0, 0) > x.Get(2, 2)) {
          const s = 2.0 * Math.sqrt(1.0 + x.Get(0, 0) - x.Get(1, 1) - x.Get(2, 2));
          this.w = (x.Get(1, 2) - x.Get(2, 1)) / s;
          this.x = 0.25 * s;
          this.y = (x.Get(1, 0) + x.Get(0, 1)) / s;
          this.z = (x.Get(2, 0) + x.Get(0, 2)) / s;
        } else if (x.Get(1, 1) > x.Get(2, 2)) {
          const s = 2.0 * Math.sqrt(1.0 + x.Get(1, 1) - x.Get(0, 0) - x.Get(2, 2));
          this.w = (x.Get(2, 0) - x.Get(0, 2)) / s;
          this.x = (x.Get(1, 0) + x.Get(0, 1)) / s;
          this.y = 0.25 * s;
          this.z = (x.Get(2, 1) + x.Get(1, 2)) / s;
        } else {
          const s = 2.0 * Math.sqrt(1.0 + x.Get(2, 2) - x.Get(0, 0) - x.Get(1, 1));
          this.w = (x.Get(0, 1) - x.Get(1, 0) ) / s;
          this.x = (x.Get(2, 0) + x.Get(0, 2) ) / s;
          this.y = (x.Get(1, 2) + x.Get(2, 1) ) / s;
          this.z = 0.25 * s;
        }
      }
      const length: number = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
      this.x /= length;
      this.y /= length;
      this.z /= length;
      this.w /= length;

    } else {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.w = 0;
    }
  }

  public length (): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }

  public normalized (): Quaternion {
    const length: number = this.length();

    return new Quaternion(this.x / length, this.y / length, this.z / length, this.w / length);
  }

  public conjugate (): Quaternion {
    return new Quaternion(-this.x, -this.y, -this.z, this.w);
  }

  public mul (r: number | Quaternion | Vector3): Quaternion {
    if (typeof r === 'number') {
      return new Quaternion(this.x * r, this.y * r, this.z * r, this.w * r);
    } else if (r instanceof Quaternion) {
      const w_: number = this.w * r.GetW() - this.x * r.GetX() - this.y * r.GetY() - this.z * r.GetZ();
      const x_: number = this.x * r.GetW() + this.w * r.GetX() + this.y * r.GetZ() - this.z * r.GetY();
      const y_: number = this.y * r.GetW() + this.w * r.GetY() + this.z * r.GetX() - this.x * r.GetZ();
      const z_: number = this.z * r.GetW() + this.w * r.GetZ() + this.x * r.GetY() - this.y * r.GetX();

      return new Quaternion(x_, y_, z_, w_);
    } else if (r instanceof Vector3) {
      const w_: number = -this.x * r.GetX() - this.y * r.GetY() - this.z * r.GetZ();
      const x_: number = this.w * r.GetX() + this.y * r.GetZ() - this.z * r.GetY();
      const y_: number = this.w * r.GetY() + this.z * r.GetX() - this.x * r.GetZ();
      const z_: number = this.w * r.GetZ() + this.x * r.GetY() - this.y * r.GetX();

      return new Quaternion(x_, y_, z_, w_);
    } else {
      throw new TypeError('a is neither a number or a Vector3');
    }

  }

  public sub (r: Quaternion): Quaternion {
    return new Quaternion(this.x - r.GetX(), this.y - r.GetY(), this.z - r.GetZ(), this.w - r.GetW());
  }

  public add (r: Quaternion): Quaternion {
    return new Quaternion(this.x + r.GetX(), this.y + r.GetY(), this.z + r.GetZ(), this.w + r.GetW());
  }

  public toRotationMatrix (): Matrix4 {
    const forward: Vector3 = new Vector3(2.0 * (this.x * this.z - this.w * this.y),
      2.0 * (this.y * this.z + this.w * this.x),
      1.0 - 2.0 * (this.x * this.x + this.y * this.y));
    const up: Vector3 = new Vector3(2.0 * (this.x * this.y + this.w * this.z),
      1.0 - 2.0 * (this.x * this.x + this.z * this.z),
      2.0 * (this.y * this.z - this.w * this.x));
    const right: Vector3 = new Vector3(1.0 - 2.0 * (this.y * this.y + this.z * this.z),
      2.0 * (this.x * this.y - this.w * this.z),
      2.0 * (this.x * this.z + this.w * this.y));

    return new Matrix4().InitRotation(forward, up, right);
  }

  public dot (r: Quaternion): number {
    return this.x * r.GetX() + this.y * r.GetY() + this.z * r.GetZ() + this.w * r.GetW();
  }

  public nLerp (dest: Quaternion, lerpFactor: number, shortest: boolean) {
    let correctedDest: Quaternion = dest;

    if (shortest && this.dot(dest) < 0) {
      correctedDest = new Quaternion(-dest.GetX(), -dest.GetY(), -dest.GetZ(), -dest.GetW());
    }

    return correctedDest;
  }

  public sLerp (dest: Quaternion, lerpFactor: number, shortest: boolean) {
    const ESPILON = 1000;

    let cos: number = this.dot(dest);
    let correctedDest: Quaternion = dest;

    if (shortest && cos < 0) {
      cos = -cos;
      correctedDest = new Quaternion(-dest.GetX(), -dest.GetY(), -dest.GetZ(), -dest.GetW());
    }

    if (Math.abs(cos) >= 1 - ESPILON) {
      return this.nLerp(correctedDest, lerpFactor, false);
    }

    const sin: number = Math.sqrt(1 - cos * cos);
    const angle: number = Math.atan2(sin, cos);
    const invSin: number = 1 / sin;

    const srcFactor: number = Math.sin((1 - lerpFactor) * angle) * invSin;
    const destFactor: number = Math.sin((lerpFactor) * angle) * invSin;

    return this.mul(srcFactor).add(correctedDest.mul(destFactor));
  }

  public getForward (): Vector3 {
    return new Vector3(0, 0, 1).rotate(this);
  }

  public getBack (): Vector3 {
    return new Vector3(0, 0, -1).rotate(this);
  }

  public getUp (): Vector3 {
    return new Vector3(0, 1, 0).rotate(this);
  }

  public getDown (): Vector3 {
    return new Vector3(0, -1, 0).rotate(this);
  }

  public getRight (): Vector3 {
    return new Vector3(1, 0, 0).rotate(this);
  }

  public getLeft (): Vector3 {
    return new Vector3(-1, 0, 0).rotate(this);
  }

  public Set (x: number | Quaternion, y?: number, z?: number, w?: number): Quaternion {
    if (typeof x === 'number') {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
    } else if (x instanceof Quaternion) {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
      this.w = x.w;
    } else {
      throw new TypeError('x (' + x + ') is neither a number or a Quaternion');
    }

    return this;
  }


  public GetX (): number {
    return this.x;
  }


  public GetY (): number {
    return this.y;
  }


  public GetZ (): number {
    return this.z;
  }


  public GetW (): number {
    return this.w;
  }


  public SetX (n: number): void {
    this.x = n;
  }


  public SetY (n: number): void {
    this.y = n;
  }


  public SetZ (n: number): void {
    this.z = n;
  }


  public SetW (n: number): void {
    this.w = n;
  }

  public equals (r: Quaternion): boolean {
    return this.x === r.x && this.y === r.y && r.z === this.z && this.w === r.w;
  }

}
