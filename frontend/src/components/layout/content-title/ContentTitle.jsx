import React from "react";
import "./content-title.scss";

const ContentTitle = ({ title, children }) => {
  return (
    <div className="contentTitle">
      <div className="left">Librarian | {title}</div>
      <div className="right">{children}</div>
    </div>
  );
};

export default ContentTitle;
