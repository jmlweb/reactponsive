import { ReactNode } from "react";

import { useMapper } from "../../hooks";
import { Modes } from "../../types";

type Props<T> = {
  mqs: Record<string, T>;
  mode?: Modes;
};

const Mapper = <T extends ReactNode>({ mqs, mode }: Props<T>): T | null => {
  const value = useMapper(mqs, mode);
  return value;
};

export default Mapper;
