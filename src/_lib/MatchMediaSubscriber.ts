import { Fn } from '../types';

import Subscriber from './Subscriber';

class MatchMediaSubscriber<T extends string, U extends Fn>{
    private matchMedias: Map<T, MediaQueryList>;
    private subscriber: Subscriber<T, U>;

    constructor() {
        this.matchMedias = new Map();
        this.subscriber = new Subscriber(this.addMatchMedia, this.removeMatchMedia);
    }

    private addMatchMedia = (mq: T) => {
        const newMatchMedia = window.matchMedia(mq);
        newMatchMedia.addListener(this.mqUpdated);
        this.matchMedias.set(mq, window.matchMedia(mq));
    }

    private removeMatchMedia = (mq: T) => {
        const matchMediaToRemove = this.matchMedias.get(mq);
        if (matchMediaToRemove) {
            matchMediaToRemove.removeListener(this.mqUpdated);
            this.matchMedias.delete(mq);
        }
    }

    private mqUpdated = ({ media, matches }: MediaQueryListEvent) => {
        const changes = { key: media, value: matches } as { key: T, value: boolean };
        this.subscriber.notifyChanges(changes);
    }

    subscribe = (mqs: T[], fn: U) => {
        return this.subscriber.subscribe(mqs, fn);
    }

    static create() {
        const subscriber = new MatchMediaSubscriber();
        return subscriber.subscribe;
    }
}

export default MatchMediaSubscriber;
