import * as React from 'react';

import { IContext } from '../types';

const Context = React.createContext<Partial<IContext>>({});

export default Context;
