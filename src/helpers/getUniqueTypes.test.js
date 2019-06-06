import getUniqueTypes from "./getUniqueTypes";

it("returns array of unique values from an array of objects given a specific key", () => {
  const testArray = [
    { name: "Bob", type: "Monkey" },
    { name: "Frank", type: "Monkey" },
    { name: "Frank", type: "Stoat" }
  ];
  expect(getUniqueTypes(testArray, "name")).toEqual(["Bob", "Frank"]);
  expect(getUniqueTypes(testArray, "type")).toEqual(["Monkey", "Stoat"]);
});
