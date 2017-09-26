// import opengl.GL11.glGenTextures
// import opengl.GL11.glDeleteBuffers

// ENGINE.RENDERING.RESOURCEMANAGEMENT

import { gl } from '../globals';

export class TextureResource {
  private id: WebGLTexture;
  private refCount: number;

  constructor () {
    this.id = gl.createTexture();
    this.refCount = 1;
  }

  protected finalize (): void {
    gl.deleteBuffer(this.id);
  }

  public addReference (): void {
    this.refCount++;
  }

  public removeReference (): boolean {
    this.refCount--;
    return this.refCount === 0;
  }

  public getId (): WebGLTexture {
    return this.id;
  }
}
