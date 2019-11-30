import React from "react";

import { storiesOf } from "@storybook/react";

import useAlias from "./useAlias";
import { providerDecorator, storyInfoDecorator } from "../../_storybook";

storiesOf("Hooks", module)
  .addDecorator(
    storyInfoDecorator({
      title: "useAlias",
      subtitle: "Returns the alias previously passed to the Provider",
      intro: (
        <p>
          This hook is used in the rest of hooks and components, so you don't
          need to manually convert the alias
        </p>
      )
    })
  )
  .addDecorator(
    providerDecorator({
      alias: {
        tablet: "(min-width: 768px)",
        desktop: "(min-width: 1024px)"
      }
    })
  )
  .add("useAlias", () => {
    const MyComponent = () => {
      const alias = useAlias();
      return (
        <div className="box">
          <strong>alias:</strong> {JSON.stringify(alias, null, 2)}
        </div>
      );
    };

    return <MyComponent />;
  });
