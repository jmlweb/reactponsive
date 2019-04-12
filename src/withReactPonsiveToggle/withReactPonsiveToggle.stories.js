import React from 'react';

import { storiesOf } from '@storybook/react';

import withReactPonsiveToggle from './withReactPonsiveToggle';

const MyComponent = ({ children }) => <div class="box">{children}</div>;

const OnlyLandscape = withReactPonsiveToggle('(orientation: landscape)')(
  MyComponent,
);
const OnlyPortrait = withReactPonsiveToggle('(orientation: portrait)')(
  MyComponent,
);
const LandscapeBiggerThan768 = withReactPonsiveToggle(
  ['(orientation: portrait)', '(min-width: 768px)'],
  true,
)(MyComponent);

storiesOf('HOCs', module).add('withReactPonsiveToggle', () => (
  <div className="story">
    <OnlyLandscape>Landscape</OnlyLandscape>
    <OnlyPortrait>Portrait</OnlyPortrait>
    <LandscapeBiggerThan768>LandscapeBiggerThan768</LandscapeBiggerThan768>
  </div>
));
