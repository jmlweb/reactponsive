import * as React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import AliasProvider from './AliasProvider';
import Context from '../Context';

describe('AliasProvider', () => {
  afterEach(cleanup);
  test('it works', () => {
    const element = (
      <AliasProvider
        alias={{
          foo: 'bar',
        }}
      >
        <Context.Consumer>
          {alias => <div data-testid="alias">{alias.foo}</div>}
        </Context.Consumer>
      </AliasProvider>
    );
    const { getByTestId } = render(element);
    expect(getByTestId('alias')).toHaveTextContent('bar');
  });
});
