import React, { Children, ReactChild } from "react";

import Context from "../_lib/Context";
import { HasAliases } from "../types";
import Subscriber from "../_lib/Subscriber";
/**
 * Pass the alias object provided as context for later use, along with the subscriber
 */
const { subscribe } = Subscriber.create();

type Props = Partial<HasAliases> & {
  children: ReactChild;
};

const Provider = ({ alias = {}, children }: Props) => {
  const value = {
    alias,
    subscribe
  };
  return (
    <Context.Provider value={value}>{Children.only(children)}</Context.Provider>
  );
};

export default Provider;
