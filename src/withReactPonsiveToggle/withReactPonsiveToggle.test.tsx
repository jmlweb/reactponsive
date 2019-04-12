import * as React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import withReactPonsiveToggle from './withReactPonsiveToggle';
import { generateMatchMediaMock } from '../testUtils';

generateMatchMediaMock();

const MyComp = () => <div>foo</div>;

const mqs = ['(min-width: 400px)', '(min-width: 768px)', '(min-width: 1024px)'];

describe('withReactPonsive', () => {
  afterEach(cleanup);
  test('it throws when no mq is passed', () => {
    console.error = jest.fn();
    expect(() => {
      // @ts-ignore
      withReactPonsiveToggle()(MyComp);
    }).toThrow();
  });
  test('it returns the content', () => {
    const EnhancedMyComp = withReactPonsiveToggle(mqs)(MyComp);
    const element = (
      <div data-testid="reactponsive">
        <EnhancedMyComp />
      </div>
    );
    const { getByTestId } = render(element);
    expect(getByTestId('reactponsive')).toHaveTextContent('foo');
  });
  test('it returns null', () => {
    const EnhancedMyComp = withReactPonsiveToggle(mqs, true)(MyComp);
    const element = (
      <div data-testid="reactponsive">
        <EnhancedMyComp />
      </div>
    );
    const { getByTestId } = render(element);
    expect(getByTestId('reactponsive')).toHaveTextContent('foo');
  });
});
