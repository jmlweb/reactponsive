import * as React from 'react';

import Context from '../Context';
import { extractDisplayName } from '../utils';
import { Alias } from '../types';

interface AliasProps {
  alias: Alias;
}

const withAlias = <OriginalProps extends {}>(
  ExternalComponent: React.ComponentType<OriginalProps & AliasProps>,
): React.ComponentClass<OriginalProps> => {
  const componentDisplayName = extractDisplayName(ExternalComponent);

  class ReactPonsiveHOC extends React.Component<OriginalProps> {
    static displayName = `withAlias(${componentDisplayName})`;

    static contextType = Context;

    render() {
      return (
        <ExternalComponent
          {...this.props as OriginalProps}
          alias={this.context}
        />
      );
    }
  }

  return ReactPonsiveHOC;
};

export default withAlias;
