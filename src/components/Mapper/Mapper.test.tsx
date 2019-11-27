import React from "react";

import { generateMatchMediaMock, renderWithProvider } from "../../testUtils";

import Mapper from "./Mapper";

generateMatchMediaMock();

describe("Mapper", () => {
  test("shows the component when needed", () => {
    const { getByText } = renderWithProvider(
      <Mapper
        mqs={{
          tablet: <div>Tablet</div>,
          desktop: <div>Desktop</div>
        }}
      />
    );
    expect(getByText("Tablet")).toBeInTheDocument();
  });
  test("returns null when needed", () => {
    const { queryByText } = renderWithProvider(
      <Mapper
        mqs={{
          desktop: <div>Desktop</div>
        }}
      />
    );
    expect(queryByText("Desktop")).not.toBeInTheDocument();
  });
});
