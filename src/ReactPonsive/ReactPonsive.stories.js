import React from 'react';

import { storiesOf } from '@storybook/react';

import ReactPonsive from './ReactPonsive';
import storyInfoDecorator from '../storyInfoDecorator';

const MyComp = ({ first, last, matches, passes }) => (
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
MyComp.displayName = 'MyComp';

storiesOf('Render Props/ReactPonsive', module)
  .addDecorator(
    storyInfoDecorator({
      title: 'ReactPonsive',
      subtitle:
        'Takes an array of media query strings and returns useful info about them',
      intro: (
        <>
          <p>You must supply children or component prop</p>
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
      propsInfo: [
        {
          name: 'mqs',
          required: 'yes',
          type: 'string[]',
          description: 'Array of media query strings or alias',
        },
        {
          name: 'children',
          required: 'false*',
          type: 'function',
          description:
            'A function receiving an object, with the properties defined below',
        },
        {
          name: 'component',
          required: 'false*',
          type: 'ReactComponent',
          description: 'A component receiving the properties defined below',
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
  .add('Children as a function', () => (
    <>
      <ReactPonsive
        mqs={[
          '(min-width: 768px)',
          '(min-width: 1024px)',
          '(min-width: 1280px)',
        ]}
      >
        {({ first, last, matches, passes }) => (
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
        )}
      </ReactPonsive>
    </>
  ))
  .add('Component', () => {
    return (
      <>
        <ReactPonsive
          mqs={[
            '(min-width: 768px)',
            '(min-width: 1024px)',
            '(min-width: 1280px)',
          ]}
          component={MyComp}
        />
      </>
    );
  })
  .add('propsMapper', () => {
    return (
      <>
        <ReactPonsive
          mqs={[
            '(min-width: 768px)',
            '(min-width: 1024px)',
            '(min-width: 1280px)',
          ]}
          propsMapper={({ passes }) => ({ passesLength: passes.length })}
        >
          {({ passesLength }) => (
            <div className="box">
              <strong>passesLength:</strong> {passesLength}
            </div>
          )}
        </ReactPonsive>
      </>
    );
  });
