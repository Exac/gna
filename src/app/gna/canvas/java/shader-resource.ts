import { gl } from '../globals';

export class ShaderResource {
  private program: WebGLProgram;
  private uniforms: Map<string, WebGLUniformLocation>;
  private uniformNames: Array<string>;
  private uniformTypes: Array<string>;
  private refCount: number;

  constructor () {
    this.program = gl.createProgram();
    this.refCount = 1;

    if (typeof this.program === 'undefined') {
      console.error('Shader creation failed: Could not find valid memory location in constructor');
    }

    this.uniforms = new Map<string, number>();
    this.uniformNames = new Array<string>();
    this.uniformTypes = new Array<string>();
  }

  protected finalize (): void {
    gl.deleteBuffer(this.program);
  }

  public addReference () {
    this.refCount++;
  }

  public removeReference (): boolean {
    this.refCount--;
    return this.refCount === 0;
  }

  public getProgram (): WebGLProgram {
    return this.program;
  }

  public getUniforms (): Map<string, WebGLUniformLocation> {
    return this.uniforms;
  }

  public getUniformNames (): Array<string> {
    return this.uniformNames;
  }

  public getUniformTypes (): Array<string> {
    return this.uniformTypes;
  }
}
