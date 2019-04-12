import * as React from 'react';

import { Mode, ValuesObj } from '../types';
import { getCleanObjKeys, pick } from '../utils';

import ReactPonsive from '../ReactPonsive';

interface Props {
  /** Object with media query string as keys */
  mqs: ValuesObj;
  /**
   * In "first" mode, it returns the first value whose key matches instead of the last
   *
   * @default 'last'
   **/
  mode?: Mode;
}

/**
 * Renders the last Component whose key (representing a media query string) matches.
 * If not, renders the value for "default" or null.
 */
export const ReactPonsiveValue: React.FunctionComponent<Props> = ({
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
