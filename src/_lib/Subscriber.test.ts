import Subscriber from './Subscriber';
import { TABLET, DESKTOP, generateMatchMediaMock } from '../testUtils';

const { updateBreakpoint } = generateMatchMediaMock();

describe('Subscriber', () => {
    let subscriber: Subscriber<string>;
    let unsubscribe: () => void;
    let unsubscribe2: () => void;
    const fn = jest.fn();
    const fn2 = jest.fn();

    beforeAll(() => {
        subscriber = Subscriber.create();
        unsubscribe = subscriber.subscribe([TABLET, DESKTOP], fn);
    });

    test('it works', () => {
        updateBreakpoint(DESKTOP, true);
        expect(fn).toHaveBeenCalledWith({
            [DESKTOP]: true,
        });
    });
    test('handles new subscriptions to the same media queries', () => {
        unsubscribe2 = subscriber.subscribe([TABLET, DESKTOP], fn2);
        updateBreakpoint(TABLET, false);
        expect(fn).toHaveBeenLastCalledWith({
            [TABLET]: false,
        });
        expect(fn2).toHaveBeenCalledWith({
            [TABLET]: false,
        });
    });
    test('unsubscribes properly', () => {
        unsubscribe();
        unsubscribe2();
    })
});
