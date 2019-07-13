import MyComponent from "./MyComponent";
import HOC from "./HOC";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";

export default compose(
  withFirebase,
  HOC
)(MyComponent);
