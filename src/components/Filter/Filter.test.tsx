import React from "react";

import { generateMatchMediaMock, renderWithProvider } from "../../testUtils";

import Filter from "./Filter";

generateMatchMediaMock();

describe("Toggler", () => {
  test("shows the component when needed", () => {
    const { getByText, queryByText } = renderWithProvider(
      <>
        <Filter
          mqs={{ tablet: <div>Tablet</div>, desktop: <div>Desktop</div> }}
        />
      </>
    );
    expect(getByText("Tablet")).toBeInTheDocument();
    expect(queryByText("Desktop")).not.toBeInTheDocument();
  });
  test("renders even when no option passes", () => {
    const { queryByText } = renderWithProvider(
      <>
        <Filter
          mqs={{
            desktop: <div>Desktop</div>,
            "(min-width: 1280px)": <div>Desktop LG</div>
          }}
        />
      </>
    );
    expect(queryByText("Desktop")).not.toBeInTheDocument();
    expect(queryByText("(min-width: 1280px)")).not.toBeInTheDocument();
  });
});
