import React from "react";

import { storiesOf } from "@storybook/react";

import { Mapper } from "../components";
import { providerDecorator } from "../_storybook";

const Wrapper = ({ children }) => (
  <div style={{ display: "flex", flexWrap: "wrap" }}>{children}</div>
);

const MqComponent = ({ mq }) => (
  <div
    style={{
      backgroundColor: "#1a9dfd",
      color: "#fff",
      padding: "20px",
      marginRight: "10px",
      marginBottom: "10px"
    }}
  >
    {mq}
  </div>
);

const mqs = {
  default: <MqComponent mq="default" />,
  "(min-width: 480px)": <MqComponent mq="480px" />,
  "(min-width: 768px)": <MqComponent mq="768px" />,
  "(min-width: 1024px)": <MqComponent mq="1024px" />,
  "(min-width: 1280px)": <MqComponent mq="1280px" />,
  "(min-width: 1400px)": <MqComponent mq="1400px" />,
  "(min-width: 1980px)": <MqComponent mq="1980px" />,
  "(min-width: 2560px)": <MqComponent mq="2560px" />
};

storiesOf("Showcase", module)
  .addDecorator(providerDecorator())
  .add("Multiple components", () => {
    const elements = Array.from(
      { length: 200 },
      (value, index) => index
    ).map(v => <Mapper key={v} mqs={mqs} />);
    return <Wrapper>{elements}</Wrapper>;
  });
