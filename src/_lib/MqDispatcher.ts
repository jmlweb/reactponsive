export type MqFn = (x: { [key: string]: boolean }) => void;
export type DestroyFn = () => void;

class MqDispatcher {

  public static of(mq: string, destroy: DestroyFn) {
    return new MqDispatcher(window.matchMedia(mq), destroy);
  }
  private matchMedia: MediaQueryList;
  private destroy: DestroyFn;

  constructor(matchMedia: MediaQueryList, destroy: DestroyFn, private subscriptions: MqFn[] = []) {
    this.matchMedia = matchMedia;
    this.destroy = destroy;
  }

  public subscribe(fn: MqFn) {
    if (this.subscriptions.length === 0) {
      this.matchMedia.addListener(this.dispatch);
    }
    this.subscriptions = [...this.subscriptions, fn];
  }

  public unsubscribe(fn: MqFn) {
    this.subscriptions = this.subscriptions.filter((item) => item !== fn);
    if (this.subscriptions.length === 0) {
      this.matchMedia.removeListener(this.dispatch);
      this.destroy();
    }
  }

  private dispatch = ({ media, matches }: MediaQueryListEvent) => {
    const changes = { [media]: matches };
    for (let i = this.subscriptions.length; i > 0; i--) {
        setTimeout(() => this.subscriptions[i - 1](changes));
    }
  }
}

export default MqDispatcher;
