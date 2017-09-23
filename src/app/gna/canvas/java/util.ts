// ENGINE.CORE

import { Matrix4 } from './matrix4';
import { Vertex } from './vertex';

export class Util {

  public static createFloatBuffer (size: number): WebGLBuffer {
    // TODO: implement. Requires canvas context to create.
    return {};
  }

  public static createFlippedBuffer (v: Matrix4 | Vertex): WebGLBuffer {
    if (v instanceof Matrix4) {
      const buffer: WebGLBuffer = Util.createFloatBuffer(4 * 4);

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          // TODO: Implement
        }
      }
    }
    // TODO: Remove
    return Util.createFloatBuffer(1);
  }
}
