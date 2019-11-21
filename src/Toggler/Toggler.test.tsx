import React from 'react';

import { generateMatchMediaMock, renderWithProvider } from '../testUtils';

import Toggler from './Toggler';

generateMatchMediaMock();

describe('Toggler', () => {
  test('shows the component when needed', () => {
    const { getByText } = renderWithProvider(
      <Toggler mq="tablet">
        <div>Tablet</div>
      </Toggler>,
    );
    expect(getByText('Tablet')).toBeInTheDocument();
  });
  test('hides the component when needed', () => {
    const { queryByText } = renderWithProvider(
      <Toggler mq="desktop">
        <div>Desktop</div>
      </Toggler>,
    );
    expect(queryByText('Desktop')).not.toBeInTheDocument();
  });
});
