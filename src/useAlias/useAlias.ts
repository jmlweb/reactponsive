import { useContext } from 'react';

import Context from '../Context';

const useAlias = () => {
    const { alias } = useContext(Context);
    return alias;
};

export default useAlias;
