interface Fn <T>{
  (x: T): unknown;
}

const toObjWithFn = <T extends string>(fn: Fn<T>, keys: T[]) => keys.reduce((acc, curr) => ({
  ...acc,
  [curr]: fn(curr),
}), {});

export default toObjWithFn;
