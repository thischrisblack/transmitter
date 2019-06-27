import React from "react";

const TypeList = ({ types, updateFilter }) => {
  return (
    <ul className="typelist">
      {/* TODO: Add a class for the list title. */}
      <li className="typelist__type">Types:</li>
      <li className="typelist__type" id={null} onClick={updateFilter}>
        all
      </li>
      {types.map(type => (
        <li
          className="typelist__type"
          key={type}
          id={type}
          onClick={updateFilter}
        >
          {type}
        </li>
      ))}
    </ul>
  );
};

export default TypeList;
