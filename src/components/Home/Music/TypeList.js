import React, { Component } from "react";
import PropTypes from "prop-types";

class TypeList extends Component {
  updateFilter = event => {
    this.props.updateFilter(event);
  };

  render() {
    return (
      <ul className="typelist">
        <li
          className="typelist__type"
          data-key={this.props.title}
          data-value={null}
          onClick={this.updateFilter}
        >
          All
        </li>
        {this.props.types.map(type => (
          <li
            className="typelist__type"
            key={type}
            id={type}
            data-key={this.props.title}
            data-value={type}
            onClick={this.updateFilter}
          >
            {type}
          </li>
        ))}
      </ul>
    );
  }
}

TypeList.propTypes = {
  types: PropTypes.array,
  updateFilter: PropTypes.func,
  title: PropTypes.string
};

export default TypeList;
