import React from 'react';
import { storiesOf } from '@storybook/react';

import Provider from './Provider';
import Toggler from '../Toggler';
import storyInfoDecorator from '../storyInfoDecorator';

const alias = {
  tablet: '(min-width: 768px)',
  desktop: '(min-width: 1024px)',
};

storiesOf('Components', module)
  .addDecorator(
    storyInfoDecorator({
      title: 'Provider',
      subtitle: 'You must wrap your hooks and components with this Provider.',
      intro:
        'It is possible also to pass an "alias" prop, so you can reference your media queries with them later',
      propsInfo: [
        {
          name: 'alias',
          required: 'true',
          type: 'boolean',
          description:
            'Object with alias as keys and media query string as values',
        },
      ],
    }),
  )
  .add('Provider', () => (
    <Provider alias={alias}>
      <>
        <Toggler mq="tablet">
          <div className="box">> Tablet</div>
        </Toggler>
        <Toggler mq="desktop">
          <div className="box">> Desktop</div>
        </Toggler>
      </>
    </Provider>
  ));
