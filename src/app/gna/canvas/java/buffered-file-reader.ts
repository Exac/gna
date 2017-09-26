import { Loader } from './loader';

export class BufferedFileReader {

  private file: string;
  private lines: string[];
  private current: number; // lines index 0<=current<=lines.length

  constructor (fileName?: string) {
    this.lines = [];
    this.current = 0;

    const p: Promise<{}> = Loader.getFilePromise(fileName);
    p.then((str: string) => { this.onFileLoad(str); });
  }

  private onFileLoad (contents: string): void {
    // check if file has contents
    if (typeof this.file === 'undefined') {
      this.file = ''; // file is empty
    } else {
      this.lines = this.file.split('\n');
    }
  }

  /**
   *
   * @param {number} index Index of the line of the file
   * @returns {string | null} Returns the string, or null if reached the end
   */
  public readLine (index?: number): string | null {
    if (typeof index !== 'undefined') {
      return this.lines[index];
    } else {
      if (this.checkRange(this.current + 1)) {
        return this.lines[this.current++];
      } else {
        return null;
      }
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
