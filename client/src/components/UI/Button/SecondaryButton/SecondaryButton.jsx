import React from "react";
import "./SecondaryButton.css";

function SecondaryButton(props) {
  return <button onClick={props.onClick} className="secondary-btn">{props.children}</button>;
}

export default SecondaryButton;
