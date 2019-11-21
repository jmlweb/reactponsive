import { ReactNode } from 'react';

import useMapper from '../useMapper';
import { FirstLastMode } from '../types';

type Props = {
  mqs: Record<string, ReactNode>;
  mode?: FirstLastMode;
};

const Mapper = ({ mqs, mode }: Props) => {
  const value = useMapper(mqs, mode);
  return value || null;
};

export default Mapper;
