import React, { Component } from "react";

class TypeList extends Component {
  updateFilter = event => {
    this.props.updateFilter(event);
  };
  render() {
    return (
      <ul className="typelist">
        <li className="typelist__type">Types:</li>
        <li className="typelist__type" id={null} onClick={this.updateFilter}>
          all
        </li>
        {this.props.types.map(type => (
          <li
            className="typelist__type"
            key={type}
            id={type}
            onClick={this.updateFilter}
          >
            {type}
          </li>
        ))}
      </ul>
    );
  }
}

export default TypeList;
