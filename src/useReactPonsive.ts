import { useState, useEffect } from 'react';

import { Mqs } from './types';
import { buildMqObj, getReactPonsiveProps, updateMqsMatches } from './_lib';

const useReactPonsive = (mqsStringArr: Mqs) => {
  const initialMqs = mqsStringArr.map(buildMqObj);
  const [mqs, setMqs] = useState(initialMqs);
  useEffect(() => {
    const updateMatches = (e: MediaQueryListEvent) => {
      const newMqs = updateMqsMatches(mqs, e);
      setMqs(newMqs);
    }
    mqs.forEach(mqObj => {
      mqObj.mq.addListener(updateMatches);
    });

    return () => {
      mqs.forEach(mqObj => {
        mqObj.mq.removeListener(updateMatches);
      });
    };
  }, [mqs, setMqs]);

  const props = getReactPonsiveProps(mqs);
  return props;
}

export default useReactPonsive;