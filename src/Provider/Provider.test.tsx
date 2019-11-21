import React, { useContext } from 'react';
import { render } from '@testing-library/react';

import Provider from './Provider';
import Context from '../_lib/Context';

describe('ReactPonsiveProvider', () => {
  test('It works without passing aliases', () => {
    const InnerComp = () => <div>InnerComponent</div>;
    const element = (
      <Provider>
        <InnerComp />
      </Provider>
    );
    const { getByText } = render(element);
    expect(getByText('InnerComponent')).toBeInTheDocument();
  });
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
});
