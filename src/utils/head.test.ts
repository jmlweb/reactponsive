import head from './head';

describe('head', () => {
  test('returns the first item in the array when needed', () => {
    expect(head(['a', 'b', 'c'])).toEqual('a');
  });
  test('returns undefined when the array is empty', () => {
    expect(head([])).toBeUndefined();
  });
});