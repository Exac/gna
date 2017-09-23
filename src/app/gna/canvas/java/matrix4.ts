import { Vector3 } from './vector3';

// ENGINE.CORE

export class Matrix4 {
  // private m = [new Array<number>(4), new Array<number>(4)];
  // private m: number[][] = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
  private m: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

  constructor () {

  }

  public InitIdentity (): Matrix4 {
    this.m[0][0] = 1;
    this.m[0][1] = 0;
    this.m[0][2] = 0;
    this.m[0][3] = 0;
    this.m[1][0] = 0;
    this.m[1][1] = 1;
    this.m[1][2] = 0;
    this.m[1][3] = 0;
    this.m[2][0] = 0;
    this.m[2][1] = 0;
    this.m[2][2] = 1;
    this.m[2][3] = 0;
    this.m[3][0] = 0;
    this.m[3][1] = 0;
    this.m[3][2] = 0;
    this.m[3][3] = 1;

    return this;
  }

  public InitTranslation (x: number, y: number, z: number) {
    this.m[0][0] = 1;
    this.m[0][1] = 0;
    this.m[0][2] = 0;
    this.m[0][3] = x;
    this.m[1][0] = 0;
    this.m[1][1] = 1;
    this.m[1][2] = 0;
    this.m[1][3] = y;
    this.m[2][0] = 0;
    this.m[2][1] = 0;
    this.m[2][2] = 1;
    this.m[2][3] = z;
    this.m[3][0] = 0;
    this.m[3][1] = 0;
    this.m[3][2] = 0;
    this.m[3][3] = 1;

    return this;
  }

