import buildReactPonsiveProps from './buildReactPonsiveProps';

describe('buildReactPonsiveProps', () => {
  test('it works', () => {
    const mqs = [
      {
        name: 'mobile',
        value: '(min-width: 320px)',
        matches: false,
      },
      {
        name: '(min-width: 728px)',
        value: '(min-width: 728px)',
        matches: true,
      },
      {
        name: 'desktop',
        value: '(min-width: 1024px)',
        matches: true,
      },
    ];
    expect(buildReactPonsiveProps(mqs)).toEqual({
      first: '(min-width: 728px)',
      last: 'desktop',
      matches: {
        mobile: false,
        '(min-width: 728px)': true,
        desktop: true,
      },
      passes: ['(min-width: 728px)', 'desktop'],
    });
  });
});
