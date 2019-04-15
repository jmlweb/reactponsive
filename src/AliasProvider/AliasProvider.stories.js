import React from 'react';
import { storiesOf } from '@storybook/react';

import AliasProvider from './AliasProvider';
import ReactPonsiveToggle from '../ReactPonsiveToggle';
import storyInfoDecorator from '../storyInfoDecorator';

const alias = {
  tablet: '(min-width: 768px)',
  desktop: '(min-width: 1024px)',
};

storiesOf('Components', module)
  .addDecorator(
    storyInfoDecorator({
      title: 'AliasProvider',
      subtitle:
        'Define your alias with this provider, and use them later in your components',
      propsInfo: [
        {
          name: 'alias',
          required: 'true',
          type: 'boolean',
          description:
            'Object with alias as keys and media query string as values',
        },
      ],
    }),
  )
  .add('AliasProvider', () => (
    <AliasProvider alias={alias}>
      <>
        <ReactPonsiveToggle mq="tablet">
          <div className="box">> Tablet</div>
        </ReactPonsiveToggle>
        <ReactPonsiveToggle mq="desktop">
          <div className="box">> Desktop</div>
        </ReactPonsiveToggle>
      </>
    </AliasProvider>
  ));
