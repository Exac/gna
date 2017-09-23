// ENGINE.CORE

export class Time {
  private static SECOND = 1000000000;

  public static getTime(): number {
    return performance.now();
  }
}
