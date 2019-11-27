import useInfo from '../useInfo';

const useFilter = <T extends any, U extends Record<string, T>>(mqs: U): T[] => {
    const { passes } = useInfo(Object.keys(mqs));
    return passes.map(key => mqs[key]);
}

export default useFilter;
