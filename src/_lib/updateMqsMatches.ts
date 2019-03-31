import { Mqs, MqObj } from '../types';

const updateMqsMatches = (mqs: MqObj[], { media, matches }: MediaQueryListEvent) => mqs.map(mq => ({
  ...mq,
  matches: mq.mqString === media ? matches : mq.matches,
}));

export default updateMqsMatches;