import * as React from 'react';

import Context from '../Context';
import { Alias } from '../types';

interface Props {
  alias: Alias;
  children: React.ReactNode;
}

const AliasProvider: React.FunctionComponent<Props> = ({ alias, children }) => (
  <Context.Provider value={alias}>
    {React.Children.only(children)}
  </Context.Provider>
);

export default AliasProvider;
