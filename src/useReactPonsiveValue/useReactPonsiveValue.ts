import useReactPonsive from '../useReactPonsive';

import { Mode, ValuesObj } from '../types';
import { getCleanObjKeys } from '../utils';

const useReactPonsiveValue = (mqsObj: ValuesObj, mode: Mode = 'last') => {
  const mqs = getCleanObjKeys(mqsObj);
  const { first, last } = useReactPonsive(mqs);
  const mqString = mode === 'first' ? first : last;
  if (!mqString) {
    return mqsObj.default || null;
  }
  return mqsObj[mqString];
};

export default useReactPonsiveValue;
