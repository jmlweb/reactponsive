import React from 'react';

import { storiesOf } from '@storybook/react';

import AliasProvider from '../AliasProvider';
import AliasConsumer from './AliasConsumer';
import storyInfoDecorator from '../storyInfoDecorator';

storiesOf('Render props', module)
  .addDecorator(
    storyInfoDecorator({
      title: 'AliasConsumer',
      subtitle: 'Get the alias created in AliasProvided',
    }),
  )
  .add('AliasConsumer', () => (
    <>
      <AliasProvider
        alias={{
          tablet: '(min-width: 768px)',
          desktop: '(min-width: 1024px)',
        }}
      >
        <div>
          <AliasConsumer>
            {alias => (
              <div className="box">
                <strong>alias:</strong> {JSON.stringify(alias, null, 2)}
              </div>
            )}
          </AliasConsumer>
        </div>
      </AliasProvider>
    </>
  ));
