import Subject from './Subject';

export type MqFn = (x: MediaQueryListEvent) => void;

class Notifier<T extends MqFn> {
    private subject: Subject<Function> = Subject.create();
    private matchMedia: MediaQueryList;

    static create(mq: string) {
        return new Notifier(mq);
    }

    private constructor(mq: string) {
        this.matchMedia = window.matchMedia(mq);
    }

    isEmpty = () => {
        return this.subject.getFns().length === 0;
    }

    subscribe = (fn: T) => {
        if (this.subject.getFns().length === 0) {
            this.matchMedia.addListener(this.subject.notify);
        }
        this.subject.subscribe(fn);
    }

    unsubscribe = (fn: T) => {
        this.subject.unsubscribe(fn);
        if (this.subject.getFns().length === 0) {
            this.matchMedia.removeListener(this.subject.notify);
        }
    }
}

export default Notifier;
