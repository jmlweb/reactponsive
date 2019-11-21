import useInfo from '../useInfo';

const useToggler = (mq: string | string[], strict: Boolean = false) => {
    const { passes } = useInfo(mq);

    const passesAreEqualMqs = passes.length === (Array.isArray(mq) ? mq.length : 1);

    return (passes.length > 0 && (!strict || passesAreEqualMqs));
}

export default useToggler;
