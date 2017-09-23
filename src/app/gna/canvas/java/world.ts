import { WorldObject } from './world-object';
import { CoreEngine } from './core-engine';
import { RenderingEngine } from './rendering-engine';

// ENGINE.CORE

export abstract class World {
  private root: WorldObject;

  public init (): void { }

  public input (delta: number) {
    this.getRootObject().inputAll(delta);
  }

  public update (delta: number): void {
    this.getRootObject().updateAll(delta);
  }

  public render (renderingEngine: RenderingEngine) {
    renderingEngine.render(this.getRootObject());
  }

  public getRootObject (): WorldObject {
    if (!this.root) {
      this.root = new WorldObject();
    }

    return this.root;
  }

  public setEngine(engine: CoreEngine): void {

  }

}
