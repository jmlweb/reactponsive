import useInfo from '../useInfo';
import { FirstLastMode } from '../types';

const useMapper = (mqsObj: Record<string, unknown>, mode: FirstLastMode = 'last') => {
    const mqs = Object.keys(mqsObj).filter(v => v !== 'default');
    const { first, last } = useInfo(mqs);
    const selectedMqString = mode === 'first' ? first : last;
    if (!selectedMqString) {
        return mqsObj.default;
    }
    return mqsObj[selectedMqString];
};

export default useMapper;
