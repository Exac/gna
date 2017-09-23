import { Vector2 } from './vector2';
import { IQuaternion } from './QuaternionInterface';

// ENGINE.CORE

export class Vector3 {

  constructor (public x: number, public y: number, public z: number) { }

  public length (): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  public max (): number {
    return Math.max(this.x, Math.max(this.y, this.z));
  }

  public dot (r: Vector3): number {
    return this.x * r.GetX() + this.y * r.GetY() + this.z * r.GetZ();
  }

  public cross (r: Vector3): Vector3 {
    const x_: number = this.y * r.GetZ() - this.z * r.GetY();
    const y_: number = this.z * r.GetX() - this.x * r.GetZ();
    const z_: number = this.x * r.GetY() - this.y * r.GetX();

    return new Vector3(x_, y_, z_);
  }

  public normalized (): Vector3 {
    const length = this.length();

    return new Vector3(this.x / length, this.y / length, this.z / length);
  }

  /**
   * axis: Vector3, angle: number
   * rotation: Quaternion
   */

  public rotate (axis: any, angle?: number): Vector3 {
    if (axis instanceof Vector3 && typeof angle === 'number') {
      const sinAngle: number = Math.sin(-angle);
      const cosAngle: number = Math.cos(-angle);

      return this.cross(axis.mul(sinAngle)).add(          // Rotation on local X
        (this.mul(cosAngle)).add(                         // Rotation on local Z
          axis.mul(this.dot(axis.mul(1 - cosAngle))))); // Rotation on local Y
    } else if (!(axis instanceof Vector3)) {

      const rotation = axis;
      const conjugate = rotation.conjugate();

      const w: IQuaternion = rotation.mul(this).mul(conjugate);

      return new Vector3(w.GetX(), w.GetY(), w.GetZ());
    }

  }

  public lerp (dest: Vector3, lerpFactor: number): Vector3 {
    return dest.sub(this).mul(lerpFactor).add(this);
  }

  public add (r: number | Vector3): Vector3 {
    if (typeof r === 'number') {
      return new Vector3(this.x + r, this.y + r, this.z + r);
    } else if (r instanceof Vector3) {
      return new Vector3(this.x + r.GetX(), this.y + r.GetY(), this.z + r.GetZ());
    } else {
      throw new TypeError('a is neither a number or a Vector2');
    }
  }

  public sub (r: number | Vector3): Vector3 {
    if (typeof r === 'number') {
      return new Vector3(this.x - r, this.y - r, this.z - r);
    } else if (r instanceof Vector3) {
      return new Vector3(this.x - r.GetX(), this.y - r.GetY(), this.z - r.GetZ());
    } else {
      throw new TypeError('a is neither a number or a Vector2');
    }
  }

  public mul (r: number | Vector3) {
    if (typeof r === 'number') {
      return new Vector3(this.x * r, this.y * r, this.z * r);
    } else if (r instanceof Vector3) {
      return new Vector3(this.x * r.GetX(), this.y * r.GetY(), this.z * r.GetZ());
    } else {
      throw new TypeError('a is neither a number or a Vector2');
    }
  }

  public div (r: number | Vector3) {
    if (typeof r === 'number') {
      return new Vector3(this.x / r, this.y / r, this.z / r);
    } else if (r instanceof Vector3) {
      return new Vector3(this.x / r.GetX(), this.y / r.GetY(), this.z / r.GetZ());
    } else {
      throw new TypeError('a is neither a number or a Vector2');
    }
  }

  public abs (): Vector3 {
    return new Vector3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
  }

  public toString (): string {
    return '[' + this.x + ', ' + this.y + ', ' + this.z + ']';
  }

  public GetXY (): Vector2 {
    return new Vector2(this.x, this.y);
  }

  public GetYZ (): Vector2 {
    return new Vector2(this.y, this.z);
  }

  public GetZX (): Vector2 {
    return new Vector2(this.z, this.x);
  }

  public GetYX (): Vector2 {
    return new Vector2(this.y, this.x);
  }

  public GetZY (): Vector2 {
    return new Vector2(this.z, this.y);
  }

  public GetXZ (): Vector2 {
    return new Vector2(this.x, this.z);
  }


  public Set (x: number | Vector3, y?: number, z?: number): Vector3 {
    if (typeof x === 'number') {
      this.x = x;
      this.y = y;
      this.z = z;
    } else if (x instanceof Vector3) {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    } else {
      throw new TypeError('a is neither a number or a Vector3');
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

  public SetX (n: number) {
    this.x = n;
  }

  public SetY (n: number) {
    this.y = n;
  }

  public SetZ (n: number) {
    this.z = n;
  }

  public equals (v: Vector3): boolean {
    return this.x === v.x && this.y === v.y && this.z === v.z;
  }
}
