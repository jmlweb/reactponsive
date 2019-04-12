import React from 'react';

import { storiesOf } from '@storybook/react';

import ReactPonsiveValue from './ReactPonsiveValue';

storiesOf('Components', module).add('ReactPonsiveValue', () => {
  const zero = <div className="box">Default</div>;
  const first = <div className="box">&gt; 768px</div>;
  const second = <div className="box">&gt; 1024px</div>;
  const mqs = {
    default: zero,
    '(min-width: 768px)': first,
    '(min-width: 1024px)': second,
  };
  return (
    <div className="story">
      <ReactPonsiveValue mqs={mqs} />
    </div>
  );
});
