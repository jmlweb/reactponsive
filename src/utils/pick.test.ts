import pick from './pick';

describe('pick', () => {
  test('it works', () => {
    expect(
      pick(['a', 'c'])({
        a: 'foo',
        b: 'bar',
        c: 'baz',
      }),
    ).toEqual({
      a: 'foo',
      c: 'baz',
    });
  });
});
