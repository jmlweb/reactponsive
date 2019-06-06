import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';

import ReactPonsiveValue from './ReactPonsiveValue';
import { generateMatchMediaMock } from '../testUtils';

generateMatchMediaMock();

const mqs = {
  default: 'default',
  '(min-width: 400px)': '400px',
  '(min-width: 768px)': '768px',
  '(min-width: 1024px)': '1024px',
  '(min-width: 1280px)': '1280px',
};

describe('ReactPonsiveValue', () => {
  afterEach(cleanup);
  test('it returns the last matching mq by default', () => {
    const element = (
      <div data-testid="reactponsive">
        <ReactPonsiveValue mqs={mqs} />
      </div>
    );
    const { getByTestId } = render(element);
    expect(getByTestId('reactponsive')).toHaveTextContent('1024px');
  });
  test('it returns the first matching mq with mode="first"', () => {
    const element = (
      <div data-testid="reactponsive">
        <ReactPonsiveValue mqs={mqs} mode="first" />
      </div>
    );
    const { getByTestId } = render(element);
    expect(getByTestId('reactponsive')).toHaveTextContent('400px');
  });
  test('it returns default', () => {
    const element = (
      <div data-testid="reactponsive">
        <ReactPonsiveValue
          mqs={{
            default: 'default',
            '(min-width: 320px)': '320px',
            '(min-width: 768px)': '768px',
          }}
        />
      </div>
    );
    const { getByTestId } = render(element);
    expect(getByTestId('reactponsive')).toHaveTextContent('default');
  });
  test('it returns null', () => {
    const element = (
      <div data-testid="reactponsive">
        <ReactPonsiveValue
          mqs={{
            '(min-width: 320px)': '320px',
            '(min-width: 768px)': '768px',
          }}
        />
      </div>
    );
    const { getByTestId } = render(element);
    expect(getByTestId('reactponsive')).toBeEmpty();
  });
});
