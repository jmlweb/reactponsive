import * as React from 'react';

import ReactPonsive from './ReactPonsive';
import { ChildrenProps, Mqs } from './types';
import { extractDisplayName } from './_lib';

const withReactPonsive = (mqs: Mqs) => <OriginalProps extends {}>(
  ExternalComponent: React.ComponentType<OriginalProps & ChildrenProps>,
): React.ComponentClass<OriginalProps> => {
  if (!mqs || !Array.isArray(mqs)) {
    throw 'You must supply an array of media query strings';
  }
  const componentDisplayName = extractDisplayName(ExternalComponent);

  class ReactPonsiveHOC extends React.Component<OriginalProps> {
    static displayName = `withReactPonsive(${componentDisplayName})`;

    render() {
      return (
        <ReactPonsive
          mqs={mqs}
          component={childrenProps => (
            <ExternalComponent {...this.props} {...childrenProps} />
          )}
        />
      );
    }
  }

  return ReactPonsiveHOC;
};

export default withReactPonsive;
