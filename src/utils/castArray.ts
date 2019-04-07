const castArray = <T extends any | any[]>(x: T): any[] => Array.isArray(x) ? x : [x];

export default castArray;