import React from "react";
import "./AppInput.css";

import { Input, Typography } from "antd";

function AppInput({ placeholder, label, type, onChange, value, name }) {
  return (
    <>
      <Typography.Title level={5}>{label}</Typography.Title>
      <Input
        name={name}
        onChange={onChange}
        value={value}
        type={type}
        size="large"
        placeholder={placeholder}
      />
    </>
  );
}

export default AppInput;
