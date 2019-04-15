import { useState, useEffect } from 'react';

import { Mqs } from '../types';
import { buildMqObj, buildReactPonsiveProps, updateMqsMatches } from '../utils';
import useAlias from '../useAlias';

const useReactPonsive = (mqsStringArr: Mqs) => {
  const alias = useAlias();
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
