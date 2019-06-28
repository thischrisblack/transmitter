import React, { Component } from "react";

import { deleteMessage } from "../../../helpers/firebaseCRUD";
import { Link } from "react-router-dom";

class EditDelete extends Component {
  state = {
    delete: false
  };

  deleteThisMessage = event => {
    if (this.state.delete) {
      deleteMessage(event.target.dataset, this.props.firebase);
    } else {
      this.setState({ delete: true });
    }
  };

  cancelDelete = () => {
    this.setState({ delete: false });
  };

  render() {
    return (
      <div className="messages__list--edit">
        <Link to={{ pathname: "/lord/transmit", post: this.props.message }}>
          edit
        </Link>
        {" | "}
        <span
          className="messages__list--delete"
          data-postid={this.props.message.timestamp}
          data-database={this.props.database}
          data-image={this.props.message.image}
          data-sound={this.props.message.sound}
          onClick={this.deleteThisMessage}
        >
          {this.state.delete ? "confirm" : "delete"}
        </span>
        {this.state.delete && (
          <span
            className="messages__list--cancel-delete"
            onClick={this.cancelDelete}
          >
            {" "}
            | cancel
          </span>
        )}
      </div>
    );
  }
}

export default EditDelete;
