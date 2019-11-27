import useInfo from '../useInfo';

const useToggler = (mq: string | string[], strict: Boolean = false): Boolean => {
    const { passes } = useInfo(mq);

    const passesAreEqualMqs = passes.length === (Array.isArray(mq) ? mq.length : 1);
    const isNotStrictOrPassesAreEqualMqs = (!strict || passesAreEqualMqs)

    return (passes.length > 0 && isNotStrictOrPassesAreEqualMqs);
}

export default useToggler;
