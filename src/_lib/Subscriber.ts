import Notifier, { MqFn } from './Notifier';

export { MqFn };

class Subscriber<T extends string>{
    private mqsNotifiers: Map<T, Notifier<MqFn>> = new Map();

    static create() {
        return new Subscriber();
    }

    private getNotifier = (mq: T) => {
        let notifier = this.mqsNotifiers.get(mq);
        if (!notifier) {
            notifier = Notifier.create(mq);
        }
        return notifier;
    }

    subscribe = (mqs: T[], fn: Function) => {
        const updateFn: MqFn = ({ media, matches }) => {
            const changes = { [media]: matches };
            fn(changes);
        }
        mqs.forEach(mq => {
            this.getNotifier(mq).subscribe(updateFn);
        });
        return () => {
            mqs.forEach(mq => {
                const mqNotifier = this.getNotifier(mq);
                mqNotifier.unsubscribe(updateFn);
                if (mqNotifier.isEmpty()) {
                    this.mqsNotifiers.delete(mq);
                }
            });
        }
    }
}

export default Subscriber;
