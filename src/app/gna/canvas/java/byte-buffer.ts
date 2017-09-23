import { Buffer } from './buffer';
import { Comparable } from './comparable';

export abstract class ByteBuffer extends Buffer implements Comparable<ByteBuffer> {
  public hb: string[];
  offset: number;

  constructor (mark: number,
               pos: number,
               lim: number,
               cap: number,
               hb?: string[],
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
      throw new Error('IllegalArgument: ByteBuffer constructor');
    }

  }

  public static allocateDirect (capacity: number) {
    // TODO: implement

  }

  // TODO: Implement

  public compareTo (o: any): number {
    return 0;
  }

}
