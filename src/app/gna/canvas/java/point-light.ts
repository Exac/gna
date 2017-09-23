import { BaseLight } from './base-light';
import { Vector3 } from './vector3';
import { Shader } from './shader';
import { Attenuation } from './attenuation';

// ENGINE.COMPONENTS

export class PointLight extends BaseLight {
  private static COLOR_DEPTH = 256;

  private attenuation: Attenuation;
  private range: number;

  constructor (color: Vector3, intensity: number, attenuation: Attenuation) {
    super(color, intensity);
    this.attenuation = attenuation;

    const a: number = attenuation.getExponent();
    const b: number = attenuation.getLinear();
    const c: number = attenuation.getConstant() - PointLight.COLOR_DEPTH * this.getIntensity() * this.getColor().max();

    this.range = ((-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a));

    this.setShader(new Shader('forward-point'));
  }

  public getRange (): number {
    return this.range;
  }

  public setRange (range: number): void {
    this.range =  range;
  }

  public getAttenuation (): Attenuation {
    return this.attenuation;
  }

}
