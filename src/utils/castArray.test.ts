import castArray from './castArray';

describe('castArray', () => {
  test('wraps a string in an array', () => {
    expect(castArray('a')).toEqual(['a']);
  });
  test('wraps null in an array', () => {
    expect(castArray(null)).toEqual([null]);
  });
  test('wraps undefined in an array', () => {
    expect(castArray(undefined)).toEqual([undefined]);
  });
  test('returns the same array', () => {
    const arr = ['a']
    expect(castArray(arr)).toBe(arr);
  });
});