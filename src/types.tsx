import * as React from 'react';

export interface MqObj {
  matches: boolean,
  mq?: MediaQueryList,
  mqString: string,
}

export interface Matches {
  [key: string]: boolean,
};

export type MatchesArr = boolean[];

export type Mqs = string[];

export interface ChildrenProps {
  matches: Matches,
  passes: Mqs,
  matchesArr: MatchesArr,
  first: string,
  last: string,
};

export interface ReactPonsiveProps {
  mqs: Mqs,
  component?: React.ComponentType<ChildrenProps> | React.ReactNode,
  children?: (childrenProps: ChildrenProps) => React.ReactNode;
}

export type Mode = 'first' | 'last';