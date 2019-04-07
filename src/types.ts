import * as React from 'react';

export interface MqObj {
  name: string;
  value: string;
  matches: boolean;
}

export interface ValuesObj {
  [key: string]: any;
}

export interface Matches {
  [key: string]: boolean;
}

export type Mqs = string[];

export interface Alias {
  [key: string]: string;
}

export interface ChildrenProps {
  matches: Matches;
  passes: Mqs;
  first: string | undefined;
  last: string | undefined;
}

export type PropsMapper = (
  x: ChildrenProps,
) => {
  [key: string]: any;
};

export interface ReactPonsiveProps {
  mqs: Mqs;
  component?:
    | React.ComponentType<{
        [key: string]: any;
      }>
    | React.ReactNode;
  children?: (childrenProps: { [key: string]: any }) => React.ReactNode;
  propsMapper?: PropsMapper;
}

export type Mode = 'first' | 'last';
