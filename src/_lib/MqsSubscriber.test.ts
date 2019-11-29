import MqsSubscriber from './MqsSubscriber';
import { MqFn } from './MqDispatcher';
import { TABLET, DESKTOP, generateMatchMediaMock } from '../testUtils';

const { updateBreakpoint } = generateMatchMediaMock();

describe('MqsSubscriber', () => {
    let subscribe: (mqs: string[], fn: MqFn) => () => void;
    let unsubscribe: () => void;
    let unsubscribe2: () => void;
    const fn = jest.fn();
    const fn2 = jest.fn();

    jest.useFakeTimers();

    beforeAll(() => {
        subscribe = MqsSubscriber.createSubscribe();
        unsubscribe = subscribe([TABLET, DESKTOP], fn);
    });

    test('it works', () => {
        updateBreakpoint(DESKTOP, true);
        jest.runAllTimers();
        expect(fn).toHaveBeenCalledWith({
            [DESKTOP]: true,
        });
    });
    test('handles new subscriptions to the same media queries', () => {
        unsubscribe2 = subscribe([TABLET, DESKTOP], fn2);
        updateBreakpoint(TABLET, false);
        jest.runAllTimers();
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
