import React from "react";

import { storiesOf } from "@storybook/react";

import Mapper from "./Mapper";
import { providerDecorator, storyInfoDecorator } from "../../_storybook";

storiesOf("Components/Mapper", module)
  .addDecorator(
    storyInfoDecorator({
      title: "Mapper",
      subtitle:
        "Maps media query strings to elements and renders the last one active",
      intro: (
        <>
          <p>
            If there is <strong>no matching mq</strong>, renders the value for{" "}
            <strong>default</strong>.
          </p>
          <p>
            If <strong>no default</strong> value is provided, in the previous
            case, it returns <strong>null</strong>.
          </p>
          <p>
            If you want to render the <strong>first element</strong>, pass
            <strong>"first"</strong> as the second argument.
          </p>
        </>
      ),
      propsInfo: [
        {
          name: "mqs",
          required: "true",
          type: "object",
          description:
            "An object with valid media query string as keys and elements as values"
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
    const zero = <div className="box">Default</div>;
    const first = <div className="box">&gt; 768px</div>;
    const second = <div className="box">&gt; 1024px</div>;
    const mqs = {
      default: zero,
      "(min-width: 768px)": first,
      "(min-width: 1024px)": second
    };
    return <Mapper mqs={mqs} />;
  })
  .add("first mode", () => {
    const zero = <div className="box">Default</div>;
    const first = <div className="box">&gt; 768px</div>;
    const second = <div className="box">landscape</div>;
    const mqs = {
      default: zero,
      "(min-width: 768px)": first,
      "(orientation: landscape)": second
    };
    return <Mapper mode="first" mqs={mqs} />;
  });
