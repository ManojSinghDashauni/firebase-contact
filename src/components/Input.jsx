import React from "react";

const Search = ({ label, className = "", type = "text", ...props }) => {
  return (
    <div className="flex flex-col  w-96 ">
      {label && <label htmlFor={label}>{label}</label>}
      <input
        type={type}
        className={`mt-2 px-4 text-xl w-full py-2 border-2 border-white outline-none focus:border-white ${className}`}
        {...props}
      />
    </div>
  );
};

export default Search;
