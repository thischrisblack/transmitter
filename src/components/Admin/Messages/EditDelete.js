import React, { Component } from "react";
import PropTypes from "prop-types";

import { withFirebase } from "../../Firebase";

import { Link } from "react-router-dom";

class EditDelete extends Component {
  state = {
    deleteThis: false
  };

  deleteThisMessage = event => {
    if (this.state.deleteThis) {
      this.props.firebase.deleteMessage(
        event.target.dataset,
        this.props.firebase
      );
    } else {
      this.setState({ deleteThis: true });
    }
  };

  cancelDelete = () => {
    this.setState({ deleteThis: false });
  };

  render() {
    const { deleteThis } = this.state;
    console.log(this.props);
    return (
      <div className="message__edit">
        <Link to={{ pathname: "/lord/transmit", post: this.props.message }}>
          edit
        </Link>
        {" | "}
        <span
          className="message__delete"
          data-postid={this.props.message.id}
          data-database={this.props.database}
          data-image={this.props.message.image}
          data-sound={this.props.message.sound}
          onClick={this.deleteThisMessage}
        >
          {deleteThis ? "confirm" : "delete"}
        </span>
        {deleteThis && (
          <span className="message__cancel-delete" onClick={this.cancelDelete}>
            {" "}
            | cancel
          </span>
        )}
      </div>
    );
  }
}

EditDelete.propTypes = {
  firebase: PropTypes.object,
  message: PropTypes.object,
  database: PropTypes.string
};

export default withFirebase(EditDelete);
