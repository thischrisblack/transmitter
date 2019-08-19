import MessageTest from "./MessageTest";
import GetPosts from "../GetPosts";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";

export default compose(
  withFirebase,
  GetPosts
)(MessageTest, "calendar");
