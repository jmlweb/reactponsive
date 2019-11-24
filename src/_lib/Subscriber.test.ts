import Subscriber from './Subscriber';
import { TABLET, DESKTOP, generateMatchMediaMock } from '../testUtils';

const { updateBreakpoint } = generateMatchMediaMock();

describe('Subscriber', () => {
    let subscriber: Subscriber<string>;
    let unsubscribe: () => void;
    const fn = jest.fn();

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
    test('unsubscribes properly', () => {
        unsubscribe();
    })
});
