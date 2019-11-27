import React, { cloneElement, ReactElement } from "react";

import { useInfo } from "../../hooks";

const Filter = ({ mqs }: { mqs: Record<string, ReactElement> }) => {
  const { passes } = useInfo(Object.keys(mqs));
  const initialValue: ReactElement[] = [];
  const validValues = passes.reduce((acc, curr) => {
    const currentElement = cloneElement(mqs[curr], { key: curr });
    return [...acc, currentElement];
  }, initialValue);
  if (validValues.length > 0) {
    return <>{validValues}</>;
  }
  if (mqs.default) {
    return mqs.default;
  }
  return null;
};

export default Filter;
