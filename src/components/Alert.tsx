import { ReactNode } from "react";
import Alert from "react-bootstrap/Alert";
import CloseButton from "react-bootstrap/CloseButton";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

const CustomAlert = ({ children, onClose }: Props) => {
  return (
    <Alert variant="primary" dismissible onClose={onClose}>
      {children}
      <CloseButton onClick={onClose} aria-label="Close" />
    </Alert>
  );
};

export default CustomAlert;
