import { useContext } from 'react';
import Context from './Context';

const useReactPonsiveContext = () => {
    const context = useContext(Context);
    if (!context.alias && !context.subscribe) {
        throw new Error('You need to wrap your code inside the Provider');
    }
    return context;
};

export default useReactPonsiveContext;
