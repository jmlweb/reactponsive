import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';

import useReactPonsiveToggle from './useReactPonsiveToggle';
import { generateMatchMediaMock } from '../testUtils';

generateMatchMediaMock();

describe('useReactPonsiveToggle', () => {
  afterEach(cleanup);
  test('it throws when no mq is passed', () => {
    console.error = jest.fn();
    expect(() => {
      // @ts-ignore
      useReactPonsiveToggle();
    }).toThrow();
  });
  test('it works without strict', () => {
    const MyComp = () => {
      const value = useReactPonsiveToggle([
        '(min-width: 400px)',
        '(min-width: 768px)',
        '(min-width: 1024px)',
      ]);
      return <div data-testid="reactponsive" data-value={value} />;
    };
    const element = <MyComp />;
    const { getByTestId } = render(element);
    expect(getByTestId('reactponsive').getAttribute('data-value')).toBe('true');
  });
  test('it works with strict', () => {
    const MyComp = () => {
      const value = useReactPonsiveToggle(
        ['(min-width: 400px)', '(min-width: 768px)', '(min-width: 1024px)'],
        true,
      );
      return <div data-testid="reactponsive" data-value={value} />;
    };
    const element = <MyComp />;
    const { getByTestId } = render(element);
    expect(getByTestId('reactponsive').getAttribute('data-value')).toBe(
      'false',
    );
  });
});
