import Notifier, { MqFn } from './Notifier';

import { generateMatchMediaMock } from '../testUtils';

const TABLET = '(min-width: 768px)';

const { updateBreakpoint } = generateMatchMediaMock({
    [TABLET]: false,
});

describe('Notifier', () => {
    let matchMediaSubject: Notifier<MqFn>;
    const fn = jest.fn();
    const fn2 = jest.fn();

    beforeAll(() => {
        matchMediaSubject = Notifier.create(TABLET);
    });

    test('fn is called after subscribes', () => {
        matchMediaSubject.subscribe(fn);
        matchMediaSubject.subscribe(fn2);
        updateBreakpoint(TABLET, true);
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn2).toHaveBeenCalledTimes(1);
    });
    test('unsubscribes', () => {
        updateBreakpoint(TABLET, false);
        expect(fn).toHaveBeenCalledTimes(2);
        expect(fn2).toHaveBeenCalledTimes(2);
        matchMediaSubject.unsubscribe(fn);
        updateBreakpoint(TABLET, true);
        expect(fn).toHaveBeenCalledTimes(2);
        expect(fn2).toHaveBeenCalledTimes(3);
        matchMediaSubject.unsubscribe(fn2);
    });
})
