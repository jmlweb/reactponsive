import { MqObj } from '../types';

const updateMqsMatches = (mqs: MqObj[], { media, matches }: MediaQueryListEvent) => mqs.map(mq => mq.value === media ? ({
  ...mq,
  matches,
}) : mq);

export default updateMqsMatches;