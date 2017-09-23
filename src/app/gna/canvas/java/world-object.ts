import { WorldComponent } from './world-component';
import { Transform } from './transform';
import { CoreEngine } from './core-engine';
import { Shader } from './shader';

// ENGINE.CORE

export class WorldObject {

  private m_children: Array<WorldObject>;
  private m_components: Array<WorldComponent>;
  private m_engine: CoreEngine;
  private m_transform: Transform;

  constructor () {
    this.m_children = new Array<WorldObject>();
    this.m_components = new Array<WorldComponent>();
    this.m_transform = new Transform();
    this.m_engine = null;
  }

  public addChild (child: WorldObject): WorldObject {
    this.m_children.push(child);
    child.setEngine(this.m_children);
    child.getTransform().setParent(this.m_transform);

    return this;
  }

  public addComponent (component: WorldComponent): WorldObject {
    this.m_components.push(component);
    component.setParent(this);

    return this;
  }

  public inputAll (delta: number) {
    this.input(delta);

    for (const child of this.m_children) {
      child.updateAll(delta);
    }
  }

  public updateAll (delta: number): void {
    this.update(delta);

    for (const child of this.m_children) {
      child.updateAll(delta);
    }
  }

  public renderAll (shader: Shader, renderingEngine: any) {
    this.render(shader, renderingEngine);

    for (const child of this.m_children) {
      child.renderAll(shader, renderingEngine);
    }
  }


  public input (delta: number): void {
    this.m_transform.update();

    for (const component of this.m_components) {
      component.input(delta);
    }
  }

  public update (delta: number): void {
    for (const component of this.m_components) {
      component.update(delta);
    }
  }

  public render (shader: Shader, renderingEngine: any): void {
    for (const component of this.m_components) {
      component.render(shader, renderingEngine);
    }
  }

  public getAllAttached (): Array<WorldObject> {
    const result: Array<WorldObject> = [];

    for (const child of this.m_children) {
      result.push.apply(child.getAllAttached());
    }

    result.push(this);

    return result;
  }

  public getTransform () {
    return this.m_transform;
  }

  public setEngine (engine: any): void {
    if (this.m_engine !== engine) {
      this.m_engine = engine;

      for (const component of this.m_components) {
        component.addToEngine(engine);
      }

      for (const child of this.m_children) {
        child.setEngine(engine);
      }
    }
  }
}
