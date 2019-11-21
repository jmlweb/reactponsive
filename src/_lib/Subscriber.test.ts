import Subscriber from './Subscriber';

describe('Subscriber', () => {
    const onCreate = jest.fn();
    const onRemove = jest.fn();
    const subscriber = new Subscriber(onCreate, onRemove);
    test('subscriber has proper methods', () => {
        expect(subscriber.subscribe).toBeInstanceOf(Function);
        expect(subscriber.notifyChanges).toBeInstanceOf(Function);
    });
    test('notifyChanges work even with no subscriptions', () => {
        expect(() => subscriber.notifyChanges({ key: 'foo', value: 'bar' })).not.toThrow();
    });
    test('can unsubscribe after subscribe', () => {
        const fn = jest.fn();
        const mqs = ['(min-width: 768px)'];
        const unsubscribe = subscriber.subscribe(mqs, fn);
        expect(onCreate).toHaveBeenCalled();
        subscriber.notifyChanges({ key: mqs[0], value: true });
        expect(fn).toHaveBeenCalled();
        expect(() => unsubscribe()).not.toThrow();
        expect(onRemove).toHaveBeenCalled();
    });
    test('removes only one function if two subscriptions exists for the same key', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const mqs = ['(min-width: 768px)'];
        const unsubscribe1 = subscriber.subscribe(mqs, fn1);
        const unsubscribe2 = subscriber.subscribe(mqs, fn2);
        expect(() => unsubscribe1()).not.toThrow();
        expect(() => unsubscribe2()).not.toThrow();
    });
})
