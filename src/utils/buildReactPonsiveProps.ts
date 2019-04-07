import { Matches, MqObj, Mqs } from '../types';

import head from './head';
import tail from './tail';

const matchesReducer = (acc: Matches, { name, matches }: MqObj): Matches => ({
  ...acc,
  [name]: matches,
});

const getReactPonsiveProps = (mqs: MqObj[]) => {
  const matches: Matches = mqs.reduce(matchesReducer, {});
  const matchesArrObj: MqObj[] = mqs.filter(v => v.matches);
  const passes: Mqs = matchesArrObj.map(v => v.name);
  const first = head(passes);
  const last = tail(passes);
  return { matches, passes, first, last };
};

export default getReactPonsiveProps;
