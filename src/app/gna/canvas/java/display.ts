import { DisplayMode } from './display-mode';

// OPENGL.DISPLAY

export class Display {

  private static width: number;
  private static height: number;

  // TODO: Implement
  public static create (): void {

  }

  public static setDisplayMode (displayMode: DisplayMode) {
    this.width = displayMode.getWidth();
    this.height = displayMode.getHeight();
  }

  public static update (): void {
    // TODO: Implement
  }

  public static getWidth (): number {
    return this.width;
  }

  public static getHeight (): number {
    return this.height;
  }

}
