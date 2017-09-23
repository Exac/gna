import { Vector3 } from './vector3';

export abstract class MappedValues {
  private vector3HashMap: Map<string, Vector3>;
  private numberHashMap: Map<string, number>;

  constructor () {
    this.vector3HashMap = new Map<string, Vector3>();
    this.numberHashMap = new Map<string, number>();
  }

  public addVector3 (name: string, vector3: Vector3): void {
    this.vector3HashMap.set(name, vector3);
  }

  public addNumber (name: string, number: number): void {
    this.numberHashMap.set(name, number);
  }

  public addFloat (name: string, number: number): void {
    this.addNumber(name, number);
  }

  public getVector3 (name: string): Vector3 {
    const result: Vector3 = this.vector3HashMap.get(name);

    if (!result) {
      return result;
    }

    return new Vector3(0, 0, 0);
  }

  public getNumber (name: string): number {
    const result: number = this.numberHashMap.get(name);

    if (!result) {
      return result;
    }

    return 0;
  }

  public getFloat (name: string): number {
    return this.getNumber(name);
  }
}
