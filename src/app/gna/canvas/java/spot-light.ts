import { PointLight } from './point-light';
import { Vector3 } from './vector3';
import { Attenuation } from './attenuation';
import { Shader } from './shader';

// ENGINE.COMPONENTS

export class SpotLight extends PointLight {
  private cutoff: number;

  constructor (color: Vector3, intensity: number, attenuation: Attenuation, cutoff: number) {
    super(color, intensity, attenuation);
    this.cutoff = cutoff;

    this.setShader(new Shader('forward-spot'));
  }

  public getDirection (): Vector3 {
    return this.getTransform().getTransformedRot().getForward();
  }

  public getCutoff (): number {
    return this.cutoff;
  }

  public setCutoff (cutoff: number) {
    this.cutoff = cutoff;
  }
}
