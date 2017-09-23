import { Comparable } from './comparable';

export class Character implements Comparable<string> {

  private character: string;

  constructor () {

  }

  public static isWhitespace (c: string): boolean {
    c = Character.getFirstChar(c);
    c = c.replace(/^\s+/, '').replace(/\s+$/, '');
    return c === '';
  }

  private static getFirstChar (str: string): string {
    return str.substr(0, 1); // get only first character
  }

  public compareTo (c: string): number {
    if (this.character > c) {
      return 1;
    } else {
      return 0;
    }
  }

  public toString (): string {
    return Character.getFirstChar(this.character);
  }
}
