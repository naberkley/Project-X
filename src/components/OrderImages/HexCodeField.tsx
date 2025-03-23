import React from "react";
import { Form, Row, Col } from "react-bootstrap";

interface HexCodeFieldProps {
  inputValue: string;
  backgroundColor: string;
  setInputValue: (value: string) => void;
  handleHexChange: (hex: string) => void;
}

const HexCodeField: React.FC<HexCodeFieldProps> = ({
  inputValue,
  backgroundColor,
  setInputValue,
  handleHexChange,
}) => {
  return (
    <div className="p-2 mb-2 bg-light rounded shadow-sm">
      <Form.Group controlId="backgroundColorControl">
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Label className="mb-0 me-2">Hex Code:</Form.Label>
          </Col>
          <Col className="d-flex align-items-center">
            <span className="text-muted me-1">#</span>
            <Form.Control
              type="text"
              value={inputValue} // Use local state for the displayed value
              onChange={(e) => {
                const input = e.target.value.replace("#", ""); // Remove the # if present
                if (/^[0-9a-fA-F]*$/.test(input)) {
                  // Allow only valid hex characters
                  setInputValue(input); // Update the displayed value
                }
              }}
              onBlur={() => {
                let processedValue = inputValue;
                if (inputValue.length === 3) {
                  // Expand 3-character hex codes to 6 characters
                  processedValue = inputValue
                    .split("")
                    .map((char) => char + char)
                    .join("");
                }
                if (/^[0-9a-fA-F]{6}$/.test(processedValue)) {
                  // If valid, update the backgroundColor state
                  handleHexChange(`#${processedValue}`);
                } else {
                  // If invalid, reset to the current backgroundColor
                  setInputValue(backgroundColor.replace("#", ""));
                }
              }}
              className="form-control-sm" // Smaller input field
              maxLength={6} // Hard cap at 6 characters
              isInvalid={!/^#[0-9a-fA-F]{6}$/.test(`#${inputValue}`)} // Check if the hex code is valid (6 characters)
              spellCheck="false" // Disable spellchecking
            />
          </Col>
        </Row>
      </Form.Group>
    </div>
  );
};

export default React.memo(HexCodeField);
