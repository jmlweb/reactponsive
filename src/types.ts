export type Result = {
  [key: string]: boolean;
};
export type Fn = (result: Result) => void;

export type Mqs = string[];

export interface IAlias {
  [key: string]: string;
}

export interface IContext {
  alias: IAlias,
  subscribe: (mqs: Mqs, fn: Fn) => () => void,
}
