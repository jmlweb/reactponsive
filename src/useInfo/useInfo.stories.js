import React from 'react';

import { storiesOf } from '@storybook/react';

import Provider from '../Provider';
import useInfo from './useInfo';
import storyInfoDecorator from '../storyInfoDecorator';

storiesOf('Hooks', module)
  .addDecorator(
    storyInfoDecorator({
      title: 'useAlias',
      subtitle: 'Get the alias created in ReactPonsiveProvided',
    }),
  )
  .add('useInfo', () => {
    const MyComponent2 = ({ results }) => {
      console.log(results);
      return (
        <div className="box">
          <strong>results:</strong> {JSON.stringify(results, null, 2)}
        </div>
      );
    };
    const MyComponent = () => {
      const results = useInfo(['(min-width: 768px)']);
      return <MyComponent2 results={results} />;
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
