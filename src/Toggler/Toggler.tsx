import { ReactChild } from "react";

import useToggler from "../useToggler";

interface IProps<T> {
  mq: string | string[];
  strict?: Boolean;
  children: T;
}

const Toggler = <T extends ReactChild>({
  mq,
  strict = false,
  children
}: IProps<T>): T | null => {
  const showChildren = useToggler(mq, strict);
  return showChildren ? children : null;
};

export default Toggler;
