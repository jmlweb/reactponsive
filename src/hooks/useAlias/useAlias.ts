import { useReactPonsiveContext } from '../../_lib';

const useAlias = () => {
    const { alias } = useReactPonsiveContext();
    return alias;
};

export default useAlias;
