import React, { useState, useEffect } from "react";
import {
  Tab,
  Tabs,
  Form,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import modelImage from "../assets/dynamic_preview/model_KO.png"; // Import the model image
import stillLifeImage from "../assets/dynamic_preview/purse_KO.png"; // Import the still life image

function Order() {
  // Constants for min and max values
  const MIN_PX = 0;
  const MAX_PX = 20000;

  // State for settings
  const [imageType, setImageType] = useState("model"); // Default image type
  const [imageWidth, setImageWidth] = useState(2000); // Default image width in px
  const [imageHeight, setImageHeight] = useState(2000); // Default image height in px

  const [backgroundColor, setBackgroundColor] = useState("#ffffff"); // Default background color
  const [inputValue, setInputValue] = useState(
    backgroundColor.replace("#", "")
  ); // Displayed value for the hex code input

  // Synchronize inputValue with backgroundColor
  useEffect(() => {
    setInputValue(backgroundColor.replace("#", ""));
  }, [backgroundColor]);

  // State for RGB and CMYK values
  const [rgb, setRGB] = useState({ r: 255, g: 255, b: 255 });
  const [cmyk, setCMYK] = useState({ c: 0, m: 0, y: 0, k: 0 });

  // Helper function to calculate and format the aspect ratio
  const getAspectRatio = () => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b)); // Calculate greatest common divisor
    const divisor = gcd(imageWidth, imageHeight); // Declare and calculate the divisor
    const widthRatio = Math.round(imageWidth / divisor);
    const heightRatio = Math.round(imageHeight / divisor);
    return `${widthRatio}:${heightRatio}`; // Return the aspect ratio as a string
  };

  // Convert Hex to RGB
  const hexToRGB = (hex: string) => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  // Convert RGB to Hex
  const rgbToHex = (r: number, g: number, b: number) =>
    `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

  // Convert RGB to CMYK
  const rgbToCMYK = (r: number, g: number, b: number) => {
    const rRatio = r / 255;
    const gRatio = g / 255;
    const bRatio = b / 255;

    const k = 1 - Math.max(rRatio, gRatio, bRatio);
    const c = (1 - rRatio - k) / (1 - k) || 0;
    const m = (1 - gRatio - k) / (1 - k) || 0;
    const y = (1 - bRatio - k) / (1 - k) || 0;

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100),
    };
  };

  // Handle Hex Change
  const handleHexChange = (hex: string) => {
    setBackgroundColor(hex);
    const rgb = hexToRGB(hex);
    setRGB(rgb);
    setCMYK(rgbToCMYK(rgb.r, rgb.g, rgb.b));
  };

  // Handle RGB Change
  const handleRGBChange = (channel: "r" | "g" | "b", value: number) => {
    const newRGB = { ...rgb, [channel]: Math.min(Math.max(value, 0), 255) };
    setRGB(newRGB);
    setBackgroundColor(rgbToHex(newRGB.r, newRGB.g, newRGB.b));
    setCMYK(rgbToCMYK(newRGB.r, newRGB.g, newRGB.b));
  };

  // Handle CMYK Change
  const handleCMYKChange = (channel: "c" | "m" | "y" | "k", value: number) => {
    const newCMYK = { ...cmyk, [channel]: Math.min(Math.max(value, 0), 100) };
    setCMYK(newCMYK);

    // Convert CMYK back to RGB (approximation)
    const k = newCMYK.k / 100;
    const r = 255 * (1 - newCMYK.c / 100) * (1 - k);
    const g = 255 * (1 - newCMYK.m / 100) * (1 - k);
    const b = 255 * (1 - newCMYK.y / 100) * (1 - k);

    const clampedRGB = { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
    setRGB(clampedRGB);
    setBackgroundColor(rgbToHex(clampedRGB.r, clampedRGB.g, clampedRGB.b));
  };

  // Separate padding states for "model" and "still life"
  const [modelPadding, setModelPadding] = useState({
    top: 10,
    bottom: 0, // Default to 0 for model
    sides: 10,
  });
  const [stillLifePadding, setStillLifePadding] = useState({
    top: 10,
    bottom: 10,
    sides: 10,
  });

  // Get the current padding based on the selected image type
  const currentPadding =
    imageType === "model" ? modelPadding : stillLifePadding;

  // Map image types to their respective images
  const imageMap: { [key: string]: string } = {
    model: modelImage,
    stillLife: stillLifeImage,
  };

  // Dynamically calculate padding styles
  const getPaddingStyles = () => {
    const paddingTop = (currentPadding.top / imageHeight) * 100; // Percentage of image height
    const paddingBottom = (currentPadding.bottom / imageHeight) * 100; // Percentage of image height
    const paddingLeft = (currentPadding.sides / imageWidth) * 100; // Percentage of image width
    const paddingRight = (currentPadding.sides / imageWidth) * 100; // Percentage of image width

    return {
      paddingTop: `${paddingTop}%`,
      paddingBottom: `${paddingBottom}%`,
      paddingLeft: `${paddingLeft}%`,
      paddingRight: `${paddingRight}%`,
    };
  };

  // Handle padding changes
  const handlePaddingChange = (
    side: "top" | "bottom" | "sides",
    value: number
  ) => {
    const clampedValue = Math.min(Math.max(value, MIN_PX), MAX_PX); // Clamp value between MIN_PX and MAX_PX
    if (imageType === "model") {
      setModelPadding({ ...modelPadding, [side]: clampedValue });
    } else {
      setStillLifePadding({ ...stillLifePadding, [side]: clampedValue });
    }
  };

  return (
    <div className="container mt-4">
      <Row>
        {/* Left Panel: Toggle and Tabs */}
        <Col md={6}>
          {/* Radio Toggle for Image Type */}
          <div className="mb-3">
            <ButtonGroup className="d-flex">
              <ToggleButton
                id="radio-model" // Unique ID for the "Model" button
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
                id="radio-stillLife" // Unique ID for the "Still Life" button
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

          {/* Tabs */}
          <Tabs
            defaultActiveKey="imageSize"
            id="settings-tabs"
            className="mb-3"
          >
            {/* Tab 1: Image Size */}
            <Tab eventKey="imageSize" title="Image Size">
              <Form>
                <Form.Group controlId="imageWidthControl">
                  <Form.Label>Image Width (px)</Form.Label>
                  <Form.Control
                    type="text" // Change to "text" to remove the spinner
                    value={imageWidth}
                    onChange={(e) => {
                      const value = Math.min(
                        Math.max(Number(e.target.value), MIN_PX), // Validate input as a number
                        MAX_PX
                      );
                      setImageWidth(value);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="imageHeightControl">
                  <Form.Label>Image Height (px)</Form.Label>
                  <Form.Control
                    type="text" // Change to "text" to remove the spinner
                    value={imageHeight}
                    onChange={(e) => {
                      const value = Math.min(
                        Math.max(Number(e.target.value), MIN_PX), // Validate input as a number
                        MAX_PX
                      );
                      setImageHeight(value);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="aspectRatioDisplay">
                  <Form.Label>Aspect Ratio</Form.Label>
                  <Form.Control
                    type="text"
                    value={getAspectRatio()} // Display the calculated aspect ratio
                    readOnly // Make the field non-editable
                  />
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
                    min={MIN_PX}
                    max={MAX_PX}
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
                    min={MIN_PX}
                    max={MAX_PX}
                    onChange={(e) =>
                      handlePaddingChange("bottom", Number(e.target.value))
                    }
                    disabled={imageType === "model"} // Disable input for bottom padding if "model" is selected
                  />
                </Form.Group>
                <Form.Group controlId="paddingSidesControl">
                  <Form.Label>Padding Sides (px)</Form.Label>
                  <Form.Control
                    type="number"
                    value={currentPadding.sides}
                    min={MIN_PX}
                    max={MAX_PX}
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
                {/* Color Picker Section */}
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
                </div>{" "}
                {/* Hex Field Section */}
                <div className="p-2 mb-2 bg-light rounded shadow-sm">
                  <Form.Group controlId="backgroundColorControl">
                    <Row className="align-items-center">
                      <Col xs="auto">
                        <Form.Label className="mb-0 me-2">Hex Code:</Form.Label>
                      </Col>
                      <Col className="d-flex align-items-center">
                        <span className="text-muted me-1">#</span>{" "}
                        {/* Display the # closer to the input */}
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
                          isInvalid={
                            !/^#[0-9a-fA-F]{6}$/.test(`#${inputValue}`)
                          } // Check if the hex code is valid (6 characters)
                          spellCheck="false" // Disable spellchecking
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </div>
                {/* RGB Fields Section */}
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
                          onChange={(e) =>
                            handleRGBChange("r", Number(e.target.value))
                          }
                          className="form-control-sm" // Smaller input field
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
                          onChange={(e) =>
                            handleRGBChange("g", Number(e.target.value))
                          }
                          className="form-control-sm" // Smaller input field
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
                          onChange={(e) =>
                            handleRGBChange("b", Number(e.target.value))
                          }
                          className="form-control-sm" // Smaller input field
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </div>
                {/* CMYK Fields Section */}
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
                          onChange={(e) =>
                            handleCMYKChange("c", Number(e.target.value))
                          }
                          className="form-control-sm" // Smaller input field
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
                          onChange={(e) =>
                            handleCMYKChange("m", Number(e.target.value))
                          }
                          className="form-control-sm" // Smaller input field
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
                          onChange={(e) =>
                            handleCMYKChange("y", Number(e.target.value))
                          }
                          className="form-control-sm" // Smaller input field
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
                          onChange={(e) =>
                            handleCMYKChange("k", Number(e.target.value))
                          }
                          className="form-control-sm" // Smaller input field
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </div>
              </Form>
            </Tab>
          </Tabs>
        </Col>

        {/* Right Panel: Preview */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <div
            style={{
              ...getPaddingStyles(), // Apply dynamic padding styles
              backgroundColor: backgroundColor,
              border: "1px solid #ccc",
              display: "flex",
              alignItems: "flex-end", // Anchor the image to the bottom of the bounding box
              justifyContent: "center", // Keep the image horizontally centered
              overflow: "hidden", // Ensure the image doesn't overflow the bounding box

              // Enforce the aspect ratio using CSS
              aspectRatio: `${imageWidth} / ${imageHeight}`, // Use the chosen aspect ratio
              width: "100%", // Allow the bounding box to scale with the container
              maxWidth: "80vw", // Ensure the bounding box doesn't exceed 80% of the viewport width
              maxHeight: "80vh", // Ensure the bounding box doesn't exceed 80% of the viewport height
            }}
          >
            <img
              src={imageMap[imageType]} // Dynamically select the image based on the imageType state
              alt={
                imageType === "model" ? "Model Preview" : "Still Life Preview"
              }
              style={{
                width: "100%", // Ensure the image fills the bounding box width
                height: "100%", // Ensure the image fills the bounding box height
                objectFit: "contain", // Maintain aspect ratio and fit within the bounding box
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Order;
