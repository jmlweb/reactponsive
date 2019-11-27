import useInfo from '../useInfo';
import { FirstLastMode } from '../../types';

const useMapper = <T>(mqsObj: Record<string, T>, mode: FirstLastMode = 'last'): T | null => {
    const mqs = Object.keys(mqsObj).filter(v => v !== 'default');
    const { first, last } = useInfo(mqs);
    const selectedMqString = mode === 'first' ? first : last;
    if (!selectedMqString) {
        return mqsObj.default || null;
    }
    return mqsObj[selectedMqString];
};

export default useMapper;
