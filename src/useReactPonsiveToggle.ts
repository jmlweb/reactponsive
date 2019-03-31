import useReactPonsive from './useReactPonsive';

import { castArray } from './_lib';

const useReactPonsiveToggle = (mq: string | string[], strict: Boolean = false): Boolean => {
  const mqs = castArray(mq);
  const { matchesArr } = useReactPonsive(mqs);
  if (!matchesArr.length || (strict && matchesArr.length < mqs.length)) {
    return false;
  }
  return true;
} 

export default useReactPonsiveToggle;