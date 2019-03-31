import * as React from 'react';

import { Mqs } from './types';
import { castArray, extractDisplayName } from './_lib';
import ReactPonsive from './ReactPonsive';

const withReactPonsiveToggle = (mq: string | Mqs, strict: Boolean = false) => <
  OriginalProps extends object
>(
  ExternalComponent: React.ComponentType<OriginalProps>,
): React.ComponentClass<OriginalProps> => {
  if (!mq) {
    throw 'You must supply a media query string or an array of media query strings';
  }
  const mqs = castArray(mq);

  const componentDisplayName = extractDisplayName(ExternalComponent);

  class ReactPonsiveToggleHOC extends React.Component<OriginalProps> {
    static displayName = `withReactPonsiveToggle(${componentDisplayName})`;

    render() {
      return (
        <ReactPonsive
          mqs={mqs}
          component={({ matchesArr }) =>
            !matchesArr.length ||
            (strict && matchesArr.length < mqs.length) ? null : (
              <ExternalComponent {...this.props} />
            )
          }
        />
      );
    }
  }

  return ReactPonsiveToggleHOC;
};

export default withReactPonsiveToggle;
