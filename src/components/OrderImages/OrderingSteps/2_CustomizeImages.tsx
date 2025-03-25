import React from "react";
import { Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";
import SettingsTabs from "../SettingsTabs/_SettingsTabs";
import PreviewPanel from "../PreviewPanel";
import { useOrderImagesContext } from "../_OrderImagesContext";

const CustomizeImagesStep: React.FC = () => {
  const { imageType, setImageType } = useOrderImagesContext();
  return (
    <Row>
      {/* Left Panel: Toggle and Tabs */}
      <Col md={6}>
        <div className="mb-3">
          <ButtonGroup className="d-flex">
            <ToggleButton
              id="radio-model"
              type="radio"
              variant="outline-primary"
              name="imageType"
              value="model"
              checked={imageType === "model"}
              onChange={(e) => setImageType(e.currentTarget.value)}
            >
              Model
            </ToggleButton>
            <ToggleButton
              id="radio-stillLife"
              type="radio"
              variant="outline-primary"
              name="imageType"
              value="stillLife"
              checked={imageType === "stillLife"}
              onChange={(e) => setImageType(e.currentTarget.value)}
            >
              Still Life
            </ToggleButton>
          </ButtonGroup>
        </div>

        <SettingsTabs />
      </Col>

      {/* Right Panel: Preview */}
      <Col md={6} className="d-flex align-items-center justify-content-center">
        <PreviewPanel />
      </Col>
    </Row>
  );
};

export default CustomizeImagesStep;
