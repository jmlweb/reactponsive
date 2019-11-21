export type Result = Record<string, boolean>;
export type Fn = (result: Result) => void;

export type Mqs = string[];

export type Aliases<T = string> = Record<string, T>;

export interface HasAliases {
  alias: Aliases,
}

export interface ReactPonsiveContext extends HasAliases {
  subscribe: (mqs: Mqs, fn: Fn) => () => void,
}

export type FirstLastMode = 'first' | 'last';
