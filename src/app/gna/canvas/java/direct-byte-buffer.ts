import { MappedByteBuffer } from './mapped-byte-buffer';
import { DirectBuffer } from './direct-buffer';
import { Deallocator } from './deallocator';
import { Runnable } from './runnable';

export class DirectByteBuffer extends MappedByteBuffer implements DirectBuffer {
  protected static unsafe: any;
  protected static unaligned: boolean;
  protected ViewedBuffer: WebGLBuffer = null;

  private Cleaner: any;

  public address: number;

  public viewedBuffer (): WebGLBuffer {
    return this.ViewedBuffer;
  }

  public cleaner (): any {
    return this.Cleaner;
  }

  /**
   * 1. db:   DirectBuffer, mark: number,     pos:  number,   lim: number, cap: number, off: number
   * 2. cap:  number,       addr: number, unmapper: Runnable
   * 3. addr: number,       cap:  number
   *
   *
   */
  constructor (a: DirectBuffer | number, b: number, c: number | Runnable, lim: number, cap: number, off: number) {
    super(0, 0, 0, 0, false);
  }

  public isReadOnly (): Boolean {
    return true;
  }

  public hasArray (): boolean {
    return true;
  }

  public arr (): number {
    return 0;
  }

  public arrayOffset (): number {
    return 0;
  }

  public isDirect (): boolean {
    return true;
  }

}
