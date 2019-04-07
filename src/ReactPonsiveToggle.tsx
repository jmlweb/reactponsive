import * as React from 'react';

import ReactPonsive from './ReactPonsive';
import { castArray, pickPasses } from './utils';

interface Props {
  mq: string | string[];
  children: React.ReactNode;
  strict?: Boolean;
}

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
