import React from "react";
import Button from "react-bootstrap/Button";

interface Props {
  children: string;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "link";
  onClick: () => void;
}

const CustomButton = ({ children, color = "primary", onClick }: Props) => {
  return (
    <Button variant={color} onClick={onClick}>
      {children}
    </Button>
  );
};

export default Button;
