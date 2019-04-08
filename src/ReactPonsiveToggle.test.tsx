import * as React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import ReactPonsiveToggle from './ReactPonsiveToggle';
import { generateMatchMediaMock } from './testUtils';

generateMatchMediaMock();

describe('ReactPonsiveToggle', () => {
  afterEach(cleanup);
  test('it throws when no mq prop is passed', () => {
    console.error = jest.fn();
    const element = (
      // @ts-ignore
      <ReactPonsiveToggle>
        <div>foo</div>
      </ReactPonsiveToggle>
    );
    expect(() => {
      render(element);
    }).toThrow();
  });
  test('it renders null when mq is not active', () => {
    const element = (
      <div data-testid="reactponsive">
        <ReactPonsiveToggle mq="(min-width: 320px)">
          <div>foo</div>
        </ReactPonsiveToggle>
      </div>
    );
    const { getByTestId } = render(element);
    expect(getByTestId('reactponsive')).toBeEmpty();
  });
  test('it renders null in strict mode when both mqs are not active', () => {
    const element = (
      <div data-testid="reactponsive">
        <ReactPonsiveToggle
          mq={['(min-width: 400px)', '(min-width: 600px)']}
          strict
        >
          <div>foo</div>
        </ReactPonsiveToggle>
      </div>
    );
    const { getByTestId } = render(element);
    expect(getByTestId('reactponsive')).toBeEmpty();
  });
  test('it renders null in strict mode when both mqs are active', () => {
    const element = (
      <div data-testid="reactponsive">
        <ReactPonsiveToggle
          mq={['(min-width: 400px)', '(min-width: 1024px)']}
          strict
        >
          <div>foo</div>
        </ReactPonsiveToggle>
      </div>
    );
    const { getByTestId } = render(element);
    expect(getByTestId('reactponsive')).toHaveTextContent('foo');
  });
});
