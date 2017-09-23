export abstract class Buffer {
  private Mark: number = -1;
  private Position = 0;
  private Limit: number;
  private Capacity: number;

  public address: number;

  constructor (mark: number, pos: number, lim: number, cap: number) {
    if (cap < 0) {
      throw new Error('IllegalArgument: Negative capacity: ' + cap);
    }

    this.Capacity = cap;
    this.limit(lim);
    this.position(pos);

    if (mark >= 0) {
      if (mark > pos) {
        throw new Error('IllegalArgument: mark > position: (' + mark + ' > ' + pos + ')');
      }
      this.Mark = mark;
    }
  }

  public capacity (): number {
    return this.Capacity;
  }

  /**
   *
   * @param {number} newPos The new position value; must be non-negative and no larger than the current limit
   * @returns {Buffer | number} This buffer or the Position
   */
  public position (newPos?: number): WebGLBuffer | Buffer | number {
    if (typeof newPos === 'number') {
      if ((newPos > this.Limit) || (newPos < 0)) {
        throw new Error('IllegalArgument');
      }
      this.Position = newPos;
      if (this.Mark > this.Position) {
        this.Mark = -1;
      }
      return this;
    } else if (typeof newPos === 'undefined') {
      return this.Position;
    }
  }

  /**
   *
   * @param {number} newLimit The new limit value; must be non-negative and no larger than this buffer's capacity
   * @returns {Limit | number} This buffer or the Limit
   */
  public limit (newLimit?: number): WebGLBuffer | Buffer {
    if (typeof newLimit === 'number') {
      if ((newLimit > this.Capacity) || (newLimit < 0)) {
        throw new Error('IllegalArgument');
      }
      this.Limit = newLimit;
      if (this.Position > this.Limit) {
        this.Position = -1;
      }

      return this;
    } else if (typeof newLimit === 'undefined') {
      this.Mark = this.Position;

      return this;
    }
  }

  public mark (): WebGLBuffer | Buffer {
    this.Mark = this.Position;
    return this;
  }

  public reset (): WebGLBuffer | Buffer {
    const m: number = this.Mark;
    if (m < 0) {
      throw new Error('IllegalArgument');
    }
    this.Position = m;

    return this;
  }

  public clear (): WebGLBuffer | Buffer {
    this.Position = 0;
    this.Limit = this.Capacity;
    this.Mark = -1;

    return this;
  }

  public flip (): WebGLBuffer | Buffer {
    this.Limit = this.Position;
    this.Position = 0;
    this.Mark = -1;

    return this;
  }

  public rewind (): WebGLBuffer | Buffer {
    this.Position = 0;
    this.Mark = -1;

    return this;
  }

  public remaining (): number {
    return this.Limit - this.Position;
  }

  public hasRemaining (): boolean {
    return this.Position < this.Limit;
  }

  public abstract isReadOnly (): Boolean;

  public abstract hasArray (): boolean;

  public abstract arr (): number;

  public abstract arrayOffset (): number;

  public abstract isDirect (): boolean;

  /**
   * Checks the current position against the limit, throwing
   * a BufferUnderflowException if it is not smaller than the
   * limit, and then increments the position.
   * @param {number} nb
   * @returns {number} The current position value, before it is incremented.
   */
  public nextGetIndex (nb?: number): number {
    if (typeof nb === 'number') {
      if (this.Limit - this.Position < nb) {
        throw new Error('BufferUnderflow');
      }
      const p: number = this.Position;
      this.Position += nb;

      return p;
    } else {
      if (this.Position >= this.Limit) {
        throw new Error('BufferUnderflow');
      }
      return this.Position++;
    }
  }

  /**
   * Checks the current position against the limit, throwing
   * a BufferOverflowException if it is not smaller than the
   * limit, and then increments the position.
   * @param {number} nb
   * @returns {number} The current position value, before it is incremented.
   */
  public nextPutIndex (nb?: number): number {
    if (typeof nb === 'number') {
      if (this.Limit - this.Position < nb) {
        throw new Error('BufferOverflow');
      }
      const p: number = this.Position;
      this.Position += nb;
      return p;
    } else {
      if (this.Position >= this.Limit) {
        throw new Error('BufferOverflow');
      }
      return this.Position++;
    }
  }

  /**
   * Checks the given index against the limit, throwing an
   * IndexOutOfBounds Error if it is not smaller than the
   * limit or is smaller than zero.
   * @param {number} i
   * @param {number} nb
   * @returns {number}
   */
  public checkIndex(i: number, nb?: number): number {
    if (typeof nb === 'number') {
      if ((i < 0) || (nb > this.Limit - i)) {
        throw new Error('IndexOutOfBounds');
      }
    } else {
      if (i < 0 || (i >= this.Limit)) {
        throw new Error('IndexOutOfBounds');
      }
    }
    return i;
  }

  public markValue (): number {
    return this.Mark;
  }

  public checkBounds (off: number, len: number, size: number): void {
    /* tslint:disable */
    if ((off | len | (off + len) | (size - (off + len))) < 0) {
      /* tslint:enable */
      throw new Error('IndexOutOfBounds');
    }
  }

}
