export type ReadOnlyObject<T> = {
  readonly [K in keyof T]: T[K];
};

export type Result = Record<string, boolean>;
export type Fn = (result: Result) => void;

export type Aliases<T = string> = Record<string, T>;

export interface IHasAliases {
  alias: ReadOnlyObject<Aliases>;
}

export interface IReactPonsiveContext extends IHasAliases {
  subscribe: (mqs: string[], fn: Fn) => () => void;
}

export type Modes = 'first' | 'last';
