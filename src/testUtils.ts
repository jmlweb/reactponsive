export const generateMatchMediaMock = () => {
  const isMatching = (query: string) =>
    query === '(min-width: 400px)' || query === '(min-width: 1024px)';

  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: isMatching(query),
      media: query,
      onchange: null,
      addListener: jest.fn(x =>
        x({
          media: query,
          matches: isMatching(query),
        }),
      ),
      removeListener: jest.fn(),
    };
  });
};
