// SUN.NIO.CH

export interface DirectBuffer {
  address: number;

  viewedBuffer (): any;

  cleaner (): any;
}
