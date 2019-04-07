import * as React from 'react';
import extractDisplayName from './extractDisplayName';

describe('extractDisplayName', () => {
  test('displayName prop', () => {
    const Foo = () => <div>Foo</div>;
    Foo.displayName = 'FooName';
    expect(extractDisplayName(Foo)).toBe('FooName');
  });
  test('Component Name', () => {
    const Foo = () => <div>Bar</div>;
    expect(extractDisplayName(Foo)).toBe('Foo');
  });
  test('constructor name', () => {
    expect(extractDisplayName(() => <div />)).toBe('Function');
  });
});