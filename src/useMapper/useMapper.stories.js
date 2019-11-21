import React from 'react';

import { storiesOf } from '@storybook/react';

import useMapper from './useMapper';
import storyInfoDecorator from '../storyInfoDecorator';
import providerDecorator from '../providerDecorator';

storiesOf('Hooks/useMapper', module)
  .addDecorator(
    storyInfoDecorator({
      title: 'useMapper',
      subtitle:
        'Returns the last value of the object whose key (representing a media query string) matches',
      intro: (
        <>
          <p>
            If there is no matching mq, returns the value for "default" or null
          </p>
          <p>If you want to take the first mq, pass "first" as mode</p>
        </>
      ),
      argsInfo: [
        {
          name: 'mqs',
          required: 'true',
          type: 'object',
          description: 'Object with media query string as keys',
        },
        {
          name: 'mode',
          required: 'false',
          type: '"first" | "last"',
          description:
            'In "first" mode, it returns the first value whose key matches instead of the last one',
        },
      ],
    }),
  )
  .addDecorator(providerDecorator())
  .add('last mode (default)', () => {
    const byDefault = 'Default';
    const tablet = '> 768px';
    const desktop = '> 1024px';

    const mqs = {
      default: byDefault,
      '(min-width: 768px)': tablet,
      '(min-width: 1024px)': desktop,
    };

    const Component = () => {
      const value = useMapper(mqs);
      return <div className="box">{value}</div>;
    };
    return <Component />;
  })
  .add('first mode', () => {
    const byDefault = 'Default';
    const tablet = '> 768px';
    const landscape = 'landscape';

    const mqs = {
      default: byDefault,
      '(min-width: 768px)': tablet,
      '(orientation: landscape)': landscape,
    };

    const Component = () => {
      const value = useMapper(mqs, 'first');
      return <div className="box">{value}</div>;
    };
    return <Component />;
  });
