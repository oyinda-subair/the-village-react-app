import StringUtility from './stringUtility';
import Helper from './normarlizerHelper';

export default class PropertyNormalizer {
  static normalize(json: any) {
    const dataOrEmptyObject = json ? json : {};

    // Makes all property names camelCase so they are consistent in the application.
    // Also recursively goes through child objects.
    return Helper.clone(dataOrEmptyObject, StringUtility.toCamelCase);
  }
}
