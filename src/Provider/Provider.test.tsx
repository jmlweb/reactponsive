import React, { useContext, useEffect } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Provider from './Provider';
import Context from '../Context';

describe('ReactPonsiveProvider', () => {
  test('It passes alias by context', () => {
    const InnerComp = () => {
      const { alias } = useContext(Context);
      return alias ? (
        <div>
          {alias.sm}
          {alias.md}
        </div>
      ) : null;
    };
    const element = (
      <Provider
        alias={{
          sm: '(min-width: 400px)',
          md: '(min-width: 768px)',
        }}
      >
        <InnerComp />
      </Provider>
    );
    const { getByText } = render(element);
    expect(
      getByText('(min-width: 400px)(min-width: 768px)'),
    ).toBeInTheDocument();
  });
  test('It passes a subscribe function, which returns an unsubscribe function', () => {
    const InnerComp = () => {
      const { subscribe } = useContext(Context);
      let result;
      useEffect(() => {
        if (subscribe) {
          result = subscribe(['(min-width: 400px)'], jest.fn());
        }
      }, []);
      return <div>{typeof subscribe === 'function' && 'Allright'}</div>;
    };
    const element = (
      <Provider>
        <InnerComp />
      </Provider>
    );
    const { getByText } = render(element);
    expect(getByText('Allright')).toBeInTheDocument();
  });
});
