import * as React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import AliasProvider from './AliasProvider';
import ReactPonsive from './ReactPonsive';
import { ChildrenProps, Mqs } from './types';

const isMatching = (query: string) =>
  query === '(min-width: 400px)' || query === '(min-width: 1024px)';

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: isMatching(query),
    media: query,
    onchange: null,
    addListener: jest.fn(x =>
      x({
        media: query,
        matches: isMatching(query),
      }),
    ),
    removeListener: jest.fn(),
  };
});

const mqs = ['(min-width: 400px)', '(min-width: 728px)', 'desktop'];
const mqs2 = ['(min-width: 400px)', '(min-width: 960px)'];

describe('ReactPonsive', () => {
  afterEach(cleanup);
  test('it throws when no mqs prop is passed', () => {
    console.error = jest.fn();
    // @ts-ignore
    const element = (
      <ReactPonsive>
        {props => <div data-testid="foo">{JSON.stringify(props)}</div>}
      </ReactPonsive>
    );
    expect(() => {
      render(element);
    }).toThrow();
  });
  test('it throws when no component or children prop is passed', () => {
    console.error = jest.fn();
    // @ts-ignore
    const element = <ReactPonsive mqs={mqs} />;
    expect(() => {
      render(element);
    }).toThrow();
  });
  test('it works', () => {
    const MyComp = ({ first, last }: ChildrenProps) => (
      <div data-testid="foo">{`${first}${last}`}</div>
    );
    const getElementWithMqs = (selectedMqs: Mqs) => (
      <AliasProvider
        alias={{
          desktop: '(min-width: 1024px)',
        }}
      >
        <ReactPonsive mqs={selectedMqs} component={MyComp} />
      </AliasProvider>
    );
    const element = getElementWithMqs(mqs);
    const { container, getByTestId } = render(element);
    expect(getByTestId('foo')).toHaveTextContent('(min-width: 400px)desktop');
    render(getElementWithMqs(mqs2), { container });
    expect(getByTestId('foo')).toHaveTextContent(
      '(min-width: 400px)(min-width: 400px)',
    );
  });
  test('it maps properly', () => {
    const propsMapper = ({ first, last }: ChildrenProps) => ({ first, last });
    const element = (
      <AliasProvider
        alias={{
          desktop: '(min-width: 1024px)',
        }}
      >
        <ReactPonsive mqs={mqs} propsMapper={propsMapper}>
          {({ first, last }) => (
            <div data-testid="foo">{`${first}${last}`}</div>
          )}
        </ReactPonsive>
      </AliasProvider>
    );
    const { getByTestId } = render(element);
    expect(getByTestId('foo')).toHaveTextContent('(min-width: 400px)desktop');
  });
});
