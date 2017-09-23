const enum ImageMode {CENTER, CORNER, CORNERS}

export class Tangible2D {

  public x: number;
  public y: number;
  private mode: ImageMode;

  constructor (private c: CanvasRenderingContext2D) { }

  public draw (): void {
    //
  }

  public imageMode (mode: ImageMode): void {
    this.mode = mode;
  }
}
