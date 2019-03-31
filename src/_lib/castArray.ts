const castArray = (x: any | any[]): any[] => Array.isArray(x) ? x : [x];

export default castArray;