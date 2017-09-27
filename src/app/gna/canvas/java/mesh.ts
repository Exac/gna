import { MeshResource } from './mesh-resource';
import { Vertex } from './vertex';
import { Loader } from './loader';
import { gl } from '../globals';
import { Util } from './util';
import { Vector3 } from './vector3';
import { IndexedModel } from './indexed-model';
import { OBJModel } from './obj-model';

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
    gl.bufferData(gl.ARRAY_BUFFER, Util.createFlippedBuffer(vertices), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.resource.getIbo());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Util.createFlippedBuffer(indices), gl.STATIC_DRAW);
  }

  public draw (): void {
    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);
    gl.enableVertexAttribArray(2);
    gl.enableVertexAttribArray(3);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.resource.getVbo());
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, Vertex.SIZE * 4, 0);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, Vertex.SIZE * 4, 12);
    gl.vertexAttribPointer(2, 3, gl.FLOAT, false, Vertex.SIZE * 4, 24);
    gl.vertexAttribPointer(3, 3, gl.FLOAT, false, Vertex.SIZE * 4, 32);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.resource.getIbo());
    gl.drawElements(gl.TRIANGLES, this.resource.getSize(), gl.UNSIGNED_INT, 0);

    gl.disableVertexAttribArray(0);
    gl.disableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    gl.disableVertexAttribArray(3);
  }

  private calcNormals (vertices: Vertex[], indices: number[]): void {
    for (let i = 0; i < indices.length; i += 3) {
      const i0: number = indices[i];
      const i1: number = indices[i + 1];
      const i2: number = indices[i + 2];

      const v1: Vector3 = vertices[i1].getPos().sub(vertices[i0].getPos());
      const v2: Vector3 = vertices[i2].getPos().sub(vertices[i0].getPos());

      const normal: Vector3 = v1.cross(v2).normalized();

      vertices[i0].setNormal(vertices[i0].getNormal().add(normal));
      vertices[i1].setNormal(vertices[i1].getNormal().add(normal));
      vertices[i2].setNormal(vertices[i2].getNormal().add(normal));
    }

    for (let i = 0; i < vertices.length; i++) {
      vertices[i].setNormal(vertices[i].getNormal().normalized());
    }
  }

  // TODO: Pass file as string, not fileName
  public loadMesh (fileContents: string): Mesh {
    const test: OBJModel = new OBJModel('./res/models/' + fileContents);

    return new Mesh([], [], false);
  }


  }
