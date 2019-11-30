import { useEffect, useState } from 'react';

import { Aliases, ReadOnlyObject } from '../../types';
import { useReactPonsiveContext, head, tail, castArray, toObjWithFn } from '../../_lib';

type MatchesObj<T extends string> = Record<T, boolean>;

interface Results {
  matches: MatchesObj<string>;
  passes: string[];
  ['first']?: any;
  ['last']?: any;
}

const mqStrMatches = (mq: string) => window.matchMedia(mq).matches;

const getInitialState = (mqs: string[]) => toObjWithFn(mqStrMatches, mqs);

const buildStatus = <T extends string>(mqs: T[], alias: Aliases<T>, results: MatchesObj<T>) => mqs.map(mq => {
    const value = alias[mq] || mq;
    return {
        name: mq,
        value,
        matches: results[value],
    };
})

const useInfo = <T extends string>(mq: T | T[]): ReadOnlyObject<Results> => {
    if (!mq) {
        throw 'You need to provide a media query string or an array of media query strings';
    }
    const mqs = castArray(mq);
    const { alias, subscribe } = useReactPonsiveContext();
    const normalizedMqs = mqs.map(v => alias[v] || v);
    const [results, setResults] = useState<MatchesObj<string>>(() => getInitialState(normalizedMqs));

    useEffect(() => {
        const updateResults = (resultsObj: MatchesObj<T>) => {
            setResults(prevResults => ({
                ...prevResults,
                ...resultsObj,
            }));
        };
        const unsubscribe = subscribe(normalizedMqs, updateResults);
        return unsubscribe;
    }, []);

    const status = buildStatus(mqs, alias, results);

    const { matches, passes } = status.reduce((acc, { name, matches }) => {
      const newMatchesObj = {
        ...acc.matches,
        [name]: matches,
      };
      if (!matches) {
        return {
          ...acc,
          matches: newMatchesObj,
        };
      }
      return {
        matches: newMatchesObj,
        passes: [...acc.passes, name],
      }
    }, {
      matches: {} as MatchesObj<T>,
      passes: [] as string[],
    });
    const first = head(passes);
    const last = tail(passes);

    return { matches, passes, first, last };
};

export default useInfo;
