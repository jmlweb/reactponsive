import React from 'react';

import { storiesOf } from '@storybook/react';

import storyInfoDecorator from '../storyInfoDecorator';
import useToggler from './useToggler';
import Provider from '../Provider';

storiesOf('Hooks/useToggle', module)
  .addDecorator(
    storyInfoDecorator({
      title: 'useToggle',
      subtitle: 'Returns true if any of the mq(s) matches or false if not',
      intro: (
        <p>
          Enable strict mode if you want to return true only when all the mqs
          match
        </p>
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
  .addDecorator(storyFn => <Provider>{storyFn()}</Provider>)
  .add('One mq (string)', () => {
    const Component = () => {
      const valueLandscape = useToggler('(orientation: landscape)');
      const valueMinWidth = useToggler('(min-width: 1024px)');
      return (
        <div>
          <div className="box">
            <strong>landscape:</strong> {valueLandscape.toString()}
          </div>
          <div className="box">
            <strong>width > 1024px:</strong> {valueMinWidth.toString()}
          </div>
        </div>
      );
    };
    return <Component />;
  })
  .add('Array of mqs', () => {
    const Component = () => {
      const value = useToggler([
        '(orientation: landscape)',
        '(min-width: 7000px)',
      ]);
      return (
        <div>
          <div className="box">
            <strong>landscape or width > 7000px:</strong> {value.toString()}
          </div>
        </div>
      );
    };
    return <Component />;
  })
  .add('Strict mode', () => {
    const Component = () => {
      const value = useToggler(
        ['(orientation: landscape)', '(min-width: 7000px)'],
        true,
      );
      return (
        <div>
          <div className="box">
            <strong>landscape and width > 7000px:</strong> {value.toString()}
          </div>
        </div>
      );
    };
    return <Component />;
  })
  .add('Dark mode', () => {
    const Component = () => {
      const darkModeEnabled = useToggler(['(prefers-color-scheme: dark)']);
      return (
        <div className="box">
          Dark mode enabled? {darkModeEnabled ? 'true' : 'false'}
        </div>
      );
    };
    return <Component />;
  });
