import React from 'react';

import { storiesOf } from '@storybook/react';

import Mapper from './Mapper';
import storyInfoDecorator from '../storyInfoDecorator';
import providerDecorator from '../providerDecorator';

storiesOf('Components/Mapper', module)
  .addDecorator(
    storyInfoDecorator({
      title: 'Mapper',
      subtitle:
        'Renders the last value of the object whose key (representing a media query string) matches',
      intro: (
        <>
          <p>
            If there is no matching mq, renders the value for "default" or null
          </p>
          <p>If you want to take the first mq, pass "first" as mode</p>
        </>
      ),
      propsInfo: [
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
    const zero = <div className="box">Default</div>;
    const first = <div className="box">&gt; 768px</div>;
    const second = <div className="box">&gt; 1024px</div>;
    const mqs = {
      default: zero,
      '(min-width: 768px)': first,
      '(min-width: 1024px)': second,
    };
    return <Mapper mqs={mqs} />;
  })
  .add('first mode', () => {
    const zero = <div className="box">Default</div>;
    const first = <div className="box">&gt; 768px</div>;
    const second = <div className="box">landscape</div>;
    const mqs = {
      default: zero,
      '(min-width: 768px)': first,
      '(orientation: landscape)': second,
    };
    return <Mapper mode="first" mqs={mqs} />;
  });
