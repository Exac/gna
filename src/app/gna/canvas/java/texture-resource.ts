// import opengl.GL11.glGenTextures
// import opengl.GL11.glDeleteBuffers

export class TextureResource {
  private id: number;
  private refCount: number;

  constructor () {
    // TODO: implement
    // this.id = glGentextures();
    this.refCount = 1;
  }

  protected finalize (): void {
    // TODO: implement
    // glDeleteBuffers(this.id);
  }

  public addReference (): void {
    this.refCount++;
  }

  public removeReference (): boolean {
    this.refCount--;
    return this.refCount === 0;
  }

  public getId (): number {
    return this.id;
  }
}
