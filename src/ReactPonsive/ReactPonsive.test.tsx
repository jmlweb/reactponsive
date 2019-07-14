import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import AliasProvider from '../AliasProvider';
import ReactPonsive from './ReactPonsive';
import { ChildrenProps, Mqs } from '../types';
import { generateMatchMediaMock } from '../testUtils';

generateMatchMediaMock();

const mqs = ['(min-width: 400px)', '(min-width: 728px)', 'desktop'];
const mqs2 = ['(min-width: 400px)', '(min-width: 960px)'];

describe('ReactPonsive', () => {
  afterEach(cleanup);
  test('it throws when no mqs prop is passed', () => {
    console.error = jest.fn();
    const element = (
      // @ts-ignore
      <ReactPonsive>{() => <div />}</ReactPonsive>
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
      <div data-testid="reactponsive">{`${first}${last}`}</div>
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
    expect(getByTestId('reactponsive')).toHaveTextContent(
      '(min-width: 400px)desktop',
    );
    render(getElementWithMqs(mqs2), { container });
    expect(getByTestId('reactponsive')).toHaveTextContent(
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
            <div data-testid="reactponsive">{`${first}${last}`}</div>
          )}
        </ReactPonsive>
      </AliasProvider>
    );
    const { getByTestId } = render(element);
    expect(getByTestId('reactponsive')).toHaveTextContent(
      '(min-width: 400px)desktop',
    );
  });
});
