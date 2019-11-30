import { render } from '@testing-library/react';
import { renderHook, RenderHookOptions } from '@testing-library/react-hooks';
import React from 'react';

import Provider from './components/Provider';
import { IHasAliases } from './types';

type F<MqStr> = (query: MqStr) => MediaQueryListEvent;

export const TABLET = '(min-width: 768px)';
export const DESKTOP = '(min-width: 1024px)';

const defaultAlias = {
  tablet: TABLET,
  desktop: DESKTOP
};

export const generateMatchMediaMock = <
  MqStr extends string,
  Value extends boolean
>(
  initialState?: Record<MqStr, Value>
) => {
  const values = new Map(
    Object.entries(
      initialState || {
        [TABLET]: true,
        [DESKTOP]: false
      }
    )
  );
  const listeners = new Map();

  const updateBreakpoint = (key: MqStr, value: Value) => {
    values.set(key, value);
    const fn = listeners.get(key);
    if (fn) {
      fn({
        media: key,
        matches: value
      });
    }
  };

  window.matchMedia = jest.fn().mockImplementation((query: MqStr) => ({
    matches: values.get(query) === true,
    media: query,
    onchange: null,
    addListener: (fn: F<MqStr>) => listeners.set(query, fn),
    removeListener: jest.fn(() => listeners.delete(query))
  }));

  return {
    updateBreakpoint
  };
};

export const renderWithProvider = (
  ui: any,
  { alias, ...options }: Partial<IHasAliases> = {
    alias: defaultAlias
  }
) =>
  render(ui, {
    ...options,
    // @ts-ignore
    wrapper: ({ children }) => <Provider alias={alias}>{children}</Provider>
  });

export const renderHookWithProvider = (
  callback: (props?: unknown) => unknown,
  {
    alias,
    ...options
  }: Partial<IHasAliases> & {
    options?: RenderHookOptions<{}>;
  } = {
    alias: defaultAlias
  }
) =>
  renderHook(callback, {
    ...options,
    // @ts-ignore
    wrapper: ({ children }) => <Provider alias={alias}>{children}</Provider>
  });
