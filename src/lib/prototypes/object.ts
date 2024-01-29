export const hasProperty = (obj: unknown, prop: PropertyKey): boolean => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
