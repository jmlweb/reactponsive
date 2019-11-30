/* tslint:disable react-hooks-nesting */

import { act, renderHook } from '@testing-library/react-hooks';

import {
  DESKTOP,
  generateMatchMediaMock,
  renderHookWithProvider,
  TABLET
} from '../../testUtils';

import useInfo from './useInfo';

const { updateBreakpoint } = generateMatchMediaMock();

jest.useFakeTimers();

describe('useInfo', () => {
  test('throws if no mq passed', () => {
    // @ts-ignore
    const { result } = renderHook(() => useInfo());
    expect(result.error).toEqual(
      Error(
        'You need to provide a media query string or an array of media query strings'
      )
    );
  });
  test('throws if at least one element is not a string', () => {
    // @ts-ignore
    const { result } = renderHook(() => useInfo(['(min-width: 768px)', 34, false]));
    expect(result.error).toEqual(
      Error(
        'One or more of the media query strings received is not a valid strings'
      )
    );
  });
  test('throws if it is not wrapper with a provider', () => {
    const { result } = renderHook(() => useInfo(['(min-width: 400px)']));
    expect(result.error).toEqual(
      Error('You need to wrap your code inside the Provider')
    );
  });
  test('it works without alias', () => {
    const { result } = renderHookWithProvider(() => useInfo([TABLET, DESKTOP]));
    expect(result.current).toEqual({
      first: TABLET,
      last: TABLET,
      matches: { [DESKTOP]: false, [TABLET]: true },
      passes: [TABLET]
    });
  });
  test('it works wit alias', () => {
    const { result } = renderHookWithProvider(() =>
      useInfo(['tablet', 'desktop'])
    );
    expect(result.current).toEqual({
      first: 'tablet',
      last: 'tablet',
      matches: { desktop: false, tablet: true },
      passes: ['tablet']
    });
  });
  test('Updates info when listener calls', () => {
    const { result } = renderHookWithProvider(() => useInfo([TABLET, DESKTOP]));
    act(() => {
      updateBreakpoint(DESKTOP, true);
      jest.runAllTimers();
    });
    expect(result.current).toEqual({
      first: TABLET,
      last: DESKTOP,
      matches: { [DESKTOP]: true, [TABLET]: true },
      passes: [TABLET, DESKTOP]
    });
  });
});
