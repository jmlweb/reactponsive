import React from 'react';

import { storiesOf } from '@storybook/react';

import ReactPonsiveToggle from './ReactPonsiveToggle';
import storyInfoDecorator from '../storyInfoDecorator';

storiesOf('Components/ReactPonsiveToggle', module)
  .addDecorator(
    storyInfoDecorator({
      title: 'ReactPonsiveToggle',
      subtitle:
        'Renders the Component received as children if any of the mq(s) matches',
      intro: (
        <p>
          Enable strict mode if you want the component to render only when all
          the mqs match
        </p>
      ),
      propsInfo: [
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
        {
          name: 'children',
          required: 'true',
          type: 'ReactNode',
          description: '',
        },
      ],
    }),
  )
  .add('One mq (string)', () => (
    <>
      <ReactPonsiveToggle mq="(orientation: landscape)">
        <div className="box">This should be displayed in landscape</div>
      </ReactPonsiveToggle>
      <ReactPonsiveToggle mq="(orientation: portrait)">
        <div className="box">This should be displayed in portrait</div>
      </ReactPonsiveToggle>
      <ReactPonsiveToggle mq="(min-width: 320px)">
        <div className="box">This should be displayed from 320px width</div>
      </ReactPonsiveToggle>
      <ReactPonsiveToggle mq="(min-width: 768px)">
        <div className="box">This should be displayed from 768px width</div>
      </ReactPonsiveToggle>
      <ReactPonsiveToggle mq="(min-width: 1024px)">
        <div className="box">This should be displayed from 1024px width</div>
      </ReactPonsiveToggle>
      <ReactPonsiveToggle mq="(min-resolution: 90dpi)">
        <div className="box">This should be displayed from 90dpi</div>
      </ReactPonsiveToggle>
    </>
  ))
  .add('Array of mqs', () => (
    <>
      <ReactPonsiveToggle
        mq={['(orientation: portrait)', '(min-width: 320px)']}
      >
        <div className="box">
          This should be displayed if portrait or width > 320px
        </div>
      </ReactPonsiveToggle>
    </>
  ))
  .add('Strict mode', () => (
    <>
      <ReactPonsiveToggle
        mq={['(orientation: portrait)', '(min-width: 320px)']}
        strict
      >
        <div className="box">
          This should be displayed if portrait and width > 320px
        </div>
      </ReactPonsiveToggle>
    </>
  ));
