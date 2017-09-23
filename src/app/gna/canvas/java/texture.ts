import { TextureResource } from './texture-resource';

export class Texture {
  private static loadedTextures: Map<string, TextureResource>;
  private resource: TextureResource;
  private fileName: string;

  constructor (filename: string) {

  }

  private static loadtexture (fileName: string): TextureResource {
    // TODO: Implement
    return new TextureResource();
  }

  protected finalize(): void {
    // TODO: Implement if needed
  }

  public bind (samplerSlot?: number): void {
    if (!samplerSlot) {
      this.bind(0);
    } else {
      // TODO: Implement if needed
      // assert(samplerSlot >= 0 && samplerSlot <= 31);
      // glActiveTexture(GL_TEXTURE0 + samplerSlot);
      // glBindTexture(GL_TEXTURE_2D, m_resource.GetId());
    }
  }

  public getId (): number {
    return this.resource.getId();
  }
}
