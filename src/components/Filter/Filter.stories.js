import React from "react";

import { storiesOf } from "@storybook/react";

import Filter from "./Filter";
import { providerDecorator, storyInfoDecorator } from "../../_storybook";

storiesOf("Components/Filter", module)
  .addDecorator(
    storyInfoDecorator({
      title: "Filter",
      subtitle:
        "Maps media query strings to elements and renders the matching elements",
      intro: (
        <>
          <p>
            Element with <strong>default</strong> key will be rendered as
            safeguard.
          </p>
        </>
      ),
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
  .add("without default", () => {
    const tablet = <div className="box">&gt; 768px</div>;
    const desktop = <div className="box">&gt; 1024px</div>;

    const mqs = {
      "(min-width: 768px)": tablet,
      "(min-width: 1024px)": desktop
    };
    return <Filter mqs={mqs} />;
  })
  .add("with default", () => {
    const byDefault = <div className="box">Default</div>;
    const tablet = <div className="box">&gt; 768px</div>;
    const desktop = <div className="box">&gt; 1024px</div>;

    const mqs = {
      default: byDefault,
      "(min-width: 768px)": tablet,
      "(min-width: 1024px)": desktop
    };
    return <Filter mqs={mqs} />;
  });
