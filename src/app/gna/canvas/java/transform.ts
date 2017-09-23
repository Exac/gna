import { Matrix4 } from './matrix4';
import { Vector3 } from './vector3';
import { Quaternion } from './quaternion';

// ENGINE.CORE

export class Transform {
  private parent: Transform;
  private parentMatrix: Matrix4;

  private pos: Vector3;
  private rot: Quaternion;
  private scale: Vector3;

  private oldPos: Vector3;
  private oldRot: Quaternion;
  private oldScale: Vector3;

  constructor () {
    this.pos = new Vector3(0, 0, 0);
    this.rot = (new Quaternion(0, 0, 0, 1));
    this.scale = new Vector3(1, 1, 1);

    this.parentMatrix = new Matrix4().InitIdentity();
  }

  public update (): void {
    if (this.oldPos instanceof Vector3) {
      this.oldPos.Set(this.pos);
      this.oldRot.Set(this.rot);
      this.oldScale.Set(this.scale);
    } else {
      this.oldPos = new Vector3(0, 0, 0).Set(this.pos).add(1.0);
      this.oldRot = new Quaternion(0, 0, 0, 0).Set(this.rot).mul(0.5);
      this.oldScale = new Vector3(0, 0, 0).Set(this.pos).add(1.0);
    }
  }

  public rotate (axis: Vector3, angle: number) {
    this.rot = new Quaternion(axis, angle).mul(this.rot).normalized();
  }

  public lootAt (point: Vector3, up: Vector3) {
    this.rot = this.getLookAtRotation(point, up);
  }

  public getLookAtRotation (point: Vector3, up: Vector3): Quaternion {
    return new Quaternion(new Matrix4().InitRotation(point.sub(this.pos).normalized(), up));
  }

  public hasChanged (): boolean {
    if (this.parent instanceof Transform && this.parent.hasChanged()) {
      return true; // if parent transform hasChanged
    }

    if (!this.pos.equals(this.oldPos)) {
      return true; // if position has changed since last update
    }

    if (!this.rot.equals(this.oldRot)) {
      return true; // if we have rotated since last update
    }

    if (!this.scale.equals(this.oldScale)) {
      return true; // if we have changed size since last update
    }

    return false;
  }

  public getTransformation (): Matrix4 {
    const translationMatrix: Matrix4 = new Matrix4().InitTranslation(this.pos.GetX(), this.pos.GetY(), this.pos.GetZ());
    const rotationMatrix: Matrix4 = this.rot.toRotationMatrix();
    const scaleMatrix: Matrix4 = new Matrix4().initScale(this.scale.GetX(), this.scale.GetY(), this.scale.GetZ());

    return this.getParentMatrix().Mul(translationMatrix.Mul(rotationMatrix.Mul(scaleMatrix)));
  }

  private getParentMatrix (): Matrix4 {
    if (this.parent instanceof Transform && this.parent.hasChanged()) {
      this.parentMatrix = this.parent.getTransformation();
    }

    return this.parentMatrix;
  }

  public setParent (parent: Transform) {
    this.parent = parent;
  }

  public getTransformedPos (): Vector3 {
    return this.getParentMatrix().transform(this.pos);
  }
  public getTransformedRot (): Quaternion {
    let parentRotation: Quaternion = new Quaternion(0, 0, 0, 1);

    if (this.parent instanceof Transform) {
      parentRotation = this.parent.getTransformedRot();
    }

    return parentRotation.mul(this.rot);
  }

  public getPos (): Vector3 {
    return this.pos;
  }

  public setPos (pos: Vector3): void {
    this.pos = pos;
  }

  public getRot (): Quaternion {
    return this.rot;
  }

  public setRot (rotation: Quaternion): void {
    this.rot = rotation;
  }

  public getScale (): Vector3 {
    return this.scale;
  }

  public setScale (scale: Vector3) {
    this.scale = scale;
  }
}
