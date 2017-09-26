import { MeshResource } from './mesh-resource';
import { Vertex } from './vertex';
import { Loader } from './loader';
import { gl } from '../globals';
import { Util } from './util';

export class Mesh {
  private static loadedModels: Map<string, MeshResource> = new Map<string, MeshResource>();
  private resource: MeshResource;
  private fileName: string;

  constructor (verticesOrFileName: string | Vertex[], indicies?: number[], calcNormals?: boolean) {
    if (typeof verticesOrFileName === 'string') {
      this.constructorS(verticesOrFileName);
    } else if (typeof calcNormals === 'undefined') {
      this.constructorVaNa(verticesOrFileName, indicies);
    } else {
      this.constructorVaNaB(verticesOrFileName, indicies, calcNormals);
    }
  }

  private constructorS (fileName: string) {
    this.fileName = fileName;
    const oldResource = Mesh.loadedModels.get(fileName);

    if (typeof oldResource !== 'undefined') {
      this.resource = oldResource;
      this.resource.addReference();
    } else {
      // WARNING: This is an asynchronous operation. after the constructor
      // is called there will be milliseconds of
      const p: Promise<{}> = Loader.getFilePromise(fileName);
      p.then((str: string) => {
        this.loadMesh(str);
        Mesh.loadedModels.set(fileName, this.resource);
      });
    }
  }

  private constructorVaNa (vertices: Vertex[], indices: number[]) {
    this.constructorVaNaB(vertices, indices, false);
  }

  private constructorVaNaB (vertices: Vertex[], indices: number[], calcNormals: boolean) {
    this.fileName = '';
    this.addVertices(vertices, indices, calcNormals);
  }

  protected finalize (): void {
    if (this.resource.removeReference() && (this.fileName !== '')) {
      Mesh.loadedModels.delete(this.fileName);
    }
  }

  private addVertices (vertices: Vertex[], indices: number[], calcNormals: boolean) {
    if (calcNormals) {
      this.calcNormals(vertices, indices);
    }

    this.resource = new MeshResource(indices.length);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.resource.getVbo());
    // gl.bufferData(gl.ARRAY_BUFFER, Util.createFlippedBuffer(vertices), gl.STATIC_DRAW);
  }

  public draw (): void {

  }

  private calcNormals (vertices: Vertex[], indices: number[]): void {

  }

  // TODO: Pass file as string, not fileName
  public loadMesh (fileContents: string): Mesh {
    return new Mesh([], [], false);
  }


  }
