import { useEffect, useState } from 'react';

import { castArray, head, tail, toObjWithFn, useReactPonsiveContext } from '../../_lib';
import { Aliases, ReadOnlyObject } from '../../types';

type MatchesObj<T extends string> = Record<T, boolean>;

interface IResults {
  matches: MatchesObj<string>;
  passes: string[];
  ['first']?: any;
  ['last']?: any;
}

const mqStrMatches = (mq: string) => window.matchMedia(mq).matches;

const getInitialState = (mqs: string[]) => toObjWithFn(mqStrMatches, mqs);

const buildStatus = <T extends string>(mqs: T[], alias: Aliases<T>, results: MatchesObj<T>) => mqs.map((mq) => {
    const value = alias[mq] || mq;
    return {
        matches: results[value],
        name: mq,
        value,
    };
});

const validate = (mqs: string[]) => !mqs.find((v) => typeof v !== 'string');

const useInfo = <T extends string>(mq: T | T[]): ReadOnlyObject<IResults> => {
    if (!mq) {
      throw new Error('You need to provide a media query string or an array of media query strings');
    }

    const mqs = castArray(mq);

    if (!validate(mqs)) {
      throw new Error('One or more of the media query strings received is not a valid strings');
    }

    const { alias, subscribe } = useReactPonsiveContext();
    const normalizedMqs = mqs.map((v) => alias[v] || v);
    const [results, setResults] = useState<MatchesObj<string>>(() => getInitialState(normalizedMqs));

    useEffect(() => {
            const updateResults = (resultsObj: MatchesObj<T>) => {
                setResults((prevResults) => ({
                    ...prevResults,
                    ...resultsObj,
                }));
            };
            const unsubscribe = subscribe(normalizedMqs, updateResults);
            return unsubscribe;
        }, []);

    const status = buildStatus(mqs, alias, results);

    const { matches, passes } = status.reduce((acc, curr) => {
          const newMatchesObj = {
            ...acc.matches,
            [curr.name]: curr.matches,
          };
          if (!curr.matches) {
            return {
              ...acc,
              matches: newMatchesObj,
            };
          }
          return {
            matches: newMatchesObj,
            passes: [...acc.passes, curr.name],
          };
        }, {
          matches: {} as MatchesObj<T>,
          passes: [] as string[],
        });
    const first = head(passes);
    const last = tail(passes);

    return { matches, passes, first, last };
};

export default useInfo;
