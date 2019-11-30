import React from "react";
import { storiesOf } from "@storybook/react";

import Provider from "./Provider";
import Toggler from "../Toggler";
import { storyInfoDecorator } from "../../_storybook";

const alias = {
  tablet: "(min-width: 768px)",
  desktop: "(min-width: 1024px)"
};

storiesOf("Components", module)
  .addDecorator(
    storyInfoDecorator({
      title: "Provider",
      subtitle:
        "Important: Wrap the hooks and components from this library with this provider.",
      intro: (
        <p>
          You can pass a prop to map your <strong>alias</strong> to the{" "}
          <strong>media queries</strong> used in your app, so you can use{" "}
          <strong>tablet</strong> instead of <strong>(min-width: 768px)</strong>
          .
        </p>
      ),
      propsInfo: [
        {
          name: "alias",
          required: "true",
          type: "object",
          description:
            "Object with alias as keys and media query string as values"
        }
      ]
    })
  )
  .add("Provider", () => (
    <Provider alias={alias}>
      <>
        <Toggler mq="tablet">
          <div className="box">> Tablet</div>
        </Toggler>
        <Toggler mq="desktop">
          <div className="box">> Desktop</div>
        </Toggler>
      </>
    </Provider>
  ));
