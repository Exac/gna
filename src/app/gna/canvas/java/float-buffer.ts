
import { Buffer } from './buffer';
import { Comparable } from './comparable';

export abstract class FloatBuffer extends Buffer implements Comparable<FloatBuffer> {
  public hb: number[];
  offset: number;

  constructor (mark: number,
               pos: number,
               lim: number,
               cap: number,
               hb?: number[],
               offset?: number) {
    if (typeof hb === 'object' && typeof offset === 'number') {
      super(mark, pos, lim, cap);
      this.hb = hb;
      this.offset = offset;
    } else if (typeof hb === 'undefined') {
      this.hb = [];
      this.offset = 0;
      super(mark, pos, lim, cap);
    } else {
      throw new Error('IllegalArgument: FloatBuffer constructor');
    }

  }

  // public isReadOnly (): boolean {
  //   return false;
  // }
  //
  // public hasArray (): boolean {
  //   return true;
  // }
  //
  // public arr (): number {
  //   return 0;
  // }
  //
  // public arrayOffset (): number {
  //   return this.offset;
  // }
  //
  // public isDirect (): boolean {
  //   return true;
  // }

  public compareTo (o: any): number {
    return 0;
  }


}
