const tail = <T>(arr: T[]): T | undefined => arr.length ? arr[arr.length - 1] : undefined;

export default tail;
