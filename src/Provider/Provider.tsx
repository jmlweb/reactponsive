import React from 'react';

import Context from '../Context';
import { IAlias } from '../types';
import useSubscribe from './useSubscribe';
import useListeners from './useListeners';
import Subscription from '../_lib/Subscription';

interface Props {
  /** Object with alias as keys and media query string as values */
  alias?: IAlias;
  children: React.ReactNode;
}

/**
 * Pass the alias object provided as context for later use
 */

const subscribe = Subscription();

const Provider: React.FunctionComponent<Props> = ({ alias = {}, children }) => {
  // const { subscribe, subscriptions } = useSubscribe();
  // const results = useListeners(subscriptions);
  const value = {
    alias,
    subscribe: subscribe,
  };
  return (
    <Context.Provider value={value}>
      {React.Children.only(children)}
    </Context.Provider>
  );
};

export default Provider;
