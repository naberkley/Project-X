import React from "react";
import { Form } from "react-bootstrap";

interface PaddingTabProps {
  currentPadding: {
    top: number;
    bottom: number;
    sides: number;
  };
  handlePaddingChange: (
    side: "top" | "bottom" | "sides",
    value: number
  ) => void;
  imageType: string;
  disableTopPadding?: boolean; // Add this prop
}

const PaddingTab: React.FC<PaddingTabProps> = ({
  currentPadding,
  handlePaddingChange,
  imageType,
  disableTopPadding, // Destructure the new prop
}) => {
  return (
    <Form>
      {/* Padding Top */}
      <Form.Group controlId="paddingTopControl">
        <Form.Label>Padding Top (px)</Form.Label>
        <Form.Control
          type="number"
          value={currentPadding.top}
          onChange={(e) => handlePaddingChange("top", Number(e.target.value))}
          disabled={disableTopPadding} // Disable input when the prop is true
        />
      </Form.Group>

      {/* Padding Bottom */}
      <Form.Group controlId="paddingBottomControl">
        <Form.Label>Padding Bottom (px)</Form.Label>
        <Form.Control
          type="number"
          value={currentPadding.bottom}
          onChange={(e) =>
            handlePaddingChange("bottom", Number(e.target.value))
          }
          disabled={imageType === "model"} // Existing logic for bottom padding
        />
      </Form.Group>

      {/* Padding Sides */}
      <Form.Group controlId="paddingSidesControl">
        <Form.Label>Padding Sides (px)</Form.Label>
        <Form.Control
          type="number"
          value={currentPadding.sides}
          onChange={(e) => handlePaddingChange("sides", Number(e.target.value))}
        />
      </Form.Group>
    </Form>
  );
};

export default PaddingTab;
