import React from "react";
import { Form } from "react-bootstrap";

interface ColorPickerProps {
  backgroundColor: string;
  handleHexChange: (hex: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  backgroundColor,
  handleHexChange,
}) => {
  return (
    <div className="p-2 mb-2 bg-light rounded shadow-sm">
      <Form.Group
        controlId="colorPickerControl"
        className="d-flex align-items-center"
      >
        <Form.Label className="me-3 text-start">
          Pick a Background Color:
        </Form.Label>
        <Form.Control
          type="color"
          value={backgroundColor}
          onChange={(e) => handleHexChange(e.target.value)} // Update Hex, RGB, and CMYK when the color changes
          style={{ width: "40px", height: "40px" }} // Compact size
        />
      </Form.Group>
    </div>
  );
};

export default React.memo(ColorPicker);
