import { createContext } from 'react';

import { ReactPonsiveContext } from '../types';

const Context = createContext({} as Required<Readonly<ReactPonsiveContext>>);

export default Context;
