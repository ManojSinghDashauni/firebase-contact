import React from "react";

const Button = ({ children, className = "", type = "button", ...props }) => {
  return (
    <div>
      <button type={type} className={`${className}`} {...props}>
        {children}
      </button>
    </div>
  );
};

export default Button;
