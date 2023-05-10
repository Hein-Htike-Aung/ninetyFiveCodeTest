import React from "react";
import "./outlined-button.scss";

const OutlinedButton = ({ children, btnClick }) => {
  return (
    <div>
      <button className="outlinedButton" onClick={btnClick}>
        {children}
      </button>
    </div>
  );
};

export default OutlinedButton;
