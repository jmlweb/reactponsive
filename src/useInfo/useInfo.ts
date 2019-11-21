import { useEffect, useState } from 'react';

import useReactPonsiveContext from '../_lib/useReactPonsiveContext';
import { Aliases } from '../types';
import head from '../_lib/head';
import tail from '../_lib/tail';
import castArray from '../_lib/castArray';

type MatchesObj<T extends string> = Record<T, boolean>;


const getInitialState = <T extends string>(parsedMqs: T[]) => parsedMqs.reduce((acc, curr) => ({
    ...acc,
    [curr]: window.matchMedia(curr).matches,
}), {});

const buildStatus = <T extends string>(mqs: T[], alias: Aliases<T>, results: MatchesObj<T>) => mqs.map(mq => {
    const value = alias[mq] || mq;
    return {
        name: mq,
        value,
        matches: results[value],
    };
})

const useInfo = <T extends string>(mq: T | T[]) => {
    if (!mq) {
        throw 'You need to provide a media query string or an array of media query strings';
    }
    const mqs = castArray(mq);
    const { alias, subscribe } = useReactPonsiveContext();
    const parsedMqs = mqs.map(v => alias[v] || v);
    const [results, setResults] = useState<MatchesObj<string>>(() => getInitialState(parsedMqs));

    useEffect(() => {
        const updateResults = (resultsObj: MatchesObj<T>) => setResults(prevResults => ({
            ...prevResults,
            ...resultsObj,
        }));
        const unsubscribe = subscribe(parsedMqs, updateResults);
        return unsubscribe;
    }, []);

    const status = buildStatus(mqs, alias, results);

    const matches = status.reduce((acc, { name, matches }) => ({
        ...acc,
        [name]: matches,
    }), {});
    const matchesArrObj = status.filter(v => v.matches);
    const passes = matchesArrObj.map(v => v.name);
    const first = head(passes);
    const last = tail(passes);

    const info = { matches, passes, first, last };

    return info;
};

export default useInfo;
