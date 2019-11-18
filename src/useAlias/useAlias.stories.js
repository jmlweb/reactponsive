import React from 'react';

import { storiesOf } from '@storybook/react';

import Provider from '../Provider';
import useAlias from './useAlias';
import storyInfoDecorator from '../storyInfoDecorator';

storiesOf('Hooks', module)
  .addDecorator(
    storyInfoDecorator({
      title: 'useAlias',
      subtitle: 'Get the alias created in ReactPonsiveProvided',
    }),
  )
  .add('useAlias', () => {
    const MyComponent = () => {
      const alias = useAlias();
      return (
        <div className="box">
          <strong>alias:</strong> {JSON.stringify(alias, null, 2)}
        </div>
      );
    };

    return (
      <>
        <Provider
          alias={{
            tablet: '(min-width: 768px)',
            desktop: '(min-width: 1024px)',
          }}
        >
          <div>
            <MyComponent />
          </div>
        </Provider>
      </>
    );
  });
