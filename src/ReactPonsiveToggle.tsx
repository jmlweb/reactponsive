import * as React from 'react';

import ReactPonsive from './ReactPonsive';
import { castArray } from './_lib';

interface Props {
  mq: string | string[],
  children: React.ReactNode,
  strict?: Boolean,
}

const ReactPonsiveToggle: React.FunctionComponent<Props> = ({ mq, children, strict = false }) => {
  const mqs = castArray(mq);
  return (
    <ReactPonsive mqs={mqs}>
      {({ matchesArr }) => {
        if (!matchesArr.length || (strict && matchesArr.length < mqs.length)) {
          return null;
        }
        return children;
      }}
    </ReactPonsive>
  )
}

export default ReactPonsiveToggle;