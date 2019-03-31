import useReactPonsive from './useReactPonsive';

import { Mode } from './types';
import { getCleanObjKeys } from './_lib';

const useReactPonsiveValue = (mqsObj: {
  [key: string]: any,
}, mode: Mode = 'last') => {
  const mqs = getCleanObjKeys(mqsObj);
  const { first, last } = useReactPonsive(mqs);
  const mqString = mode === 'first' ? first : last;
  const mqValue = mqsObj[mqString];
  return mqValue || mqsObj.default;
}

export default useReactPonsiveValue;