import React from "react";
import useAuth from "../../hooks/useAuth";

function Alert() {
  const { alertType, alertText } = useAuth();
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
}

export default Alert;
