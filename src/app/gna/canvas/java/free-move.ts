import { WorldComponent } from './world-component';
import { Input } from './input';
import { Vector3 } from './vector3';

export class FreeMove extends WorldComponent {
  private speed: number;
  private forwardKey: number;
  private backKey: number;
  private leftKey: number;
  private rightKey: number;

  constructor (speed: number,
               forwardKey?: number,
               backKey?: number,
               leftKey?: number,
               rightKey?: number) {
    super();
    if (typeof forwardKey === 'undefined') {
      this.speed = speed;
      this.forwardKey = Input.KEY_W;
      this.backKey = Input.KEY_S;
      this.leftKey = Input.KEY_A;
      this.rightKey = Input.KEY_D;
    } else {
      this.speed = speed;
      this.forwardKey = forwardKey;
      this.backKey = backKey;
      this.leftKey = leftKey;
      this.rightKey = rightKey;
    }

  }

  public input (delta: number): void {
    const movAmt = this.speed * delta;

    if (Input.getKey(this.forwardKey)) {
      this.move(this.getTransform().getRot().getForward(), movAmt);
    }

    if (Input.getKey(this.backKey)) { // still look forwards
      this.move(this.getTransform().getRot().getForward(), -movAmt);
    }

    if (Input.getKey(this.leftKey)) {
      this.move(this.getTransform().getRot().getLeft(), movAmt);
    }

    if (Input.getKey(this.rightKey)) {
      this.move(this.getTransform().getRot().getRight(), movAmt);
    }
  }

  private move (direction: Vector3, amount: number) {
    this.getTransform().setPos(this.getTransform().getPos().add(direction.mul(amount)));
  }
}
