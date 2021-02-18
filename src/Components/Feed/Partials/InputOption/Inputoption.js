import React from "react";
import "./Inputoption.css";
function Inputoption({ Icon, title, color, onClick }) {
  return (
    <div className="inputOption" onClick={onClick}>
      <Icon style={{ color: color }} />
      <h4>{title}</h4>
    </div>
  );
}

export default Inputoption;
