import { Vector3 } from './vector3';

// ENGINE.RENDERING

export class Attenuation extends Vector3 {

  constructor (constant: number, linear: number, exponent: number) {
    super(constant, linear, exponent);
  }

  public getConstant (): number {
    return this.x;
  }

  public getLinear (): number {
    return this.y;
  }

  public getExponent (): number {
    return this.z;
  }

}
