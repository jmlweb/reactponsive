import React from "react";

import { storiesOf } from "@storybook/react";

import useMapper from "./useMapper";
import { providerDecorator, storyInfoDecorator } from "../../_storybook";

storiesOf("Hooks/useMapper", module)
  .addDecorator(
    storyInfoDecorator({
      title: "useMapper",
      subtitle:
        "Maps media query strings to values and returns the last one active",
      intro: (
        <>
          <p>
            If there is <strong>no matching mq</strong>, returns the value for{" "}
            <strong>default</strong>.
          </p>
          <p>
            If <strong>no default</strong> value is provided, in the previous
            case, it returns <strong>null</strong>.
          </p>
          <p>
            If you want to return the <strong>first value</strong>, pass
            <strong>"first"</strong> as the second argument.
          </p>
        </>
      ),
      argsInfo: [
        {
          name: "mqs",
          required: "true",
          type: "object",
          description: "Object with media query string as keys"
        },
        {
          name: "mode",
          required: "false",
          type: '"first" | "last"',
          description:
            'In "first" mode, it returns the first value whose key matches instead of the last one'
        }
      ]
    })
  )
  .addDecorator(providerDecorator())
  .add("last mode (default)", () => {
    const byDefault = "Default";
    const tablet = "> 768px";
    const desktop = "> 1024px";

    const mqs = {
      default: byDefault,
      "(min-width: 768px)": tablet,
      "(min-width: 1024px)": desktop
    };

    const Component = () => {
      const value = useMapper(mqs);
      return <div className="box">{value}</div>;
    };
    return <Component />;
  })
  .add("first mode", () => {
    const byDefault = "Default";
    const tablet = "> 768px";
    const landscape = "landscape";

    const mqs = {
      default: byDefault,
      "(min-width: 768px)": tablet,
      "(orientation: landscape)": landscape
    };

    const Component = () => {
      const value = useMapper(mqs, "first");
      return <div className="box">{value}</div>;
    };
    return <Component />;
  });
