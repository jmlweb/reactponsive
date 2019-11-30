import React, { cloneElement, ReactElement } from 'react';

import { getCleanMqsKeys } from '../../_lib';
import { useInfo } from '../../hooks';

const Filter = ({ mqs }: { mqs: Record<string, ReactElement> }) => {
  const cleanKeys = getCleanMqsKeys(mqs);
  const { passes } = useInfo(cleanKeys);
  const initialValue: ReactElement[] = [];
  const validElements = passes.reduce((acc, mqKey) => [...acc, cloneElement(mqs[mqKey], { key: mqKey })], initialValue);

  if (validElements.length > 0) {
    return <>{validElements}</>;
  }
  if (mqs.default) {
    return mqs.default;
  }
  return null;
};

export default Filter;
