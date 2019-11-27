import { ReactNode } from "react";

import { useMapper } from "../../hooks";
import { FirstLastMode } from "../../types";

type Props<T> = {
  mqs: Record<string, T>;
  mode?: FirstLastMode;
};

const Mapper = <T extends ReactNode>({ mqs, mode }: Props<T>): T | null => {
  const value = useMapper(mqs, mode);
  return value;
};

export default Mapper;
