import { ReactChild } from 'react';

import { useToggler } from '../../hooks';

interface IProps<T> {
  mq: string | string[];
  strict?: boolean;
  children: T;
}

const Toggler = <T extends ReactChild>({
  mq,
  strict,
  children
}: IProps<T>): T | null => {
  const showChildren = useToggler(mq, strict);
  return showChildren ? children : null;
};

export default Toggler;
