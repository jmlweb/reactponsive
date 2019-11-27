import {
  generateMatchMediaMock,
  renderHookWithProvider
} from "../../testUtils";

import useToggler from "./useToggler";

generateMatchMediaMock();

describe("useToggler", () => {
  test("gets value for mq active", () => {
    const { result } = renderHookWithProvider(() => useToggler("tablet"));
    expect(result.current).toBe(true);
  });
  test("gets value for mq inactive", () => {
    const { result } = renderHookWithProvider(() => useToggler("desktop"));
    expect(result.current).toBe(false);
  });
  test("get value from inactive and active mq", () => {
    const { result } = renderHookWithProvider(() =>
      useToggler(["tablet", "desktop"])
    );
    expect(result.current).toBe(true);
  });
  test("get strict value from inactive and active mq", () => {
    const { result } = renderHookWithProvider(() =>
      useToggler(["tablet", "desktop"], true)
    );
    expect(result.current).toBe(false);
  });
});
