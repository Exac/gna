export class OBJIndex {
  private vertexIndex: number;
  private texCoordIndex: number;
  private normalIndex: number;

  public getVertexIndex (): number {
    return this.vertexIndex;
  }

  public getTexCoordIndex (): number { return this.texCoordIndex; }

  public getNormalIndex (): number { return this.normalIndex; }

  public setVertexIndex (val: number): void {
    this.vertexIndex = val;
  }

  public setTexCoordIndex (val: number): void { this.texCoordIndex = val; }

  public setNormalIndex (val: number): void { this.normalIndex = val; }

  public equals (obj: object): boolean {
    if (obj instanceof OBJIndex) {
      const index: OBJIndex = obj;
      return this.vertexIndex === index.vertexIndex
        && this.texCoordIndex === index.texCoordIndex
        && this.normalIndex === index.normalIndex;
    } else {
      return false;
    }
  }

  public hashCode (): number {
    const BASE = 17;
    const MULTIPLIER = 31;

    let result: number = BASE;

    result = MULTIPLIER * result + this.vertexIndex;
    result = MULTIPLIER * result + this.texCoordIndex;
    result = MULTIPLIER * result + this.normalIndex;

    return result;
  }
}

