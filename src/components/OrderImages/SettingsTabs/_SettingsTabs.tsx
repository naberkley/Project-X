import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import ImageSizeTab from "./ImageSizeTab";
import PaddingTab from "./PaddingTab";
import BackgroundTab from "./BackgroundTab";
import CroppingTab from "./CroppingTab";
import { useOrderImagesContext } from "../_OrderImagesContext";

const SettingsTabs: React.FC = () => {
  const {
    currentPadding,
    handlePaddingChange,
    imageType,
    disableTopPadding,
    selectedCroppingOption,
    setSelectedCroppingOption,
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
  } = useOrderImagesContext();

  // State to manage the active tab
  const [activeTab, setActiveTab] = useState<string>("imageSize");

  // Effect to handle tab switching when imageType changes
  useEffect(() => {
    if (imageType !== "model" && activeTab === "cropping") {
      setActiveTab("background"); // Default to "background" tab
    }
  }, [imageType, activeTab]);

  return (
    <Tabs
      id="settings-tabs"
      className="mb-3"
      activeKey={activeTab}
      onSelect={(key) => setActiveTab(key || "imageSize")} // Update active tab on user selection
    >
      {/* Tab 1: Image Size */}
      <Tab eventKey="imageSize" title="Image Size">
        <ImageSizeTab
          imageWidth={imageWidth}
          setImageWidth={setImageWidth}
          imageHeight={imageHeight}
          setImageHeight={setImageHeight}
          aspectRatio={aspectRatio}
        />
      </Tab>

      {/* Tab 2: Padding Settings */}
      <Tab eventKey="padding" title="Padding">
        <PaddingTab
          currentPadding={currentPadding}
          handlePaddingChange={handlePaddingChange}
          imageType={imageType}
          disableTopPadding={disableTopPadding}
        />
      </Tab>

      {/* Tab 3: Background Color Settings */}
      <Tab eventKey="background" title="Background">
        <BackgroundTab
          colorState={colorState}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleHexChange={handleHexChange}
          handleRGBChange={handleRGBChange}
          handleCMYKChange={handleCMYKChange}
        />
      </Tab>

      {/* Tab 4: Cropping (conditionally rendered) */}
      {imageType === "model" && (
        <Tab eventKey="cropping" title="Cropping">
          <CroppingTab
            selectedCroppingOption={selectedCroppingOption}
            setSelectedCroppingOption={setSelectedCroppingOption}
          />
        </Tab>
      )}
    </Tabs>
  );
};

export default SettingsTabs;
