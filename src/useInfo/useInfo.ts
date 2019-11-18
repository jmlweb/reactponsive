import { useContext, useEffect, useState } from 'react';

import Context from '../Context';
import { Mqs } from '../types';

const useInfo = (mqs: Mqs) => {
    const { alias, subscribe } = useContext(Context);
    const initialState: {
        [key: string]: boolean,
    } = mqs.map(v => (alias && alias[v]) || v).reduce((acc, curr) => ({
        ...acc,
        [curr]: window.matchMedia(curr).matches,
    }), {});
    const [returned, setReturned] = useState(initialState);
    const updateReturned = (v: {
        [key: string]: boolean,
    }) => {
        const newKey = Object.keys(v)[0];
        console.log({
            ...returned,
            [newKey]: v[newKey],
        });
        setReturned({
            ...returned,
            [newKey]: v[newKey],
        });
    };
    useEffect(() => {
        if (subscribe && alias) {
            const parsedMqs = mqs.map(v => alias[v] || v);
            const unsubscribe = subscribe(parsedMqs, updateReturned);
            return unsubscribe;
        }
    }, []);
    return returned;
};

export default useInfo;
