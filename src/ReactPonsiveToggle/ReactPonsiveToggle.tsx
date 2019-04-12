import * as React from 'react';

import ReactPonsive from '../ReactPonsive';
import { castArray, pickPasses } from '../utils';

interface Props {
  /** Media query string or array of media query strings */
  mq: string | string[];
  children: React.ReactNode;
  /**
   * In strict mode, all the mqs received must mutch to render the children
   *
   * @default false
   **/
  strict?: Boolean;
}

/**
 * Renders the Component received as children if any of the mq(s) matches.
 * If not, renders null.
 */
const ReactPonsiveToggle: React.FunctionComponent<Props> = ({
  mq,
  children,
  strict = false,
}) => {
  if (!mq) {
    throw 'You need to provide a media query string or an array of media query strings';
  }
  const mqs = castArray(mq);
  return (
    <ReactPonsive mqs={mqs} propsMapper={pickPasses}>
      {({ passes }) => {
        if (!passes.length || (strict && passes.length < mqs.length)) {
          return null;
        }
        return children;
      }}
    </ReactPonsive>
  );
};

export default ReactPonsiveToggle;
