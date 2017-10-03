import { encoding } from 'text-encoding';
import 'rxjs/add/observable/fromPromise';

export class Loader {

  constructor () { }

  public static syncLoadFileContents (fileName: string): string {
    console.log('Loader.syncLoadFileContents(', fileName, ')');
    let result: string;
    const request: XMLHttpRequest = new XMLHttpRequest();
    request.open('GET', '/assets/' + fileName, false);
    request.send(null);
    if (request.status === 200) {
      result = request.responseText;
    }

    return result;
  }

  /**
   * const p: Promise<{}> = Loader.getFilePromise('test.obj');
   * p.then((str: string) => { console.log(str); });
   */
  public static getFilePromise (fileName: string): Promise<string> {
    return fetch('/assets/' + fileName, {method: 'get'})
      .then(function(res: Response) {
        return res;
      })
      .then(function (r: Response) {
        return r.text();
      })
      .catch(function (error) {
        return '';
      });
  }

  /**
   *
   * @param {string} fileName To load
   * @returns {any}
   */
  public getFile (fileName: string): any {
    return fetch(fileName, { method: 'get' })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        return text;
      })
      .catch((error) => {
        console.error(error);
      });
  }


}
