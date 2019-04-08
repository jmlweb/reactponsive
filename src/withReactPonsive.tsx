import * as React from 'react';

import ReactPonsive from './ReactPonsive';
import { Mqs, PropsMapper } from './types';
import { extractDisplayName } from './utils';

const withReactPonsive = (mqs: Mqs, propsMapper?: PropsMapper) => <
  OriginalProps extends {}
>(
  ExternalComponent: React.ComponentType<OriginalProps>,
): React.ComponentClass<OriginalProps & {}> => {
  const componentDisplayName = extractDisplayName(ExternalComponent);

  class ReactPonsiveHOC extends React.Component<OriginalProps> {
    static displayName = `withReactPonsive(${componentDisplayName})`;

    render() {
      return (
        <ReactPonsive
          mqs={mqs}
          propsMapper={propsMapper}
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
