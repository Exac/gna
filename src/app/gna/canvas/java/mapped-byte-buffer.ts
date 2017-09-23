// JAVA.NIO

import { ByteBuffer } from './byte-buffer';
import { DirectByteBuffer } from './direct-byte-buffer';

export class MappedByteBuffer  extends ByteBuffer {

  isAMappedBuffer: boolean; // Package-private

  constructor (mark: number,
               pos: number,
               lim: number,
               cap: number,
               mapped: boolean) {
    super(mark, pos, lim, cap);
    if (typeof mapped === 'boolean') {
      this.isAMappedBuffer = mapped;
    } else {
      this.isAMappedBuffer = false;
    }
  }

  private checkMapped (): void {
    if (!this.isAMappedBuffer) {
      throw new Error('UnsupportedOperation');
    }
  }

  public isLoaded (): boolean {
    this.checkMapped();
    if ((this.address === 0) || (this.capacity() === 0)) {
      return true;
    }
    return this.isLoaded0(0/*this<DirectByteBuffer>.address()*/, this.capacity());
  }

  private isLoaded0 (address: number, length: number): boolean {
    // TODO: implement native function in WebAssembly
    return true;
  }

  private load0 (address: number, length: number, pageSize: number): number {
    // TODO: implement native function in WebAssembly
    return 1;
  }

  private force0 (address: number, length: number): void {
    // TODO: implement native function in WebAssembly
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
