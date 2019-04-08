import * as RP from '.';

describe('index file', () => {
  test('snapshot', () => {
    expect(RP).toMatchSnapshot();
  });
});
