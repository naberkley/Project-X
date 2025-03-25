import React, { useMemo, useState, useEffect } from "react";
import { useOrderImagesContext } from "./_OrderImagesContext";

const PreviewPanel: React.FC = () => {
  const {
    imageType,
    colorState,
    getPaddingStyles,
    imageWidth,
    imageHeight,
    imageMap,
  } = useOrderImagesContext();

  // Step 1: Create a cache for images
  const [imageCache, setImageCache] = useState<{ [key: string]: string }>({});
  const [currentImage, setCurrentImage] = useState<string>(imageMap);

  // Step 2: Preload the image and store it in the cache
  useEffect(() => {
    if (!imageCache[imageMap]) {
      const img = new Image();
      img.src = imageMap;
      img.onload = () => {
        setImageCache((prevCache) => ({
          ...prevCache,
          [imageMap]: imageMap, // Store the preloaded image in the cache
        }));
        setCurrentImage(imageMap); // Update the current image once it's loaded
      };
    } else {
      // If the image is already cached, use it directly
      setCurrentImage(imageCache[imageMap]);
    }
  }, [imageMap, imageCache]);

  // Step 3: Define styles for the preview panel
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
        src={currentImage} // Use the cached or preloaded image
        alt={imageType}
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
