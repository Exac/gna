import { MappedValues } from './mapped-values';
import { Texture } from './texture';

// ENGINE.RENDERING

export class Material extends MappedValues {
  private textureHashMap: Map<string, Texture>;

  constructor (diffuse: Texture,
               specularIntensity: number,
               specularPower: number,
               normal: Texture,
               dispMap: Texture,
               dispMapScale: number,
               dispMapOffset: number) {
    super();
    this.textureHashMap = new Map<string, Texture>();
    this.addTexture('diffuse', diffuse);
    this.addFloat('specularIntensity', specularIntensity);
    this.addFloat('specularPower', specularPower);
    this.addTexture('normalMap', normal);
    this.addTexture('dispMap', dispMap);

    const baseBias: number = dispMapScale / 2.0;
    this.addFloat('dispMapScale', dispMapScale);
    this.addFloat('dispMapBias', -baseBias + baseBias * dispMapOffset);
  }

  public addTexture (name: string, texture: Texture): void {
    this.textureHashMap.set(name, texture);
  }

  public getTexture (name: string): Texture {
    const result: Texture = this.textureHashMap.get(name);
    if (typeof result !== 'undefined') {
      return result;
    }

    return new Texture('test2.png');
  }
}
