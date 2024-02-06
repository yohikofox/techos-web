type Cache = {
  client?: unknown;
  _initialized?: boolean;
};

declare global {
  // eslint-disable-next-line no-var
  var cache: Cache | undefined;
}
export default global;
