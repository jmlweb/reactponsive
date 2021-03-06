import React from "react";

import { storiesOf } from "@storybook/react";

import Toggler from "./Toggler";
import { providerDecorator, storyInfoDecorator } from "../../_storybook";

storiesOf("Components/Toggler", module)
  .addDecorator(
    storyInfoDecorator({
      title: "Toggler",
      subtitle:
        "Renders the children if any of the media query string received matches",
      intro: (
        <p>
          Enable <strong>strict mode</strong> if you want <strong>all</strong>{" "}
          the media query strings to match
        </p>
      ),
      propsInfo: [
        {
          name: "mq",
          required: "true",
          type: "string | string[]",
          description: "Media query string or array of media query strings"
        },
        {
          name: "strict",
          required: "false",
          type: "boolean",
          description:
            "In strict mode, all the mqs received must mutch to render the children"
        },
        {
          name: "children",
          required: "true",
          type: "ReactNode",
          description: ""
        }
      ]
    })
  )
  .addDecorator(providerDecorator())
  .add("One mq (string)", () => (
    <>
      <Toggler mq="(orientation: landscape)">
        <div className="box">This should be displayed in landscape</div>
      </Toggler>
      <Toggler mq="(orientation: portrait)">
        <div className="box">This should be displayed in portrait</div>
      </Toggler>
      <Toggler mq="(min-width: 320px)">
        <div className="box">This should be displayed from 320px width</div>
      </Toggler>
      <Toggler mq="(min-width: 768px)">
        <div className="box">This should be displayed from 768px width</div>
      </Toggler>
      <Toggler mq="(min-width: 1024px)">
        <div className="box">This should be displayed from 1024px width</div>
      </Toggler>
      <Toggler mq="(min-resolution: 90dpi)">
        <div className="box">This should be displayed from 90dpi</div>
      </Toggler>
    </>
  ))
  .add("Array of mqs", () => (
    <>
      <Toggler mq={["(orientation: portrait)", "(min-width: 320px)"]}>
        <div className="box">
          This should be displayed if portrait or width > 320px
        </div>
      </Toggler>
    </>
  ))
  .add("Strict mode", () => (
    <>
      <Toggler mq={["(orientation: portrait)", "(min-width: 320px)"]} strict>
        <div className="box">
          This should be displayed if portrait and width > 320px
        </div>
      </Toggler>
    </>
  ));
