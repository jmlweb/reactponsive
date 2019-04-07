import { Alias, MqObj } from '../types';

const buildMqObj = (alias: Alias) => (mqString: string): MqObj => {
  const value = alias[mqString] || mqString;
    return ({
      name: mqString,
      value,
      matches: window.matchMedia(value).matches,
    });
}

export default buildMqObj;