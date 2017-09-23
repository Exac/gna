import { WorldComponent } from './world-component';
import { RenderingEngine } from './rendering-engine';
import { Quaternion } from './quaternion';
import { Vector3 } from './vector3';
import { Shader } from './shader';

export class LookAtComponent extends WorldComponent {
  private renderingEngine: RenderingEngine;

  public update (delta: number): void {
    if (typeof this.renderingEngine !== 'undefined') {
      const newRot: Quaternion =
        this.getTransform()
          .getLookAtRotation(this.renderingEngine.getMainCamera().getTransform().getTransformedPos(),
            new Vector3(0, 1, 0));

      this.getTransform().setRot(this.getTransform().getRot().nLerp(newRot, delta * 5.0, true));
    }
  }

  public render (shader: Shader, renderingEngine: RenderingEngine): void {
    this.renderingEngine = renderingEngine;
  }
}
