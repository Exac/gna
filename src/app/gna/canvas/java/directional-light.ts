import { BaseLight } from './base-light';
import { Vector3 } from './vector3';
import { Shader } from './shader';

// ENGINE.COMPONENTS

export class DirectionalLight extends BaseLight {
  constructor (color: Vector3, intensity: number) {
    super(color, intensity);

    this.setShader(new Shader('forward-directional'));
  }

  public getDirection (): Vector3 {
    return this.getTransform().getTransformedRot().getForward();
  }
}
