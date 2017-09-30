// ENGINE.CORE

import { Matrix4 } from './matrix4';
import { Vertex } from './vertex';
import { gl } from '../globals';
import { Integer } from './Integer';

export class Util {

  public static createFloatBuffer (size?: number): ArrayBuffer {
    return new ArrayBuffer(typeof size !== 'undefined' ? size : 4 * 4);
  }

  public static createFlippedBuffer (v: Matrix4 | Vertex[] | any): Float32Array {
    if (v instanceof Matrix4) {
      return Util.createFlippedBufferM(v);
    }
    if (v instanceof Array) {
      if (typeof v[0] === 'number') {
        return Util.createFlippedBufferNA(...v);
      } else if (v[0] instanceof Vertex) {
        return Util.createFlippedBufferV(v);
      }
    }
  }

  private static createFlippedBufferM (matrix: Matrix4): Float32Array {
    const bufferData: ArrayBuffer = new ArrayBuffer(4 * 4 * 4);
    const bufferView: Float32Array = new Float32Array(bufferData);
    let offset = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++, offset++) {
        bufferView[offset] = matrix.Get(i, j);
      }
    }
    return bufferView;
  }

  private static createFlippedBufferV (vertices: Vertex[]): Float32Array {
    const bufferData: ArrayBuffer = new ArrayBuffer(4 * vertices.length * Vertex.SIZE);
    const bufferView: Float32Array = new Float32Array(bufferData);
    const o = 0; // offset

    for (let i = 0; i < vertices.length; i++) {
      bufferView[o] = vertices[i].getPos().GetX();
      bufferView[o + 1] = vertices[i].getPos().GetY();
      bufferView[o + 2] = vertices[i].getPos().GetZ();
      bufferView[o + 3] = vertices[i].getTexCoord().getX();
      bufferView[o + 4] = vertices[i].getTexCoord().getY();
      bufferView[o + 5] = vertices[i].getNormal().GetX();
      bufferView[o + 6] = vertices[i].getNormal().GetY();
      bufferView[o + 7] = vertices[i].getNormal().GetZ();
      bufferView[o + 8] = vertices[i].getTangent().GetX();
      bufferView[o + 9] = vertices[i].getTangent().GetY();
      bufferView[o + 10] = vertices[i].getTangent().GetZ();
    }
    // buffer.flip();
    return new Float32Array(bufferData);
  }

  private static createFlippedBufferNA (...numbers: number[]): Float32Array {
    const bufferData: ArrayBuffer = new ArrayBuffer(4 * numbers.length);
    const bufferView: Float32Array = new Float32Array(bufferData);
    bufferView.set(numbers, 0);
    return bufferView;
  }

  public static toNumberArray (data: Integer[]): number[] {
    const result: number[] = [];

    for (let i = 0; i < data.length; i++) {
      result[i] = typeof data[i] !== 'undefined' ? data[i].Value : 0;
    }

    return result;
  }
}
