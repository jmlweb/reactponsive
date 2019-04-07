import * as React from 'react';

import { Mode, ValuesObj } from './types';
import { getCleanObjKeys, pick } from './utils';

import ReactPonsive from './ReactPonsive';

interface Props {
  mqs: ValuesObj;
  mode?: Mode;
}

const ReactPonsiveValue: React.FunctionComponent<Props> = ({
  mqs,
  mode = 'last',
}) => {
  const mqsArr = getCleanObjKeys(mqs);
  return (
    <ReactPonsive mqs={mqsArr} propsMapper={pick(['first', 'last'])}>
      {({ first, last }) => {
        const mqString = mode === 'first' ? first : last;
        const mqValue = mqs[mqString];
        return mqValue || mqs.default || null;
      }}
    </ReactPonsive>
  );
};

export default ReactPonsiveValue;
