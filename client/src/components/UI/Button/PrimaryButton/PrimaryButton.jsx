import React from "react";
import "./PrimaryButton.css";
function PrimaryButton(props) {
  return (
    <button onClick={props.onClick} className="primary-btn">
      {props.children}
    </button>
  );
}

export default PrimaryButton;
