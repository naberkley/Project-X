import React from "react";
import { Form, Row, Col } from "react-bootstrap";

interface CMYKFieldsProps {
  cmyk: { c: number; m: number; y: number; k: number };
  handleCMYKChange: (channel: "c" | "m" | "y" | "k", value: number) => void;
}

const CMYKFields: React.FC<CMYKFieldsProps> = ({ cmyk, handleCMYKChange }) => {
  return (
    <div className="p-2 mb-2 bg-light rounded shadow-sm">
      <Form.Group controlId="cmykControl">
        <Row className="g-2 align-items-center">
          <Col xs="auto">
            <Form.Label className="mb-0">C:</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="number"
              value={cmyk.c}
              min={0}
              max={100}
              onChange={(e) => handleCMYKChange("c", Number(e.target.value))}
              className="form-control-sm"
            />
          </Col>
          <Col xs="auto">
            <Form.Label className="mb-0">M:</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="number"
              value={cmyk.m}
              min={0}
              max={100}
              onChange={(e) => handleCMYKChange("m", Number(e.target.value))}
              className="form-control-sm"
            />
          </Col>
          <Col xs="auto">
            <Form.Label className="mb-0">Y:</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="number"
              value={cmyk.y}
              min={0}
              max={100}
              onChange={(e) => handleCMYKChange("y", Number(e.target.value))}
              className="form-control-sm"
            />
          </Col>
          <Col xs="auto">
            <Form.Label className="mb-0">K:</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="number"
              value={cmyk.k}
              min={0}
              max={100}
              onChange={(e) => handleCMYKChange("k", Number(e.target.value))}
              className="form-control-sm"
            />
          </Col>
        </Row>
      </Form.Group>
    </div>
  );
};

export default CMYKFields;
