import { WorldComponent } from './world-component';
import { Vector3 } from './vector3';
import { CoreEngine } from './core-engine';
import { Shader } from './shader';

export class BaseLight extends WorldComponent {
  private color: Vector3;
  private intensity: number;
  private shader: Shader;

  constructor (color: Vector3, intensity: number) {
    super();
    this.color = color;
    this.intensity = intensity;
  }

  public addToEngine (engine: CoreEngine): void {
    engine.getRenderingEngine().addLight(this);
  }

  public setShader (shader: Shader): void {
    this.shader = shader;
  }

  public getShader (): Shader {
    return this.shader;
  }

  public getColor (): Vector3 {
    return this.color;
  }

  public setColor (color: Vector3): void {
    this.color = color;
  }

  public getIntensity (): number {
    return this.intensity;
  }

  public setIntensity (intensity: number) {
    this.intensity = intensity;
  }
}
