// ENGINE.CORE

import { Matrix4 } from './matrix4';
import { Vertex } from './vertex';
import { gl } from '../globals';

export class Util {

  public static createFloatBuffer (size?: number): WebGLBuffer {
    return gl.createBuffer();
  }

  public static createFlippedBuffer (v: Matrix4 | Vertex | any): WebGLBuffer {
    if (v instanceof Vertex && arguments.length > 1) {
      const a = arguments;
      Util.createFlippedBufferVA(a);
    } else if (v instanceof Vertex && arguments.length === 1) {

    } else if (v instanceof Matrix4) {
      //   const buffer: WebGLBuffer = gl.createBuffer();
      //
      //
      //   for (let i = 0; i < 4; i++) {
      //     for (let j = 0; j < 4; j++) {
      //       // gl.bufferData(
      //     }
      //   }
      // }
      // // TODO: Remove
      // return Util.createFloatBuffer(1);
    }
    return gl.createBuffer();
  }

  private static createFlippedBufferVA(values): WebGLBuffer {
    console.log(values);

    return gl.createBuffer();
  }
}
