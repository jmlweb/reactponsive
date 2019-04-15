import * as React from 'react';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';

import useReactPonsive from './useReactPonsive';
import { generateMatchMediaMock } from '../testUtils';

generateMatchMediaMock();

const MyComp = () => {
  const rpValues = useReactPonsive([
    '(min-width: 400px)',
    '(min-width: 768px)',
    '(min-width: 1024px)',
  ]);
  return <div data-testid="reactponsive" {...rpValues} />;
};

describe('useReactPonsive', () => {
  test('it works', () => {
    const element = <MyComp />;
    const { getByTestId } = render(element);
    expect(getByTestId('reactponsive').attributes).toMatchSnapshot();
  });
});
