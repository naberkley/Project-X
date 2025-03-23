import React, { useState, useEffect } from "react";
import { useMemo } from "react";
import { Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";
import { debounce } from "lodash";
import SettingsTabs from "./SettingsTabs";
import PreviewPanel from "./PreviewPanel";
import { hexToRGB, rgbToHex, rgbToCMYK } from "../../utils/ColorUtils";

import modelImage from "../../assets/dynamic_preview/model_KO.png"; // Import the model image
import stillLifeImage from "../../assets/dynamic_preview/purse_KO.png"; // Import the still life image

function OrderImages() {
  // Constants for min and max values
  const MIN_PX = 0;
  const MAX_PX = 20000;

  // State for settings
  const [imageType, setImageType] = useState("model"); // Default image type
  const [imageWidth, setImageWidth] = useState(2000); // Default image width in px
  const [imageHeight, setImageHeight] = useState(2000); // Default image height in px

  const [colorState, setColorState] = useState({
    backgroundColor: "#ffffff",
    rgb: { r: 255, g: 255, b: 255 },
    cmyk: { c: 0, m: 0, y: 0, k: 0 },
  });

  const [inputValue, setInputValue] = useState(
    colorState.backgroundColor.replace("#", "")
  );

  useEffect(() => {
    setInputValue(colorState.backgroundColor.replace("#", ""));
  }, [colorState.backgroundColor]);

  // Helper function to calculate and format the aspect ratio
  const aspectRatio = useMemo(() => {
    if (imageWidth === 0 || imageHeight === 0) return "N/A";
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(imageWidth, imageHeight);
    const widthRatio = Math.round(imageWidth / divisor);
    const heightRatio = Math.round(imageHeight / divisor);
    return `${widthRatio}:${heightRatio}`;
  }, [imageWidth, imageHeight]);

  const debouncedHexChange = useMemo(
    () =>
      debounce((hex: string) => {
        const rgb = hexToRGB(hex);
        const cmyk = rgbToCMYK(rgb.r, rgb.g, rgb.b);

        setColorState((prevState) => ({
          ...prevState,
          backgroundColor: hex,
          rgb,
          cmyk,
        }));
      }, 0), // 0ms delay
    []
  );

  const handleHexChange = (hex: string) => {
    debouncedHexChange(hex);
  };

  useEffect(() => {
    return () => {
      debouncedHexChange.cancel(); // Cancel any pending debounced calls
    };
  }, [debouncedHexChange]);

  // Handle RGB Change
  const handleRGBChange = (channel: "r" | "g" | "b", value: number) => {
    const newRGB = {
      ...colorState.rgb,
      [channel]: Math.min(Math.max(value, 0), 255),
    };
    const newHex = rgbToHex(newRGB.r, newRGB.g, newRGB.b);
    const newCMYK = rgbToCMYK(newRGB.r, newRGB.g, newRGB.b);

    setColorState((prevState) => ({
      ...prevState,
      rgb: newRGB,
      backgroundColor: newHex,
      cmyk: newCMYK,
    }));
  };

  // Handle CMYK Change
  const handleCMYKChange = (channel: "c" | "m" | "y" | "k", value: number) => {
    const newCMYK = {
      ...colorState.cmyk,
      [channel]: Math.min(Math.max(value, 0), 100),
    };

    const k = newCMYK.k / 100;
    const r = 255 * (1 - newCMYK.c / 100) * (1 - k);
    const g = 255 * (1 - newCMYK.m / 100) * (1 - k);
    const b = 255 * (1 - newCMYK.y / 100) * (1 - k);

    const clampedRGB = { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
    const newHex = rgbToHex(clampedRGB.r, clampedRGB.g, clampedRGB.b);

    setColorState((prevState) => ({
      ...prevState,
      cmyk: newCMYK,
      rgb: clampedRGB,
      backgroundColor: newHex,
    }));
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
  const imageMap = useMemo(
    () => ({
      model: modelImage,
      stillLife: stillLifeImage,
    }),
    []
  );

  // Dynamically calculate padding styles
  const getPaddingStyles = useMemo(() => {
    const paddingTop = (currentPadding.top / imageHeight) * 100;
    const paddingBottom = (currentPadding.bottom / imageHeight) * 100;
    const paddingLeft = (currentPadding.sides / imageWidth) * 100;
    const paddingRight = (currentPadding.sides / imageWidth) * 100;

    return {
      paddingTop: `${paddingTop}%`,
      paddingBottom: `${paddingBottom}%`,
      paddingLeft: `${paddingLeft}%`,
      paddingRight: `${paddingRight}%`,
    };
  }, [currentPadding, imageHeight, imageWidth]);

  const handlePaddingChange = (
    side: "top" | "bottom" | "sides",
    value: number
  ) => {
    if (isNaN(value)) return; // Ignore invalid inputs
    const clampedValue = Math.min(Math.max(value, MIN_PX), MAX_PX);
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
          <SettingsTabs
            colorState={colorState}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleHexChange={handleHexChange}
            handleRGBChange={handleRGBChange}
            handleCMYKChange={handleCMYKChange}
            imageWidth={imageWidth}
            setImageWidth={setImageWidth}
            imageHeight={imageHeight}
            setImageHeight={setImageHeight}
            aspectRatio={aspectRatio}
            currentPadding={currentPadding}
            handlePaddingChange={handlePaddingChange}
            imageType={imageType}
          />
        </Col>

        {/* Right Panel: Preview */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <PreviewPanel
            imageType={imageType}
            imageMap={imageMap}
            colorState={colorState}
            getPaddingStyles={getPaddingStyles}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
          />
        </Col>
      </Row>
    </div>
  );
}

export default OrderImages;
