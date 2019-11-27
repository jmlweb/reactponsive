import { renderHookWithProvider } from "../../testUtils";

import useAlias from "./useAlias";

const aliasObj = {
  tablet: "(min-width: 768px)"
};

describe("useAlias", () => {
  test("Find alias passed", () => {
    const { result } = renderHookWithProvider(() => useAlias(), {
      alias: aliasObj
    });
    expect(result.current).toBe(aliasObj);
  });
});
