import { gl } from '../globals';

// ENGINE.RENDERING.RESOURCEMANAGEMENT

export class MeshResource {
  private vbo: WebGLBuffer;
  private ibo: WebGLBuffer;
  private size: number;
  private refCount: number;

  constructor (size: number) {
    this.vbo = gl.createBuffer();
    this.ibo = gl.createBuffer();
    this.size = size;
    this.refCount = 1;
  }

  protected finalize (): void {
    gl.deleteBuffer(this.vbo);
    gl.deleteBuffer(this.ibo);
  }

  public addReference (): void {
    this.refCount++;
  }

  public removeReference (): boolean {
    this.refCount--;
    return this.refCount === 0;
  }

  public getVbo (): WebGLBuffer { return this.vbo; }
  public getIbo (): WebGLBuffer { return this.ibo; }
  public getSize (): number { return this.size; }
}
