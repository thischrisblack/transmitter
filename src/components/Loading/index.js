import React, { Component } from "react";

class Static extends Component {
  render() {
    return <div className="static">{this.props.message}</div>;
  }
}

export default Static;
