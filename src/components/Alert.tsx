import React from "react";
import classNames from "classnames";

interface AlertProps {
  message: string;
  type: "success" | "error" | "notification";
}

const CustomAlert: React.FC<AlertProps> = ({ message, type }) => {
  const alertClass = classNames("alert", {
    "alert-success": type === "success",
    "alert-danger": type === "error",
    "alert-info": type === "notification",
  });

  console.log("CustomAlert type:", type); // Debugging line
  console.log("CustomAlert class:", alertClass); // Debugging line

  return <div className={alertClass}>{message}</div>;
};

export default CustomAlert;
