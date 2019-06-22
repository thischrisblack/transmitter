import formatTimer from "./formatTimer";

it("converts seconds to m:ss format", () => {
  expect(formatTimer(77)).toBe("1:17");
});
