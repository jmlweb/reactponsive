const castArray = <T>(x: T[] | T): T[] => Array.isArray(x) ? x : [x];

export default castArray;
