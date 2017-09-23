import { WorldObject } from './world-object';
import { Shader } from './shader';
import { RenderingEngine } from './rendering-engine';

export class WorldComponent {
  private m_parent: WorldObject;

  public input (delta: number): void { }

  public update (delta: number): void { }

  public render (shader: Shader, renderingEngine: RenderingEngine): void { }

  public setParent (parent: WorldObject) {
    this.m_parent = parent;
  }

  public getTransform () {
    return this.m_parent.getTransform();
  }

  public addToEngine (engine: any) {

  }
}
