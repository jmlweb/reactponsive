import {
  generateMatchMediaMock,
  renderHookWithProvider,
} from "../../testUtils";

import useFilter from './useFilter';

generateMatchMediaMock();

describe('useToggler', () => {
    test('Filters the values whose media query keys are active', () => {
        const mqs = {
            tablet: 'tablet',
            desktop: 'desktop',
        };
        const { result } = renderHookWithProvider(() => useFilter(mqs));
        expect(result.current).toEqual(['tablet']);
    });
    test('Returns an empty array if there is no media query matching', () => {
        const mqs = {
            desktop: 'desktop',
        };
        const { result } = renderHookWithProvider(() => useFilter(mqs));
        expect(result.current).toEqual([]);
    })
})
