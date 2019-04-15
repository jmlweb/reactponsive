import React from 'react';

import { storiesOf } from '@storybook/react';

import AliasProvider from '../AliasProvider';
import withAlias from './withAlias';
import storyInfoDecorator from '../storyInfoDecorator';

storiesOf('HOCs', module)
  .addDecorator(
    storyInfoDecorator({
      title: 'withAlias',
      subtitle:
        'Passes the alias created in AliasProvided to the wrapped component',
    }),
  )
  .add('withAlias', () => {
    const MyComponent = ({ alias }) => (
      <div className="box">
        <strong>alias:</strong> {JSON.stringify(alias, null, 2)}
      </div>
    );

    const MyComponentWithAlias = withAlias(MyComponent);

    return (
      <>
        <AliasProvider
          alias={{
            tablet: '(min-width: 768px)',
            desktop: '(min-width: 1024px)',
          }}
        >
          <div>
            <MyComponentWithAlias />
          </div>
        </AliasProvider>
      </>
    );
  });
