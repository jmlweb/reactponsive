import MqDispatcher, { MqFn } from './MqDispatcher';

class MqsSubscriber <T extends string> {

  public static createSubscribe() {
    return new MqsSubscriber().subscribe;
  }
  private subscriptionsMap: Map<T, MqDispatcher> = new Map();

  public subscribe = (mqs: T[], fn: MqFn) => {
    mqs.forEach((mq) => {
      const dispatcher = this.createOrGetDispatcher(mq);
      dispatcher!.subscribe(fn);
    });

    return () => {
      mqs.forEach((mq) => {
        this.subscriptionsMap.get(mq)!.unsubscribe(fn);
      });
    };
  }

  private prepareDestroy(mq: T) {
    return () => {
      this.subscriptionsMap.delete(mq);
    };
  }

  private createOrGetDispatcher(mq: T) {
    if (!this.subscriptionsMap.has(mq)) {
      const destroy = this.prepareDestroy(mq);
      this.subscriptionsMap.set(mq, MqDispatcher.of(mq, destroy));
    }
    return this.subscriptionsMap.get(mq);
  }
}

export default MqsSubscriber;
