import Subject from './Subject';

describe('Subject', () => {
    let subject: Subject<Function>;
    const fn = jest.fn();

    beforeAll(() => {
        subject = Subject.create();
    })
    test('subscribes', () => {
        subject.subscribe(fn);
    });

    test('fn is called when subject notify is called', () => {
        subject.notify('value');
        expect(fn).toHaveBeenCalledTimes(1);
    });

    test('unsubscribes properly', () => {
        subject.unsubscribe(fn);
        subject.notify('value');
        expect(fn).toHaveBeenCalledTimes(1);
    })
})
