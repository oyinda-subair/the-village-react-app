/* eslint-disable  @typescript-eslint/no-explicit-any */
export default class Helper {
  /**
   * Recursive function that makes a clone of an object.
   *
   * @param src {Object} The object you to clone.
   * @param renamePropertyNameFunction {(keyName: string) => string} Optional function to rename property names
   * @returns {any} Returns a clone object of the one passed in.
   * @example
   *      let cloneOfObject = Util.clone(obj);
   */
  static clone(src: any | null, renamePropertyNameFunction: (arg0: string) => any): any {
    if (src == null || typeof src !== 'object') {
      return src;
    }

    if (src instanceof Date) {
      return new Date(src.getTime());
    }

    if (src instanceof RegExp) {
      return new RegExp(src);
    }

    if (src instanceof Array) {
      return src.map((item) => Helper.clone(item, renamePropertyNameFunction));
    }

    if (src instanceof Object) {
      const hasRenameFunction = typeof renamePropertyNameFunction === 'function';

      return Object.keys(src).reduce((newObject: any, propertyName) => {
        const name = hasRenameFunction ? renamePropertyNameFunction(propertyName) : propertyName;

        newObject[name] = Helper.clone(src[propertyName], renamePropertyNameFunction);

        return newObject;
      }, {});
    }

    throw new Error(`Unable to copy. ${src} isn't supported.`);
  }
}
