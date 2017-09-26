// LWJGL

import { gl } from '../globals';

export class BufferUtils {

  public static createFloatBuffer (size: number): WebGLBuffer {
    return gl.createBuffer();
  }

}
