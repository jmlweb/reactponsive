import Subject from './Subject';

export type MqFn = (x: MediaQueryListEvent) => void;

class Notifier<T extends MqFn> {
    private subject: Subject<Function> = Subject.create();
    private matchMedia: MediaQueryList;
    private timeoutHolder?: any;
    private delay: number;

    static create(mq: string) {
        return new Notifier(mq);
    }

    private constructor(mq: string, delay: number = 0) {
        this.matchMedia = window.matchMedia(mq);
        this.delay = delay;
    }

    isEmpty = () => {
        return this.subject.getFns().length === 0;
    }

    delayedNotify = (x: any) => {
        clearTimeout(this.timeoutHolder);
        this.timeoutHolder = setTimeout(() => {
            this.subject.notify(x);
        }, this.delay);
    }

    subscribe = (fn: T) => {
        if (this.isEmpty()) {
            this.matchMedia.addListener(this.subject.notify);
        }
        this.subject.subscribe(fn);
    }

    unsubscribe = (fn: T) => {
        this.subject.unsubscribe(fn);
        if (this.isEmpty()) {
            this.matchMedia.removeListener(this.subject.notify);
        }
    }
}

export default Notifier;
