import { MappedValues } from './mapped-values';
import { Texture } from './texture';

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

  }

  public addTexture (name: string, texture: Texture): void {
    this.textureHashMap.set(name, texture);
  }

  public getTexture (name: string): Texture {
    const result: Texture = this.textureHashMap.get(name);
    if (result) {
      return result;
    }

    return new Texture('test.png');
  }
}
