import { useEffect, useState, useRef } from 'react';

const useListeners = (subscriptions: string[]) => {
    const initialSubscriptions: { [key: string]: MediaQueryList } = {};
    const subscriptionsRef = useRef(initialSubscriptions);
    const initialState = Object.keys(subscriptions).reduce((acc, curr) => ({
        ...acc,
        [curr]: window.matchMedia(curr).matches,
    }), {});
    const [results, setResults] = useState(initialState);
    const updateMatches = (e: MediaQueryListEvent) => {
        const { media, matches } = e;
        const newResults = {
            ...results,
            [media]: matches,
        };
        setResults(newResults);
    };
    useEffect(() => {
        const filteredSubscriptions: { [key: string]: MediaQueryList } = Object.keys(subscriptionsRef.current).reduce((acc, curr) => {
            const currentSubscription = subscriptionsRef.current[curr];
            if (!subscriptions.includes(curr)) {
                currentSubscription.removeListener(updateMatches);
                return acc;
            }
            return {
                ...acc,
                [curr]: currentSubscription,
            };
        }, {});
        const newSubscriptions = subscriptions.filter(v => !filteredSubscriptions[v]).reduce((acc, curr) => {
            const mq = window.matchMedia(curr);
            mq.addListener(updateMatches);
            return {
                ...acc,
                [curr]: mq,
            };
        }, {});
        if (Object.keys(filteredSubscriptions).length !== subscriptions.length || Object.keys(newSubscriptions).length > 0) {
            subscriptionsRef.current = {
                ...filteredSubscriptions,
                ...newSubscriptions,
            };
            const newResults = Object.keys(subscriptionsRef.current).reduce((acc, curr) => {
                if (subscriptionsRef.current[curr]) {
                    return {
                        ...acc,
                        [curr]: subscriptionsRef.current[curr].matches,
                    };
                }
                return acc;
            }, {});
            setResults(newResults);
        }
    }, [subscriptions]);
    return results;
}

export default useListeners;
