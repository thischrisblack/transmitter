import React from "react";

const TypeList = ({ types, updateFilter, activeFilter }) => {
  return (
    <ul className="typelist">
      <li
        className={"typelist__type " + (activeFilter === null ? " active" : "")}
        id={null}
        onClick={updateFilter}
      >
        all
      </li>
      {types.map(type => (
        <li
          className={
            "typelist__type" + (type === activeFilter ? " active" : "")
          }
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
