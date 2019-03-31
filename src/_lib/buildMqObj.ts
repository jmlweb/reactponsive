import { MqObj } from '../types';

const buildMqObj = (mqString: string): MqObj => {
  const mq = window.matchMedia(mqString);
  return {
    matches: mq.matches,
    mq,
    mqString,
  }
}

export default buildMqObj;