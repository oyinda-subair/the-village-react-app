import Helper from './normarlizerHelper';
import StringUtility from './stringUtility';

export default class PropertyNormalizer {
  static normalize(json: any) {
    const dataOrEmptyObject = json ? json : {};

    // Makes all property names camelCase so they are consistent in the application.
    // Also recursively goes through child objects.
    return Helper.clone(dataOrEmptyObject, StringUtility.toCamelCase);
  }

  static reverseNormalize(json: any) {
    const dataOrEmptyObject = json ? json : {};

    // Makes all property names camelCase so they are consistent in the application.
    // Also recursively goes through child objects.
    return Helper.clone(dataOrEmptyObject, StringUtility.camelToSnakeCase);
  }
}
