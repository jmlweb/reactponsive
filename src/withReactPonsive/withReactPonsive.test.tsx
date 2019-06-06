import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';

import withReactPonsive from './withReactPonsive';
import { generateMatchMediaMock } from '../testUtils';

generateMatchMediaMock();

const MyComp = (props: { [key: string]: any }) => (
  <div data-testid="reactponsive" {...props} />
);

describe('withReactPonsive', () => {
  test('it works', () => {
    const EnhancedMyComp = withReactPonsive([
      '(min-width: 400px)',
      '(min-width: 768px)',
      '(min-width: 1024px)',
    ])(MyComp);
    const element = <EnhancedMyComp foo="reactponsive" />;
    const { getByTestId } = render(element);
    expect(getByTestId('reactponsive').attributes).toMatchSnapshot();
  });
});
