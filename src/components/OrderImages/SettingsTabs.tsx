import React from "react";
import { Tab, Tabs, Form } from "react-bootstrap";
import ColorPicker from "./ColorPicker";
import HexCodeField from "./HexCodeField";
import RGBFields from "./RGBFields";
import CMYKFields from "./CMYKFields";

interface SettingsTabsProps {
  colorState: {
    backgroundColor: string;
    rgb: { r: number; g: number; b: number };
    cmyk: { c: number; m: number; y: number; k: number };
  };
  inputValue: string;
  setInputValue: (value: string) => void;
  handleHexChange: (hex: string) => void;
  handleRGBChange: (channel: "r" | "g" | "b", value: number) => void;
  handleCMYKChange: (channel: "c" | "m" | "y" | "k", value: number) => void;
  imageWidth: number;
  setImageWidth: (value: number) => void;
  imageHeight: number;
  setImageHeight: (value: number) => void;
  aspectRatio: string;
  currentPadding: { top: number; bottom: number; sides: number };
  handlePaddingChange: (
    side: "top" | "bottom" | "sides",
    value: number
  ) => void;
  imageType: string;
}

const SettingsTabs: React.FC<SettingsTabsProps> = React.memo(
  ({
    colorState,
    inputValue,
    setInputValue,
    handleHexChange,
    handleRGBChange,
    handleCMYKChange,
    imageWidth,
    setImageWidth,
    imageHeight,
    setImageHeight,
    aspectRatio,
    currentPadding,
    handlePaddingChange,
    imageType,
  }) => {
    return (
      <Tabs defaultActiveKey="imageSize" id="settings-tabs" className="mb-3">
        {/* Tab 1: Image Size */}
        <Tab eventKey="imageSize" title="Image Size">
          <Form>
            <Form.Group controlId="imageWidthControl">
              <Form.Label>Image Width (px)</Form.Label>
              <Form.Control
                type="text"
                value={imageWidth}
                onChange={(e) => {
                  const value = Math.min(
                    Math.max(Number(e.target.value), 0),
                    20000
                  );
                  setImageWidth(value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="imageHeightControl">
              <Form.Label>Image Height (px)</Form.Label>
              <Form.Control
                type="text"
                value={imageHeight}
                onChange={(e) => {
                  const value = Math.min(
                    Math.max(Number(e.target.value), 0),
                    20000
                  );
                  setImageHeight(value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="aspectRatioDisplay">
              <Form.Label>Aspect Ratio</Form.Label>
              <Form.Control type="text" value={aspectRatio} readOnly />
            </Form.Group>
          </Form>
        </Tab>

        {/* Tab 2: Padding Settings */}
        <Tab eventKey="padding" title="Padding">
          <Form>
            <Form.Group controlId="paddingTopControl">
              <Form.Label>Padding Top (px)</Form.Label>
              <Form.Control
                type="number"
                value={currentPadding.top}
                onChange={(e) =>
                  handlePaddingChange("top", Number(e.target.value))
                }
              />
            </Form.Group>
            <Form.Group controlId="paddingBottomControl">
              <Form.Label>Padding Bottom (px)</Form.Label>
              <Form.Control
                type="number"
                value={currentPadding.bottom}
                onChange={(e) =>
                  handlePaddingChange("bottom", Number(e.target.value))
                }
                disabled={imageType === "model"}
              />
            </Form.Group>
            <Form.Group controlId="paddingSidesControl">
              <Form.Label>Padding Sides (px)</Form.Label>
              <Form.Control
                type="number"
                value={currentPadding.sides}
                onChange={(e) =>
                  handlePaddingChange("sides", Number(e.target.value))
                }
              />
            </Form.Group>
          </Form>
        </Tab>

        {/* Tab 3: Background Color Settings */}
        <Tab eventKey="background" title="Background">
          <Form>
            <ColorPicker
              backgroundColor={colorState.backgroundColor}
              handleHexChange={handleHexChange}
            />
            <HexCodeField
              inputValue={inputValue}
              backgroundColor={colorState.backgroundColor}
              setInputValue={setInputValue}
              handleHexChange={handleHexChange}
            />
            <RGBFields rgb={colorState.rgb} handleRGBChange={handleRGBChange} />
            <CMYKFields
              cmyk={colorState.cmyk}
              handleCMYKChange={handleCMYKChange}
            />
          </Form>
        </Tab>
      </Tabs>
    );
  }
);

export default SettingsTabs;
