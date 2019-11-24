import { ReactNode } from "react";

import useMapper from "../useMapper";
import { FirstLastMode } from "../types";

type Props<T> = {
  mqs: Record<string, T>;
  mode?: FirstLastMode;
};

const Mapper = <T extends ReactNode>({ mqs, mode }: Props<T>): T | null => {
  const value = useMapper(mqs, mode);
  return value || null;
};

export default Mapper;
