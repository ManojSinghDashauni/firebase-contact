import React from "react";
import SearchSVG from "./SearchSVG";

const Search = ({ label, className = "", type = "text", filter, ...props }) => {
  return (
    <div className="flex relative w-full">
      {label && <label htmlFor={label}>{label}</label>}
      <input
        onChange={filter}
        type={type}
        className={`pl-10 text-xl w-full py-2 border-2 border-white outline-none focus:border-white ${className}`}
        {...props}
      />
      <SearchSVG className="absolute left-2 translate-y-3 flex items-center" />
    </div>
  );
};

export default Search;
