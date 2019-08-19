import MessageTest from "./MessageTest";
import GetPosts from "../Home/GetPosts";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";

export default compose(
  withFirebase,
  GetPosts
)(MessageTest, "messages");
