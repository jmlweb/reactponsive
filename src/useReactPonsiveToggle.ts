import useReactPonsive from './useReactPonsive';

import { castArray } from './utils';

const useReactPonsiveToggle = (
  mq: string | string[],
  strict: Boolean = false,
): Boolean => {
  if (!mq) {
    throw 'You need to provide a media query string or an array of media query strings';
  }
  const mqs = castArray(mq);
  const { passes } = useReactPonsive(mqs);
  if (!passes.length || (strict && passes.length < mqs.length)) {
    return false;
  }
  return true;
};

export default useReactPonsiveToggle;
