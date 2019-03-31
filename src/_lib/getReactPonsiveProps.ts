import { Matches, MatchesArr, MqObj, Mqs } from '../types';

import head from './head';
import tail from './tail';

const matchesReducer = (acc: Matches, { mqString, matches }: MqObj): Matches => ({
  ...acc,
  [mqString]: matches,
});

const getReactPonsiveProps = (mqs: MqObj[]) => {
  const matches: Matches = mqs.reduce(matchesReducer, {});
    const matchesArrObj: MqObj[] = mqs.filter(v => v.matches);
    const matchesArr: MatchesArr = matchesArrObj.map(v => v.matches);
    const passes: Mqs = matchesArrObj.map(v => v.mqString);
    const first = head(passes);
    const last = tail(passes);
    return { matches, matchesArr, passes, first, last };
}

export default getReactPonsiveProps;