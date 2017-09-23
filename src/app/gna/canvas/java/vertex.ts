import { Vector3 } from './vector3';
import { Vector2 } from './vector2';

// ENGINE.RENDERING

export class Vertex {

  public static SIZE = 11;

  private pos: Vector3;
  private texCoord: Vector2;
  private normal: Vector3;
  private tangent: Vector3;

  constructor (pos: Vector3,
               texCoord?: Vector2,
               normal?: Vector3,
               tangent?: Vector3) {
    this.pos = pos;

    if (tangent instanceof Vector3) {
      this.tangent = tangent;
    } else {
      this.tangent = new Vector3(0, 0, 0);
    }

    if (normal instanceof Vector3) {
      this.normal = normal;
    } else {
      this.normal = new Vector3(0, 0, 0);
    }

    if (texCoord instanceof Vector2) {
      this.texCoord = texCoord;
    } else {
      this.texCoord = new Vector2(0, 0);
    }
  }

  public getTangent (): Vector3 {
    return this.tangent;
  }

  public setTangent (vector3: Vector3): void {
    this.tangent = vector3;
  }

  public getPos (): Vector3 {
    return this.pos;
  }

  public setPos (vector3: Vector3): void {
    this.pos = vector3;
  }

  public getTexCoord (): Vector2 {
    return this.texCoord;
  }

  public setTexCoord (vector2: Vector2): void {
    this.texCoord = vector2;
  }

  public getNormal (): Vector3 {
    return this.normal;
  }

  public setNormal (vector3: Vector3): void {
    this.normal = vector3;
  }


}
