import * as React from "react";
import renderer from "react-test-renderer";
import PartsOfMachine from "../PartsOfMachine";

it("PartsOfMachine loads correctly", () => {
  const tree = renderer
    .create(<PartsOfMachine> Snapshot of PartsOfMachine</PartsOfMachine>)
    .toJSON();
  console.log(tree);
  expect(tree).toMatchSnapshot();
});
