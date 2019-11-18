import { Mqs, Fn } from '../types';

type Fns = Fn[];

const Subscription = () => {
    let data: {
        [key: string]: {
            fns: Fns,
            mq: MediaQueryList,
        };
    } = {};
    const notifyChanges = (e: MediaQueryListEvent) => {
        const { media, matches } = e;
        const result = {
            [media]: matches,
        };
        data[media].fns.forEach(fn => fn(result));
    }
    return (mqs: Mqs, fn: Fn) => {
        data = {
            ...data,
            ...mqs.reduce((acc, curr) => {
                let currObj = data[curr];
                if (!currObj) {
                    currObj = {
                        fns: [fn],
                        mq: window.matchMedia(curr),
                    };
                    currObj.mq.addListener(notifyChanges);
                } else {
                    currObj = {
                        ...currObj,
                        fns: [...currObj.fns, fn],
                    };
                }
                return ({
                    ...acc,
                    [curr]: currObj,
                });
            }, {}),
        };
        const unsubscribe = () => {
            data = Object.keys(data).reduce((acc, curr) => {
                if (data[curr].fns.length === 1) {
                    data[curr].mq.removeListener(notifyChanges);
                    return acc;
                }
                return {
                    ...acc,
                    [curr]: {
                        ...data[curr],
                        fns: data[curr].fns.filter(item => item !== fn)
                    },
                }
            }, {});
        };
        return unsubscribe;
    };
}

export default Subscription;
