import { useEffect, useState } from 'react';

import { Aliases } from '../../types';
import { useReactPonsiveContext, head, tail, castArray } from '../../_lib';

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
        const updateResults = (resultsObj: MatchesObj<T>) => {
            setResults(prevResults => {
                const newResults = ({
                    ...prevResults,
                    ...resultsObj,
                });
                return newResults;
            });
        };
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
