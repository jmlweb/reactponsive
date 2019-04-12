import * as React from 'react';

import { Mqs } from '../types';
import { castArray, extractDisplayName, pickPasses } from '../utils';
import ReactPonsive from '../ReactPonsive';

/**
 * Renders the wrapped component only if any of the mq(s) matches.
 */
const withReactPonsiveToggle = (
  /** Media query string or array of media query strings */
  mq: string | Mqs,
  /**
   * In strict mode, all the mqs received must mutch to render the children
   *
   * @default false
   **/
  strict: Boolean = false,
) => <OriginalProps extends object>(
  ExternalComponent: React.ComponentType<OriginalProps>,
): React.ComponentClass<OriginalProps> => {
  if (!mq) {
    throw 'You need to provide a media query string or an array of media query strings';
  }
  const mqs = castArray(mq);

  const componentDisplayName = extractDisplayName(ExternalComponent);

  class ReactPonsiveToggleHOC extends React.Component<OriginalProps> {
    static displayName = `withReactPonsiveToggle(${componentDisplayName})`;

    render() {
      return (
        <ReactPonsive
          mqs={mqs}
          propsMapper={pickPasses}
          component={({ passes }) =>
            !passes.length || (strict && passes.length < mqs.length) ? null : (
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
