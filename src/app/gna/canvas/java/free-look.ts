import { WorldComponent } from './world-component';
import { Vector3 } from './vector3';
import { Vector2 } from './vector2';
import { Window } from './window';
import { Input } from './input';

export class FreeLook extends WorldComponent {
  private static Y_AXIS = new Vector3(0, 1, 0);

  private mouseLocked = false;
  private sensitivity: number;
  private unlockMouseKey: number;

  constructor (sensitivity: number, unlockMouseKey?: number) {
    super();
    this.sensitivity = sensitivity;
    if (typeof unlockMouseKey !== 'undefined') {
      this.unlockMouseKey = unlockMouseKey;
    }
  }

  public input (delta: number): void {
    const centerPosition: Vector2 = new Vector2(Window.getWidth() / 2, Window.getHeight() / 2);

    if (Input.getKey(this.unlockMouseKey)) {
      Input.setCursor(true);
      this.mouseLocked = false;
    }
    if (Input.getMouseDown(0)) {
      Input.setMousePosition(centerPosition);
      Input.setCursor(false);
      this.mouseLocked = true;
    }

    if (this.mouseLocked) {
      const deltaPos: Vector2 = Input.getMousePosition().sub(centerPosition);

      const rotY: boolean = deltaPos.getY() !== 0;
      const rotX: boolean = deltaPos.getX() !== 0;

      if (rotY) {
        this.getTransform().rotate(FreeLook.Y_AXIS, ((deltaPos.getX() * this.sensitivity) * (Math.PI / 180)));
      }
      if (rotY) {
        this.getTransform().rotate(this.getTransform().getRot().getRight(), ((-deltaPos.getY() * this.sensitivity) * (Math.PI / 180)));
      }
    }
  }

}
