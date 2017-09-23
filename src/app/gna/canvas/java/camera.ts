import { Matrix4 } from './matrix4';
import { WorldComponent } from './world-component';
import { Vector3 } from './vector3';
import { CoreEngine } from './core-engine';

export class Camera extends WorldComponent {
  private projection: Matrix4;

  constructor (projection: Matrix4) {
    super();
    this.projection = projection;
  }

  public getViewProjection (): Matrix4 {
    const cameraRotation: Matrix4 = this.getTransform().getTransformedRot().conjugate().toRotationMatrix();
    const cameraPos: Vector3 = this.getTransform().getTransformedPos().mul(-1);

    const cameraTranslation: Matrix4 = new Matrix4().InitTranslation(cameraPos.GetX(), cameraPos.GetY(), cameraPos.GetZ());

    return this.projection.Mul(cameraRotation.Mul(cameraTranslation));
  }

  public addToEngine (engine: CoreEngine): void {
    engine.getRenderingEngine().addCamera(this);
  }
}
