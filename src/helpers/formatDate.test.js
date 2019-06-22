import formatDate from "./formatDate";

it("Converts a Date object into another format", () => {
  expect(formatDate(new Date("June 27, 2015 22:03:12"))).toBe(
    "2015-06-27 22:03:12"
  );
});
