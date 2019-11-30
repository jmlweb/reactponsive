/* tslint:disable react-hooks-nesting */

import {
  generateMatchMediaMock,
  renderHookWithProvider
} from '../../testUtils';

import useMapper from './useMapper';

const { updateBreakpoint } = generateMatchMediaMock();

updateBreakpoint('(min-width: 1024px)', true);

describe('useToggler', () => {
  test('gets value for active mq', () => {
    const { result } = renderHookWithProvider(() =>
      useMapper({
        tablet: 'tablet',
        desktop: 'desktop'
      })
    );
    expect(result.current).toBe('desktop');
  });
  test('works in "first" mode', () => {
    const { result } = renderHookWithProvider(() =>
      useMapper(
        {
          tablet: 'tablet',
          desktop: 'desktop'
        },
        'first'
      )
    );
    expect(result.current).toBe('tablet');
  });
  test('returns default if needed', () => {
    const { result } = renderHookWithProvider(() =>
      useMapper({
        'default': 'default',
        '(min-width: 2048px)': 'big screen'
      })
    );
    expect(result.current).toBe('default');
  });
});
