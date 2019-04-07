import { ValuesObj } from '../types';

const getCleanObjKeys = (obj: ValuesObj): string[] => Object.keys(obj).filter(v => v !== 'default');

export default getCleanObjKeys;