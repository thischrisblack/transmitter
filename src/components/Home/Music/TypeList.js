import React from "react";

const TypeList = ({ types, activeFilter, filterCategory, updateFilter }) => {
  const handleClick = event => {
    updateFilter(event);
  };

  return (
    <ul className="typelist">
      <li
        className={"typelist__type " + (!activeFilter && "active")}
        data-key={filterCategory}
        data-value={null}
        onClick={handleClick}
      >
        All
      </li>
      {types.map(type => (
        <li
          className={
            "typelist__type" + (type === activeFilter ? " active" : "")
          }
          key={type}
          id={type}
          data-key={filterCategory}
          data-value={type}
          onClick={handleClick}
        >
          {type}
        </li>
      ))}
    </ul>
  );
};

export default TypeList;
