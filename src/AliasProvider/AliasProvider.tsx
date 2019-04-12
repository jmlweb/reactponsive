import * as React from 'react';

import Context from '../Context';
import { Alias } from '../types';

interface Props {
  /** Object with alias as keys and media query string as values */
  alias: Alias;
  children: React.ReactNode;
}

/**
 * Pass the alias object provided as context for later use
 */
const AliasProvider: React.FunctionComponent<Props> = ({ alias, children }) => (
  <Context.Provider value={alias}>
    {React.Children.only(children)}
  </Context.Provider>
);

export default AliasProvider;
