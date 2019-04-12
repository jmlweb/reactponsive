import React from 'react';

import { storiesOf } from '@storybook/react';

import AliasProvider from './AliasProvider';
import ReactPonsiveToggle from '../ReactPonsiveToggle';

const alias = {
    tablet: '(min-width: 768px)',
    desktop: '(min-width: 1024px)',
}

storiesOf('Components', module).add('AliasProvider', () => (
<AliasProvider alias={alias}>
  <div className="story">
    <ReactPonsiveToggle mq="tablet">
      <div className="box">> Tablet</div>
    </ReactPonsiveToggle>
    <ReactPonsiveToggle mq="desktop">
      <div className="box">> Desktop</div>
    </ReactPonsiveToggle>
  </div>
</AliasProvider>
));
