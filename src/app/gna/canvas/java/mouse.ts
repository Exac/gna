export class Mouse {

  private static x: number;
  private static y: number;

  constructor () {
    // Never called on a static class
  }
  // TODO: implement init
  public static create(): void {

  }

  // TODO: Implement
  public static getX (): number {
    return 0;
  }

  // TODO: implement
  public static getY (): number {
    return 0;
  }

  // TODO: implement
  public static isButtonDown (mouseButton: number): boolean {
    return true;
  }

  // TODO: implement
  public static setCursorPosition (x: number, y: number): void {

  }

  // TODO: implement
  public static setGrabbed (enabled: boolean) {

  }
}
