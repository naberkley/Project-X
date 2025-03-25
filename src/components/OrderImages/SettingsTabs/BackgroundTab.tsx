import React, { useRef } from "react";
import { Form } from "react-bootstrap";
import ColorPicker from "../ColorPicker";
import HexCodeField from "../HexCodeField";
import RGBFields from "../RGBFields";
import CMYKFields from "../CMYKFields";

interface BackgroundTabProps {
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
}

const BackgroundTab: React.FC<BackgroundTabProps> = ({
  colorState,
  inputValue,
  setInputValue,
  handleHexChange,
  handleRGBChange,
  handleCMYKChange,
}) => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Debounced version of handleHexChange
  const debouncedHandleHexChange = (hex: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      handleHexChange(hex);
    }, 0); // Debounce delay set to 0ms
  };

  return (
    <Form>
      {/* Color Picker */}
      <Form.Group controlId="colorPickerControl">
        <ColorPicker
          backgroundColor={colorState.backgroundColor}
          handleHexChange={debouncedHandleHexChange}
        />
      </Form.Group>

      {/* Hex Code Field */}
      <Form.Group controlId="hexCodeFieldControl">
        <HexCodeField
          inputValue={inputValue}
          backgroundColor={colorState.backgroundColor}
          setInputValue={setInputValue}
          handleHexChange={handleHexChange}
        />
      </Form.Group>

      {/* RGB Fields */}
      <Form.Group controlId="rgbFieldsControl">
        <RGBFields rgb={colorState.rgb} handleRGBChange={handleRGBChange} />
      </Form.Group>

      {/* CMYK Fields */}
      <Form.Group controlId="cmykFieldsControl">
        <CMYKFields
          cmyk={colorState.cmyk}
          handleCMYKChange={handleCMYKChange}
        />
      </Form.Group>
    </Form>
  );
};

export default BackgroundTab;
