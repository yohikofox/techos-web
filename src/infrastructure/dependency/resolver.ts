export interface Resolver<T> {
  new (...args: unknown[]): T;
}

export type ResolverDefinition<T> = {
  default: Resolver<T>;
};
