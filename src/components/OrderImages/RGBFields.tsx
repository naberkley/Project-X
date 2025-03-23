import React from "react";
import { Form, Row, Col } from "react-bootstrap";

interface RGBFieldsProps {
  rgb: { r: number; g: number; b: number };
  handleRGBChange: (channel: "r" | "g" | "b", value: number) => void;
}

const RGBFields: React.FC<RGBFieldsProps> = ({ rgb, handleRGBChange }) => {
  return (
    <div className="p-2 mb-2 bg-light rounded shadow-sm">
      <Form.Group controlId="rgbControl">
        <Row className="g-2 align-items-center">
          <Col xs="auto">
            <Form.Label className="mb-0">R:</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="number"
              value={rgb.r}
              min={0}
              max={255}
              onChange={(e) => handleRGBChange("r", Number(e.target.value))}
              className="form-control-sm"
            />
          </Col>
          <Col xs="auto">
            <Form.Label className="mb-0">G:</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="number"
              value={rgb.g}
              min={0}
              max={255}
              onChange={(e) => handleRGBChange("g", Number(e.target.value))}
              className="form-control-sm"
            />
          </Col>
          <Col xs="auto">
            <Form.Label className="mb-0">B:</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="number"
              value={rgb.b}
              min={0}
              max={255}
              onChange={(e) => handleRGBChange("b", Number(e.target.value))}
              className="form-control-sm"
            />
          </Col>
        </Row>
      </Form.Group>
    </div>
  );
};

export default RGBFields;
