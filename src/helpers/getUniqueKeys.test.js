import getUniqueKeys from "./getUniqueKeys";

it("returns array of unique values from an array of objects given a specific key", () => {
  const testArray = [
    { name: "Bob", type: "Monkey" },
    { name: "Frank", type: "Monkey" },
    { name: "Frank", type: "Stoat" }
  ];
  expect(getUniqueKeys(testArray, "name")).toEqual(["Bob", "Frank"]);
  expect(getUniqueKeys(testArray, "type")).toEqual(["Monkey", "Stoat"]);
});
