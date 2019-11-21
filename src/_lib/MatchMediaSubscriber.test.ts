import MatchMediaSubscriber from './MatchMediaSubscriber';

import { generateMatchMediaMock } from '../testUtils';

const TABLET = '(min-width: 768px)';
const DESKTOP = '(min-width: 1024px)';

const { updateBreakpoint, getListeners } = generateMatchMediaMock({
    [TABLET]: true,
    [DESKTOP]: false,
});

describe('MatchMediaSubscriber', () => {
    const subscribe = MatchMediaSubscriber.create();
    test('it works', () => {
        const fn = jest.fn();
        const unsubscribe = subscribe([TABLET, DESKTOP], fn);
        updateBreakpoint(DESKTOP, true);
        expect(fn).toHaveBeenCalled();
        unsubscribe();
        expect(getListeners().length).toBe(0);
        // it works even with an object structure
        unsubscribe();
    });
})
