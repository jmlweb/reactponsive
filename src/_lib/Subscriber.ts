import { Fn } from '../types';

type OnFn<T extends string> = (x: T) => any;

class Subscriber<T extends string, U extends Fn> {

    private subscriptions: Map<T, U[]>;
    private onCreate: OnFn<T>;
    private onRemove: OnFn<T>;

    constructor(onCreate: OnFn<T>, onRemove: OnFn<T>) {
        this.subscriptions = new Map();
        this.onCreate = onCreate;
        this.onRemove = onRemove;
    }

    private getCurrentFns(key: T) {
        return this.subscriptions.get(key) || [];
    }

    private appendFn(key: T, fn: U) {
        if (!this.subscriptions.has(key)) {
            this.onCreate(key);
        }
        this.subscriptions.set(key, [...this.getCurrentFns(key), fn]);
    }

    private removeFn(key: T, fn: U) {
        const filteredFns = this.getCurrentFns(key).filter(currentFn => currentFn !== fn);
        if (filteredFns.length) {
            this.subscriptions.set(key, filteredFns);
        } else {
            this.subscriptions.delete(key);
            this.onRemove(key);
        }
    }

    subscribe(keys: T[], fn: U) {
        keys.forEach((key) => {
            this.appendFn(key, fn);
        });
        return () => {
            keys.forEach((key) => {
                this.removeFn(key, fn);
            });
        };
    }

    notifyChanges({ key, value }: { key: T, value: any }) {
        const fns = this.subscriptions.get(key);
        if (fns) {
            fns.forEach(fn => fn({ [key]: value }));
        }
    }
}

export default Subscriber;
