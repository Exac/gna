import { Runnable } from './runnable';

export class Deallocator implements Runnable {

  private static unsafe: any;

  private address: number;
  private capacity: number;

  constructor (address: number, capacity: number) {
    if (address !== 0) {
      this.address = address;
      this.capacity = capacity;
    }
  }

  public run (): void {
    if (typeof this.address === 'undefined') {
      return;
    }
    // this.unsafe.freeMemory(this.address);
    this.address = 0;
    // Bits.unreserveMemory(this.capacity);
  }

}
