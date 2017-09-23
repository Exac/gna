import { RenderingEngine } from './rendering-engine';
import { World } from './world';
import { Time } from './time';
import { Window } from './window';

// ENGINE.CORE

export class CoreEngine {
  private isRunning: boolean;
  private world: World;
  private renderingEngine: RenderingEngine;
  private width: number;
  private height: number;
  private frameTime: number;

  constructor (width: number, height: number, framerate: number, world: World) {
    this.isRunning = false;
    this.world = world;
    this.width = width;
    this.height = height;
    this.frameTime = 1.0 / framerate;
    this.world.setEngine(this);
  }

  public createWindow (title: string) {
    // TODO: implement
  }

  public start (): void {
    if (this.isRunning) {
      return;
    }

    this.run();
  }

  public stop (): void {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;
  }

  private run (): void {
    this.isRunning = true;

    const frames = 0;
    let frameCounter = 0;

    this.world.init();

    let lastTime: number = Time.getTime();
    let unprocessedTime = 0;

    while (this.isRunning) {
      let render = false;

      const startTime = Time.getTime();
      const passedTime = startTime - lastTime;
      lastTime = startTime;

      unprocessedTime += passedTime;
      frameCounter += passedTime;

      while (unprocessedTime > this.frameTime) {
        render = true;

        unprocessedTime -= this.frameTime;

        if (Window.isCloseRequested()) {
          this.stop();

        }

        this.world.input(this.frameTime);

      }

    }

    this.cleanUp();
  }

  private cleanUp (): void {
    // TODO: implement if needed (probably not)
    // Window.dispose();
  }

  public getRenderingEngine (): RenderingEngine {
    return this.renderingEngine;
  }
}
