const getCleanObjKeys = (obj: {
  [key: string]: any,
}): string[] => Object.keys(obj).filter(v => v !== 'default');

export default getCleanObjKeys;