import { Vector3 } from './vector3';
import { Vector2 } from './vector2';
import { OBJIndex } from './obj-index';
import { IndexedModel } from './indexed-model';
import { Loader } from './loader';
import { BufferedStringReader } from './buffered-string-reader';

export class OBJModel {
  private positions: Array<Vector3>;
  private texCoords: Array<Vector2>;
  private normals: Array<Vector3>;
  private indices: Array<OBJIndex>;
  private hasTexCoords: boolean;
  private hasNormals: boolean;

  constructor (fileName: string) {
    this.positions = new Array<Vector3>();
    this.texCoords = new Array<Vector2>();
    this.normals = new Array<Vector3>();
    this.indices = new Array<OBJIndex>();
    this.hasTexCoords = false;
    this.hasNormals = false;

    const fileContents: string = Loader.syncLoadFileContents(fileName);

    const meshReader: BufferedStringReader = new BufferedStringReader(fileContents);
    let line: string;

    while ((line = meshReader.readLine()) != null) {
      const tokens = line.split(' ');

      if (tokens.length === 0 || tokens[0] === '#') {
        // skip empty lines and commented lines
        // continue;
      } else if (tokens[0] === 'v') { // ["v", "0.01275", "-0.00075", "0.078400001"]
        this.positions
          .push(new Vector3(
            parseFloat(tokens[1]),
            parseFloat(tokens[2]),
            parseFloat(tokens[3])));
      } else if (tokens[0] === 'vt') {
        this.texCoords
          .push(new Vector2(
            parseFloat(tokens[1]),
            1.0 - parseFloat(tokens[2])));
      } else if (tokens[0] === 'vn') {
        this.normals
          .push(new Vector3(
            parseFloat(tokens[1]),
            parseFloat(tokens[2]),
            parseFloat(tokens[3])));
      } else if (tokens[0] === 'f') {
        for (let i = 0; i < tokens.length - 3; i++) {
          this.indices.push(this.parseOBJIndex(tokens[1]));
          this.indices.push(this.parseOBJIndex(tokens[2 + i]));
          this.indices.push(this.parseOBJIndex(tokens[3 + i]));
        }
      }
    }
    meshReader.close();

  }

  public toIndexedModel (): IndexedModel {
    const result: IndexedModel = new IndexedModel();
    const normalModel: IndexedModel = new IndexedModel();
    const resultIndexMap: Map<OBJIndex, Number> = new Map<OBJIndex, Number>();
    const normalIndexMap: Map<Number, Number> = new Map<Number, Number>();
    const indexMap: Map<Number, Number> = new Map<Number, Number>();

    for (let i = 0; i < this.indices.length; i++) {
      const currentIndex: OBJIndex = this.indices[i];

      const currentPosition: Vector3 = this.positions[currentIndex.getVertexIndex()];
      let currentTexCoord: Vector2;
      let currentNormal: Vector3;

      if (this.hasTexCoords) {
        currentTexCoord = this.texCoords[currentIndex.getTexCoordIndex()];
      } else {
        currentTexCoord = new Vector2(0, 0);
      }

      if (this.hasNormals) {
        currentNormal = this.normals[currentIndex.getNormalIndex()];
      } else {
        currentNormal = new Vector3(0, 0, 0);
      }

      let modelVertexIndex: Number;

      // 124
      if (typeof resultIndexMap.get(currentIndex) === 'undefined') {
        modelVertexIndex = resultIndexMap.get(currentIndex);
      } else {
        modelVertexIndex = result.getPositions().length;
        resultIndexMap.set(currentIndex, modelVertexIndex);

        result.getPositions().push(currentPosition);
        result.getTexCoords().push(currentTexCoord);
        if (this.hasNormals) {
          result.getNormals().push(currentNormal);
        }
      }

      let normalModelIndex: Number;
      // 137
      if (typeof resultIndexMap.get(currentIndex) !== 'undefined') {
        normalModelIndex =  resultIndexMap.get(currentIndex);
      } else {
        normalModelIndex = normalModel.getPositions().length;
        normalIndexMap.set(currentIndex.getVertexIndex(), normalModelIndex);

        normalModel.getPositions().push(currentPosition);
        normalModel.getTexCoords().push(currentTexCoord);
        normalModel.getNormals().push(currentNormal);
        normalModel.getTangents().push(new Vector3(0, 0, 0));
      }

      result.getIndices().push(modelVertexIndex);
      normalModel.getIndices().push(normalModelIndex);
      indexMap.set(modelVertexIndex, normalModelIndex);
    }
    // 153
    if (!this.hasNormals) {
      normalModel.calcNormals();

      for (let i = 0; i < result.getPositions().length; i++) {
        result.getNormals().push(normalModel.getNormals()[indexMap[i]]);
      }
    }

    normalModel.calcTangents();

    for (let i = 0; i < result.getPositions().length; i++) {
      result.getTangents().push(normalModel.getTangents()[indexMap[i]]);
    }

    return result;
  }

  private parseOBJIndex (token: string): OBJIndex {
    const values: string[] = token.split('/');

    const result: OBJIndex = new OBJIndex();
    result.setVertexIndex(parseInt(values[0], 10) - 1);

    if (values.length > 1) {
      if (typeof values[1] === 'undefined') {
        this.hasTexCoords = true;
        result.setTexCoordIndex(parseInt(values[1], 10) - 1);
      }
      if (values.length > 2) {
        this.hasNormals = true;
        result.setNormalIndex(parseInt(values[2], 10) - 1);
      }
    }

    return result;
  }
}
