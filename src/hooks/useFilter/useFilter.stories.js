import React from "react";

import { storiesOf } from "@storybook/react";

import useFilter from "./useFilter";
import { providerDecorator, storyInfoDecorator } from "../../_storybook";

storiesOf("Hooks", module)
  .addDecorator(
    storyInfoDecorator({
      title: "useFilter",
      subtitle:
        "Maps media query strings to values and returns the matching values",
      argsInfo: [
        {
          name: "mqs",
          required: "true",
          type: "object",
          description: "Object with media query string as keys"
        }
      ]
    })
  )
  .addDecorator(providerDecorator())
  .add("useFilter", () => {
    const mqs = {
      "(min-width: 768px)": "> 768px",
      "(min-width: 1024px)": "> 1024px"
    };

    const Component = () => {
      const value = useFilter(mqs);
      return <div className="box">{JSON.stringify(value)}</div>;
    };
    return <Component />;
  });
