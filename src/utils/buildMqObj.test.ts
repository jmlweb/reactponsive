import buildMqObj from './buildMqObj';

describe('buildMqObj', () => {
  beforeAll(() => {
    window.matchMedia = jest.fn().mockImplementation(query => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    });
  });
  test('it works', () => {
    const alias = {
      mobile: '(min-width: 320px)',
      desktop: '(min-width: 1024px)',
    };
    const mqs = ['mobile', '(min-width: 728px)', 'desktop'];
    const transformedMqs = mqs.map(buildMqObj(alias));
    expect(transformedMqs).toEqual([
      {
        name: 'mobile',
        value: '(min-width: 320px)',
        matches: false,
      },
      {
        name: '(min-width: 728px)',
        value: '(min-width: 728px)',
        matches: false,
      },
      {
        name: 'desktop',
        value: '(min-width: 1024px)',
        matches: false,
      },
    ]);
  });
});