  /**
   * Combinations:
   * number   number  number
   * Vector3  Vector3
   * Vector3  Vector3 Vector3
   *
   * @param {number | Vector3} x
   * @param {number | Vector3} y
   * @param {number | Vector3} z
   * @returns {Matrix4}
   * @constructor
   */
  public InitRotation (x: number | Vector3, y?: number | Vector3, z?: number | Vector3): Matrix4 {
    if (x instanceof Vector3 && y instanceof Vector3 && z instanceof Vector3) {
      const f: Vector3 = x;
      const u: Vector3 = y;
      const r: Vector3 = z;

      // @formatter:off
      /* tslint:disable */
      this.m[0][0] = r.GetX();	this.m[0][1] = r.GetY();	this.m[0][2] = r.GetZ();	this.m[0][3] = 0;
      this.m[1][0] = u.GetX();	this.m[1][1] = u.GetY();	this.m[1][2] = u.GetZ();	this.m[1][3] = 0;
      this.m[2][0] = f.GetX();	this.m[2][1] = f.GetY();	this.m[2][2] = f.GetZ();	this.m[2][3] = 0;
      this.m[3][0] = 0;			this.m[3][1] = 0;			this.m[3][2] = 0;			this.m[3][3] = 1;
      /* tslint:enable*/
      // @formatter:on

      return this;
    } else if (!z && x instanceof Vector3 && y instanceof Vector3) {
      const forward: Vector3 = x;
      const up: Vector3 = y;

      const f: Vector3 = forward.normalized();

      let r: Vector3 = up.normalized();
      r = r.cross(f);

      const u: Vector3 = f.cross(r);

      return this.InitRotation(f, u, r);

    } else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
      const rx: Matrix4 = new Matrix4();
      const ry: Matrix4 = new Matrix4();
      const rz: Matrix4 = new Matrix4();

      x = x * (Math.PI / 180);
      y = z * (Math.PI / 180);
      z = z * (Math.PI / 180);
      // @formatter:off
      /* tslint:disable */
      rz.m[0][0] = Math.cos(z);	rz.m[0][1] = -Math.sin(z);rz.m[0][2] = 0;				      rz.m[0][3] = 0;
      rz.m[1][0] = Math.sin(z);	rz.m[1][1] = Math.cos(z);	rz.m[1][2] = 0;				      rz.m[1][3] = 0;
      rz.m[2][0] = 0;				    rz.m[2][1] = 0;				    rz.m[2][2] = 1;				      rz.m[2][3] = 0;
      rz.m[3][0] = 0;				    rz.m[3][1] = 0;				    rz.m[3][2] = 0;				      rz.m[3][3] = 1;

      rx.m[0][0] = 1;				    rx.m[0][1] = 0;				    rx.m[0][2] = 0;				      rx.m[0][3] = 0;
      rx.m[1][0] = 0;				    rx.m[1][1] = Math.cos(x);	rx.m[1][2] = -Math.sin(x);	rx.m[1][3] = 0;
      rx.m[2][0] = 0;				    rx.m[2][1] = Math.sin(x);	rx.m[2][2] = Math.cos(x);	  rx.m[2][3] = 0;
      rx.m[3][0] = 0;				    rx.m[3][1] = 0;				    rx.m[3][2] = 0;				      rx.m[3][3] = 1;

      ry.m[0][0] = Math.cos(y);	ry.m[0][1] = 0;				    ry.m[0][2] = -Math.sin(y);	ry.m[0][3] = 0;
      ry.m[1][0] = 0;				    ry.m[1][1] = 1;				    ry.m[1][2] = 0;				      ry.m[1][3] = 0;
      ry.m[2][0] = Math.sin(y);	ry.m[2][1] = 0;				    ry.m[2][2] = Math.cos(y);	  ry.m[2][3] = 0;
      ry.m[3][0] = 0;				    ry.m[3][1] = 0;				    ry.m[3][2] = 0;				      ry.m[3][3] = 1;
      /* tslint:enable*/
      // @formatter:on
      this.m = rz.Mul(ry.Mul(rx)).GetM();

      return this;
    }

  }

  public initScale (x: number, y: number, z: number) {
    // @formatter:off
    /* tslint:disable */
    this.m[0][0] = x;	this.m[0][1] = 0;	this.m[0][2] = 0;	this.m[0][3] = 0;
    this.m[1][0] = 0;	this.m[1][1] = y;	this.m[1][2] = 0;	this.m[1][3] = 0;
    this.m[2][0] = 0;	this.m[2][1] = 0;	this.m[2][2] = z;	this.m[2][3] = 0;
    this.m[3][0] = 0;	this.m[3][1] = 0;	this.m[3][2] = 0;	this.m[3][3] = 1;
    /* tslint:enable*/
    // @formatter:on

    return this;
  }

  public initPerspective (fov: number, aspectRatio: number, zNear: number, zFar: number): Matrix4 {
    const tanHalfFOV: number = Math.tan(fov / 2);
    const zRange: number = zNear - zFar;

    // @formatter:off
    /* tslint:disable */
    this.m[0][0] = 1.0 / (tanHalfFOV * aspectRatio);	this.m[0][1] = 0;					        this.m[0][2] = 0;	this.m[0][3] = 0;
    this.m[1][0] = 0;									                this.m[1][1] = 1.0 / tanHalfFOV;	this.m[1][2] = 0;	this.m[1][3] = 0;
    this.m[2][0] = 0;									                this.m[2][1] = 0;					        this.m[2][2] = (-zNear -zFar)/zRange;	this.m[2][3] = 2 * zFar * zNear / zRange;
    this.m[3][0] = 0;									                this.m[3][1] = 0;					        this.m[3][2] = 1;	this.m[3][3] = 0;
    /* tslint:enable*/
    // @formatter:on
    return this;
  }

  public initOrthographic (left: number,
                           right: number,
                           bottom: number,
                           top: number,
                           near: number,
                           far: number): Matrix4 {
    const width: number = right - left;
    const height: number = top - bottom;
    const depth: number = far - near;

    // @formatter:off
    /* tslint:disable */
    this.m[0][0] = 2/width;	this.m[0][1] = 0;		    this.m[0][2] = 0;		    this.m[0][3] = -(right + left)/width;
    this.m[1][0] = 0;		    this.m[1][1] = 2/height;this.m[1][2] = 0;		    this.m[1][3] = -(top + bottom)/height;
    this.m[2][0] = 0;		    this.m[2][1] = 0;		    this.m[2][2] = -2/depth;this.m[2][3] = -(far + near)/depth;
    this.m[3][0] = 0;		    this.m[3][1] = 0;		    this.m[3][2] = 0;		    this.m[3][3] = 1;
    /* tslint:enable*/
    // @formatter:on

    return this;
  }

  public transform (r: Vector3): Vector3 {
    return new Vector3(this.m[0][0] * r.GetX() + this.m[0][1] * r.GetY() + this.m[0][2] * r.GetZ() + this.m[0][3],
      this.m[1][0] * r.GetX() + this.m[1][1] * r.GetY() + this.m[1][2] * r.GetZ() + this.m[1][3],
      this.m[2][0] * r.GetX() + this.m[2][1] * r.GetY() + this.m[2][2] * r.GetZ() + this.m[2][3]);
  }

  public Mul (r: Matrix4): Matrix4 {
    const res: Matrix4 = new Matrix4();

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        res.Set(i, j, this.m[i][0] * r.Get(0, j) +
          this.m[i][1] * r.Get(1, j) +
          this.m[i][2] * r.Get(2, j) +
          this.m[i][3] * r.Get(3, j));
      }
    }

    return res;
  }

  public GetM (): number[][] {
    const res: number[][] = [];

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        res[i][j] = this.m[i][j];
      }
    }

    return res;
  }

  public Get (x: number, y: number) {
    return this.m[x][y];
  }

  public Set (x: number, y: number, value: number): void {
    this.m[x][y] = value;
  }

}
