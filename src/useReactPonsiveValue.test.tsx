import * as React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import useReactPonsiveValue from './useReactPonsiveValue';
import { generateMatchMediaMock } from './testUtils';

generateMatchMediaMock();

const mqs = {
  default: 'default',
  '(min-width: 400px)': '400px',
  '(min-width: 768px)': '768px',
  '(min-width: 1024px)': '1024px',
};

describe('useReactPonsiveValue', () => {
  afterEach(cleanup);
  test('it returns the last', () => {
    const MyComp = () => {
      const value = useReactPonsiveValue(mqs);
      return <div data-testid="reactponsive" data-value={value} />;
    };
    const element = <MyComp />;
    const { getByTestId } = render(element);
    expect(getByTestId('reactponsive').getAttribute('data-value')).toBe(
      '1024px',
    );
  });
  test('it returns the first', () => {
    const MyComp = () => {
      const value = useReactPonsiveValue(mqs, 'first');
      return <div data-testid="reactponsive" data-value={value} />;
    };
    const element = <MyComp />;
    const { getByTestId } = render(element);
    expect(getByTestId('reactponsive').getAttribute('data-value')).toBe(
      '400px',
    );
  });
  test('it returns the default', () => {
    const MyComp = () => {
      const value = useReactPonsiveValue({
        default: 'default',
        '(min-width: 768px)': '768px',
      });
      return <div data-testid="reactponsive" data-value={value} />;
    };
    const element = <MyComp />;
    const { getByTestId } = render(element);
    expect(getByTestId('reactponsive').getAttribute('data-value')).toBe(
      'default',
    );
  });
  test('it returns null', () => {
    const MyComp = () => {
      const value = useReactPonsiveValue({
        '(min-width: 768px)': '768px',
      });
      return <div data-testid="reactponsive" data-value={value} />;
    };
    const element = <MyComp />;
    const { getByTestId } = render(element);
    expect(getByTestId('reactponsive').getAttribute('data-value')).toBe(null);
  });
});
