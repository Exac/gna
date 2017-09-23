import { Transform } from './transform';
import { WorldObject } from './world-object';
import { MappedValues } from './mapped-values';
import { BaseLight } from './base-light';
import { Camera } from './camera';
import { Material } from './material';
import { Shader } from './shader';

export class RenderingEngine  extends MappedValues {
  private samplerMap: Map<string, number>;
  private lights: Array<BaseLight>;
  private activeLight: BaseLight;

  private forwardAmbient: Shader;
  private mainCamera: any; // Camera;

  constructor () {
    super();
    this.lights = [];
    this.samplerMap = new Map<string, number>();
    this.samplerMap.set('diffuse', 0);
    this.samplerMap.set('normalMap', 1);
    this.samplerMap.set('dispMap', 2);

    // ...
    // TODO:implement
  }

  public updateUniformStruct (transform: Transform,
                              material: Material,
                              shader: Shader,
                              uniformName: string,
                              uniformType: string) {
    // TODO: implement
  }

  public render (object: WorldObject) {
    // TODO: implement
  }

  public getWebGLVersion (): string {
    const version = '0';
    // TODO: implement
    return version;
  }

  public addLight (light: BaseLight): void {
    // TODO: implement
  }

  public addCamera (camera: Camera) {
    this.mainCamera = camera;
  }

  public getSamplerSlot (samplerName: string): number {
    return this.samplerMap.get(samplerName);
  }

  public getActiveLight (): BaseLight {
    return this.activeLight;
  }

  public getMainCamera (): Camera {
    return this.mainCamera;
  }

  public setMainCamera(mainCamera: Camera): void {
    this.mainCamera = mainCamera;
  }
}
