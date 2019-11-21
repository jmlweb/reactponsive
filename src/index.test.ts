import * as RP from '.';

describe('index file', () => {
  test('snapshot', () => {
    expect(RP).toHaveProperty('Provider');
    expect(RP).toHaveProperty('Toggler');
    expect(RP).toHaveProperty('Mapper');
    expect(RP).toHaveProperty('useAlias');
    expect(RP).toHaveProperty('useInfo');
    expect(RP).toHaveProperty('useMapper');
    expect(RP).toHaveProperty('useToggler');
  });
});
