export class BufferedStringReader {

  private text: string;
  private lines: string[];
  private current: number; // lines index 0<=current<=lines.length

  constructor (text: string) {
    this.text = text;
    this.lines = text.split('\n');
    this.current = 0;
  }

  public getLine (index: number): string {
    if (this.checkRange(index)) {
      return this.lines[index];
    } else {
      return '';
    }
  }

  public readLine (): string | null {
    if (this.checkRange(this.current)) {
      return this.lines[this.current++];
    } else {
      return null; // Reached file end
    }
  }

  private checkRange (x: number): boolean {
    const MIN = 0;
    const MAX = this.lines.length;

    return x >= MIN && x <= MAX;
  }

  public close (): void {

  }
}
