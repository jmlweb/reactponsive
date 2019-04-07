import { useContext, useState, useEffect } from 'react';

import { Mqs } from './types';
import Context from './Context';
import { buildMqObj, buildReactPonsiveProps, updateMqsMatches } from './utils';

const useReactPonsive = (mqsStringArr: Mqs) => {
  const alias = useContext(Context);
  const buildMqObjWithAlias = buildMqObj(alias);
  const initialMqs = mqsStringArr.map(buildMqObjWithAlias);
  const [mqs, setMqs] = useState(initialMqs);
  const updateMatches = (e: MediaQueryListEvent) => {
    const newMqs = updateMqsMatches(mqs, e);
    setMqs(newMqs);
  };
  useEffect(() => {
    const mqEvents = mqs.map(({ value }) => {
      const mq = window.matchMedia(value);
      mq.addListener(updateMatches);
      return mq;
    });
    return () => {
      mqEvents.forEach(mq => mq.removeListener(updateMatches));
    };
  }, [mqsStringArr]);
  return buildReactPonsiveProps(mqs);
};

export default useReactPonsive;
