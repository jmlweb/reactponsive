import { useReducer, useCallback, useMemo } from 'react';
import { Mqs } from '../types';

interface IState {
  [x: string]: number
}

interface IAction {
  type: string;
  payload: Mqs,
}

const initialState: IState = {};

const subscribe = (state: IState, mqs: Mqs) => ({
  ...state,
  ...mqs.reduce((acc, curr) => ({
    ...acc,
    [curr]: state[curr] ? state[curr] + 1 : 1,
  }), {})
});

const unsubscribe = (state: IState, mqs: Mqs) => Object.keys(state).reduce((acc, curr) => {
  const newValue = mqs.includes(curr) ? state[curr] - 1 : state[curr];
  return newValue < 1 ? acc : {
    ...acc,
    [curr]: newValue,
  };
}, {})

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'subscribe':
      return subscribe(state, action.payload);
    case 'unsubscribe':
      return unsubscribe(state, action.payload);
    default:
      return state;
  }
};

const useSubscribe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const subscribe = useCallback((mqs: Mqs) => {
    dispatch({
      type: 'subscribe',
      payload: mqs,
    });
    const unsubscribe = () => {
      dispatch({
        type: 'unsubscribe',
        payload: mqs,
      });
    }
    return unsubscribe;
  }, []);
  const returned = useMemo(() => ({
    subscriptions: Object.keys(state),
    subscribe,
  }), [state]);
  return returned;
};

export default useSubscribe;
