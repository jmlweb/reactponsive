import { createContext } from 'react';

import { IReactPonsiveContext } from '../types';

const Context = createContext({} as Required<Readonly<IReactPonsiveContext>>);

export default Context;
