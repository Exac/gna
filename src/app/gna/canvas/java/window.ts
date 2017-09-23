import { Vector2 } from './vector2';
import { Display } from './display';

// ENGINE.RENDERING

export class Window {
  private static width: number;
  private static height: number;

  public static createWindow (width: number, height: number, title: string) {
    this.width = width;
    this.height = height;
  }

  public static render (): void {

  }

  public static dispose (): void {
    // TODO: Implement (if needed)
  }

  public static isCloseRequested (): boolean {
    return false;
  }

  public static getWidth (): number {
    return this.width;
  }

  public static getHeight (): number {
    return this.height;
  }

  public static getTitle (): string {
    // TODO: implement, return canvas id?
    return '';
  }

  public getCenter (): Vector2 {
    return new Vector2(Display.getWidth() / 2, Display.getHeight() / 2);
  }
}
