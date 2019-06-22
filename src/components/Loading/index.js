import React, { Component } from "react";

class Loading extends Component {
  render() {
    return <div className="loading">{this.props.message}</div>;
  }
}

export default Loading;
