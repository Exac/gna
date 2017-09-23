import { encoding } from 'text-encoding';
import 'rxjs/add/observable/fromPromise';

export class Loader {

  constructor () { }

  /**
   *
   * @param {string} fileName To load
   * @returns {any}
   */
  public getFile (fileName: string): any {
    return fetch(fileName, {method: 'get'})
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
