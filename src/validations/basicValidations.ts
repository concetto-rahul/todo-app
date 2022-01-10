export const isEmpty = (value: any) =>
  value === undefined ||
  value === null ||
  value === '' ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

export const isNullOrUndefined = (value: any) => value === undefined || value === null; // isNullOrUndefined = isEmpty

export const isNumber = (value: any) => !isNaN(parseFloat(value));
export const isBoolean = (value: any) =>
  typeof value === 'boolean' || (value && (value === 'true' || value === 'false'));
export const isArray = (value: any) => value && Array.isArray(value);
export const isString = (value: any) => value && typeof value === 'string';
export const isObject = (value: any) => value && typeof value === 'object';

const textOnlyPattern = /^[A-Za-z ]+$/;

export const textOnly = (value: any) => textOnlyPattern.test(value)

