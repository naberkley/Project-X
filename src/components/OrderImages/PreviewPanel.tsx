import React, { useMemo } from "react";

interface PreviewPanelProps {
  imageType: string;
  imageMap: { [key: string]: string };
  colorState: { backgroundColor: string };
  getPaddingStyles: { [key: string]: string };
  imageWidth: number;
  imageHeight: number;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  imageType,
  imageMap,
  colorState,
  getPaddingStyles,
  imageWidth,
  imageHeight,
}) => {
  const previewStyles = useMemo(
    () => ({
      ...getPaddingStyles,
      backgroundColor: colorState.backgroundColor,
      border: "1px solid #ccc",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      overflow: "hidden",
      aspectRatio: `${imageWidth} / ${imageHeight}`,
      width: "100%",
      maxWidth: "80vw",
      maxHeight: "80vh",
    }),
    [getPaddingStyles, colorState.backgroundColor, imageWidth, imageHeight]
  );

  return (
    <div style={previewStyles}>
      <img
        src={imageMap[imageType]}
        alt={imageType === "model" ? "Model Preview" : "Still Life Preview"}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default React.memo(PreviewPanel);
