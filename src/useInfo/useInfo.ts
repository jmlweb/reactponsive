import { useContext, useEffect, useState } from 'react';

import Context from '../Context';
import { Mqs } from '../types';

const useInfo = (mqs: Mqs) => {
    const { alias, subscribe } = useContext(Context);
    const initialState = mqs.map(v => (alias && alias[v]) || v).reduce((acc, curr) => ({
        ...acc,
        [curr]: window.matchMedia(curr).matches,
    }), {});
    const [returned, setReturned] = useState(initialState);
    useEffect(() => {
        if (subscribe && alias) {
            const parsedMqs = mqs.map(v => alias[v] || v);
            const unsubscribe = subscribe(parsedMqs, console.log);
            return unsubscribe;
        }
    }, []);
    // useEffect(() => {
    //     if (results && Object.keys(results).length > 0 && JSON.stringify(results) !== JSON.stringify(returned)) {
    //         console.log('DIFERENTE');
    //         console.log(results, returned);
    //         setReturned(results);
    //     }
    // }, [results]);
    return returned;
};

export default useInfo;
