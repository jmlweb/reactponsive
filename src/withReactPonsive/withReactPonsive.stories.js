import React from 'react';

import { storiesOf } from '@storybook/react';

import withReactPonsive from './withReactPonsive';
import storyInfoDecorator from '../storyInfoDecorator';

storiesOf('HOCs/withReactPonsive', module)
  .addDecorator(
    storyInfoDecorator({
      title: 'withReactPonsive',
      subtitle:
        'Takes an array of media query strings and passes useful info about them to the wrapped component',
      intro: (
        <>
          <p>The properties passed by ReactPonsive are:</p>
          <ul>
            <li>
              <strong>first:</strong> The first matching query string or alias
              or undefined.
            </li>
            <li>
              <strong>last:</strong> The last matching query string or alias or
              undefined.
            </li>
            <li>
              <strong>matches:</strong> An object, having the query strings or
              aliases as properties, and the results of the match as values.
            </li>
            <li>
              <strong>passes:</strong> An array containing only the matching
              query strings or aliases.
            </li>
          </ul>
        </>
      ),
      argsInfo: [
        {
          name: 'mqs',
          required: 'yes',
          type: 'string[]',
          description: 'Array of media query strings or alias',
        },
        {
          name: 'propsMapper',
          required: 'false',
          type: 'function',
          description:
            'A function which receives the original props object and can return a different one (i.e. for performance reasons you can omit some of them)',
        },
      ],
    }),
  )
  .add('default', () => {
    const MyComp = ({ first, last, matches, passes }) => {
      return (
        <div>
          <div className="box">
            <strong>first:</strong> {first}
          </div>
          <div className="box">
            <strong>last:</strong> {last}
          </div>
          <div className="box">
            <strong>matches:</strong> {JSON.stringify(matches, null, 2)}
          </div>
          <div className="box">
            <strong>passes:</strong> {passes.join(',')}
          </div>
        </div>
      );
    };
    const EnhancedMyComp = withReactPonsive([
      '(min-width: 768px)',
      '(min-width: 1024px)',
      '(min-width: 1280px)',
    ])(MyComp);
    return <EnhancedMyComp />;
  })
  .add('propsMapper', () => {
    const MyComp = ({ passesLength }) => {
      return (
        <div>
          <div className="box">
            <strong>passesLength:</strong> {passesLength}
          </div>
        </div>
      );
    };
    const EnhancedMyComp = withReactPonsive(
      ['(min-width: 768px)', '(min-width: 1024px)', '(min-width: 1280px)'],
      ({ passes }) => ({ passesLength: passes.length }),
    )(MyComp);
    return <EnhancedMyComp />;
  });
