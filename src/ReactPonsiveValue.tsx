import * as React from 'react';

import { Mode } from './types';
import { getCleanObjKeys } from './_lib';

import ReactPonsive from './ReactPonsive';

interface Props {
  mqs: {
    [key: string]: any,
  },
  mode?: Mode,
}

const ReactPonsiveValue: React.FunctionComponent<Props> = ({ mqs, mode = 'last' }) => {
  const mqsArr = getCleanObjKeys(mqs);
  return (
    <ReactPonsive mqs={mqsArr}>
      {({ first, last }) => {
        const mqString = mode === 'first' ? first : last;
        const mqValue = mqs[mqString];
        return mqValue || mqs.default || null;
      }}
    </ReactPonsive>
  )
}

export default ReactPonsiveValue;