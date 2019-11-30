import useInfo from '../useInfo';

const useFilter = (mqs: Record<string, any>): any[] => {
    const mqsKeys = Object.keys(mqs);
    const { passes } = useInfo(mqsKeys);
    return passes.map(key => mqs[key]);
}

export default useFilter;
