import { getCleanMqsKeys } from '../../_lib';
import { Modes } from '../../types';
import useInfo from '../useInfo';

type UseMapper = <T>(mqs: Record<string, T>, mode?: Modes ) => T | null;

const useMapper: UseMapper = (mqs, mode = 'last') => {
  const cleanKeys = getCleanMqsKeys(mqs);
  const info = useInfo(cleanKeys);
  const selectedMq = info[mode];
  if (selectedMq) {
    return mqs[selectedMq];
  }
  return mqs.default || null;
};

export default useMapper;
