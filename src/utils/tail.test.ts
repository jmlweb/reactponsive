import tail from './tail';

describe('castArray', () => {
  test('returns the last item in the array when needed', () => {
    expect(tail(['a', 'b', 'c'])).toEqual('c');
  });
  test('returns undefined when the array is empty', () => {
    expect(tail([])).toBeUndefined();
  });
});