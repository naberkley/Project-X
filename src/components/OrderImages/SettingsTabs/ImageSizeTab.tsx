import React from "react";
import { Form } from "react-bootstrap";

interface ImageSizeTabProps {
  imageWidth: number;
  setImageWidth: (value: number) => void;
  imageHeight: number;
  setImageHeight: (value: number) => void;
  aspectRatio: string;
}

const ImageSizeTab: React.FC<ImageSizeTabProps> = ({
  imageWidth,
  setImageWidth,
  imageHeight,
  setImageHeight,
  aspectRatio,
}) => {
  return (
    <Form>
      <Form.Group controlId="imageWidthControl">
        <Form.Label>Image Width (px)</Form.Label>
        <Form.Control
          type="text"
          value={imageWidth}
          onChange={(e) => {
            const value = Math.min(Math.max(Number(e.target.value), 0), 20000);
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
            const value = Math.min(Math.max(Number(e.target.value), 0), 20000);
            setImageHeight(value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="aspectRatioDisplay">
        <Form.Label>Aspect Ratio</Form.Label>
        <Form.Control type="text" value={aspectRatio} readOnly />
      </Form.Group>
    </Form>
  );
};

export default ImageSizeTab;
