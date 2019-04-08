import getCleanObjKeys from './getCleanObjKeys';

describe('getCleanObjKeys', () => {
  test('it works', () => {
    expect(
      getCleanObjKeys({
        default: 'default',
        mobile: 'mobile',
        tablet: 'tablet',
        desktop: 'desktop',
      }),
    ).toEqual(['mobile', 'tablet', 'desktop']);
  });
});
