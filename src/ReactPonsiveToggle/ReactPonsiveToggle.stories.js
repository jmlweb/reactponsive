import React from 'react';

import { storiesOf } from '@storybook/react';

import ReactPonsiveToggle from './ReactPonsiveToggle';

storiesOf('Components', module).add('ReactPonsiveToggle', () => (
  <div className="story">
    <ReactPonsiveToggle mq="(orientation: landscape)">
      <div className="box">This should be displayed in landscape</div>
    </ReactPonsiveToggle>
    <ReactPonsiveToggle mq="(orientation: portrait)">
      <div className="box">This should be displayed in portrait</div>
    </ReactPonsiveToggle>
    <ReactPonsiveToggle mq="(min-width: 320px)">
      <div className="box">This should be displayed from 320px</div>
    </ReactPonsiveToggle>
    <ReactPonsiveToggle mq="(min-width: 768px)">
      <div className="box">This should be displayed from 768px</div>
    </ReactPonsiveToggle>
    <ReactPonsiveToggle mq="(min-width: 1024px)">
      <div className="box">This should be displayed from 1024px</div>
    </ReactPonsiveToggle>
    <ReactPonsiveToggle mq="(min-resolution: 90dpi)">
      <div className="box">This should be displayed from 90dpi</div>
    </ReactPonsiveToggle>
  </div>
));
