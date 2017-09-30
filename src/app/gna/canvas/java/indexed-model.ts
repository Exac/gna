import { Vector3 } from './vector3';
import { Vector2 } from './vector2';
import { Integer } from './Integer';

export class IndexedModel {
  private positions: Array<Vector3>;
  private texCoords: Array<Vector2>;
  private normals: Array<Vector3>;
  private tangents: Array<Vector3>;
  private indices: Array<Integer>;

  constructor () {
    this.positions = new Array<Vector3>();
    this.texCoords = [];
    this.normals = [];
    this.tangents = [];
    this.indices = new Array<Integer>();
  }

  public calcNormals (): void {
    for (let i = 0; i < this.indices.length; i += 3) {
      const i0: number = this.indices[i].intValue();
      const i1: number = this.indices[i + 1].intValue();
      const i2: number = this.indices[i + 2].intValue();

      console.log('calcNormals', this);

      const v1: Vector3 = this.positions[i1].sub(this.positions[i0]);
      const v2: Vector3 = this.positions[i2].sub(this.positions[i0]);

      const normal: Vector3 = v1.cross(v2).normalized();

      this.normals[i0].Set(this.normals[i0].add(normal));
      this.normals[i1].Set(this.normals[i1].add(normal));
      this.normals[i2].Set(this.normals[i2].add(normal));
    }

    for (let i = 0; i < this.normals.length; i++) {
      this.normals[i].Set(this.normals[i].normalized());
    }
  }

  public calcTangents (): void {
    for (let i = 0; i < this.indices.length; i += 3) {
      const i0: number = this.indices[i].intValue();
      const i1: number = this.indices[i + 1].intValue();
      const i2: number = this.indices[i + 2].intValue();

      // These three lines are added to catch undefined positions, which shoujldn't happen...
      if (typeof this.positions[i0] === 'undefined') { this.positions[i0] = new Vector3(0, 0, 0); }
      if (typeof this.positions[i1] === 'undefined') { this.positions[i1] = new Vector3(0, 0, 0); }
      if (typeof this.positions[i2] === 'undefined') { this.positions[i2] = new Vector3(0, 0, 0); }

      const edge1: Vector3 = this.positions[i1].sub(this.positions[i0]);
      const edge2: Vector3 = this.positions[i2].sub(this.positions[i0]);

      const deltaU1: number = this.texCoords[i1].getX() - this.texCoords[i0].getX();
      const deltaV1: number = this.texCoords[i1].getY() - this.texCoords[i0].getY();
      const deltaU2: number = this.texCoords[i2].getX() - this.texCoords[i0].getX();
      const deltaV2: number = this.texCoords[i2].getY() - this.texCoords[i0].getY();

      const dividend: number = (deltaU1 * deltaV2 - deltaU2 * deltaV1);

      const f: number = dividend === 0 ? 0.0 : 1.0 / dividend;

      const tangent: Vector3 = new Vector3(0, 0, 0);
      tangent.SetX(f * (deltaV2 * edge1.GetX() - deltaV1 * edge2.GetX()));
      tangent.SetY(f * (deltaV2 * edge1.GetY() - deltaV1 * edge2.GetY()));
      tangent.SetZ(f * (deltaV2 * edge1.GetZ() - deltaV1 * edge2.GetZ()));

      this.tangents[i0].Set(this.tangents[i0].add(tangent));
      this.tangents[i1].Set(this.tangents[i1].add(tangent));
      this.tangents[i2].Set(this.tangents[i2].add(tangent));
    }

    for (let i = 0; i < this.tangents.length; i++) {
      this.tangents[i].Set(this.tangents[i].normalized());
    }
  }

  public getPositions (): Array<Vector3> { return this.positions; }

  public getTexCoords (): Array<Vector2> { return this.texCoords; }

  public getNormals (): Array<Vector3> { return this.normals; }

  public getTangents (): Array<Vector3> { return this.tangents; }

  public getIndices (): Array<Integer> { return this.indices; }

}
