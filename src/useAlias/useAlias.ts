import useReactPonsiveContext from '../_lib/useReactPonsiveContext';

const useAlias = () => {
    const { alias } = useReactPonsiveContext();
    return alias;
};

export default useAlias;
