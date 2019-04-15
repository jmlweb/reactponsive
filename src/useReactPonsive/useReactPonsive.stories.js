import React from 'react';

import { storiesOf } from '@storybook/react';

import useReactPonsive from './useReactPonsive';
import storyInfoDecorator from '../storyInfoDecorator';

storiesOf('Hooks', module)
  .addDecorator(
    storyInfoDecorator({
      title: 'useReactPonsive',
      subtitle:
        'Takes an array of media query strings and returns useful info about them',
      intro: (
        <>
          <p>The properties returned by ReactPonsive are:</p>
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
      ],
    }),
  )
  .add('useReactPonsive', () => {
    const MyComp = () => {
      const { first, last, matches, passes } = useReactPonsive([
        '(min-width: 768px)',
        '(min-width: 1024px)',
        '(min-width: 1280px)',
      ]);
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
    return <MyComp />;
  });
