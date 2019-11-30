export type ReadOnlyObject<T> = {
  readonly [K in keyof T]: T[K];
}

export type Result = Record<string, boolean>;
export type Fn = (result: Result) => void;

export type Aliases<T = string> = Record<string, T>;

export interface HasAliases {
  alias: ReadOnlyObject<Aliases>,
}

export interface ReactPonsiveContext extends HasAliases {
  subscribe: (mqs: string[], fn: Fn) => () => void,
}

export type First = 'first';
export type Last = 'last';

export type Modes = First | Last;
