import React from 'react';

import { storiesOf } from '@storybook/react';

import withReactPonsiveToggle from './withReactPonsiveToggle';
import storyInfoDecorator from '../storyInfoDecorator';

storiesOf('HOCs/withReactPonsiveToggle', module)
  .addDecorator(
    storyInfoDecorator({
      title: 'withReactPonsiveToggle',
      subtitle: 'Renders the Component wrapped if any of the mq(s) matches',
      intro: (
        <>
          <p>
            Enable strict mode if you want the component to render only when all
            the mqs match
          </p>
        </>
      ),
      argsInfo: [
        {
          name: 'mq',
          required: 'true',
          type: 'string | string[]',
          description: 'Media query string or array of media query strings',
        },
        {
          name: 'strict',
          required: 'false',
          type: 'boolean',
          description:
            'In strict mode, all the mqs received must mutch to render the children',
        },
      ],
    }),
  )
  .add('withReactPonsiveToggle', () => {
    const MyComponent = ({ children }) => <div className="box">{children}</div>;

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
    return (
      <>
        <OnlyLandscape>Landscape</OnlyLandscape>
        <OnlyPortrait>Portrait</OnlyPortrait>
        <LandscapeBiggerThan768>LandscapeBiggerThan768</LandscapeBiggerThan768>
      </>
    );
  });
