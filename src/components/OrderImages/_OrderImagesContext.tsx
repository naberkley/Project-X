import React, { createContext, useContext, useState, useMemo } from "react";
import { hexToRGB, rgbToHex, rgbToCMYK } from "../../utils/ColorUtils";

import modelImage_recognizable from "../../assets/dynamic_preview/model_KO_recognizable.png";
import modelImage_nosebridge from "../../assets/dynamic_preview/model_KO_nosebridge.png";
import modelImage_mustache from "../../assets/dynamic_preview/model_KO_mustache.png";
import stillLifeImage from "../../assets/dynamic_preview/purse_KO.png";

// Define the shape of the context
interface OrderImagesContextProps {
  clientName: string;
  setClientName: (value: string) => void;
  jobName: string;
  setJobName: (value: string) => void;
  imageType: string;
  setImageType: (value: string) => void;
  colorState: {
    backgroundColor: string;
    rgb: { r: number; g: number; b: number };
    cmyk: { c: number; m: number; y: number; k: number };
  };
  setColorState: React.Dispatch<
    React.SetStateAction<{
      backgroundColor: string;
      rgb: { r: number; g: number; b: number };
      cmyk: { c: number; m: number; y: number; k: number };
    }>
  >;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleHexChange: (hex: string) => void;
  handleRGBChange: (channel: "r" | "g" | "b", value: number) => void;
  handleCMYKChange: (channel: "c" | "m" | "y" | "k", value: number) => void;
  currentPadding: { top: number; bottom: number; sides: number };
  setCurrentPadding: React.Dispatch<
    React.SetStateAction<{
      top: number;
      bottom: number;
      sides: number;
    }>
  >;
  getPaddingStyles: {
    paddingTop: string;
    paddingBottom: string;
    paddingLeft: string;
    paddingRight: string;
  };
  handlePaddingChange: (
    side: "top" | "bottom" | "sides",
    value: number
  ) => void;
  disableTopPadding: boolean;
  selectedCroppingOption: string;
  setSelectedCroppingOption: (value: string) => void;
  imageWidth: number;
  setImageWidth: (value: number) => void;
  imageHeight: number;
  setImageHeight: (value: number) => void;
  aspectRatio: string;
  imageMap: string;
  pricePerImage: number;
  uploadedFiles: File[];
  totalPrice: number;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  creditCardInfo: {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
  };
  setCreditCardInfo: React.Dispatch<
    React.SetStateAction<{
      cardNumber: string;
      expirationDate: string;
      cvv: string;
    }>
  >;
}

// Create the context
const OrderImagesContext = createContext<OrderImagesContextProps | undefined>(
  undefined
);

// Create a custom hook for consuming the context
export const useOrderImagesContext = () => {
  const context = useContext(OrderImagesContext);
  if (!context) {
    throw new Error(
      "useOrderImagesContext must be used within an OrderImagesProvider"
    );
  }
  return context;
};

// Create a provider component
export const OrderImagesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [clientName, setClientName] = useState("");
  const [jobName, setJobName] = useState("");
  const [imageType, setImageType] = useState("model"); // Default to "model"

  const [imageWidth, setImageWidth] = useState(2000); // Default width
  const [imageHeight, setImageHeight] = useState(2000); // Default height

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const aspectRatio = useMemo(() => {
    const divisor = gcd(imageWidth, imageHeight);
    return `${imageWidth / divisor}:${imageHeight / divisor}`;
  }, [imageWidth, imageHeight]);

  const [pricePerImage /*, setPricePerImage */] = useState(5.0); // Default price per image
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Calculate total price based on the number of uploaded files
  const totalPrice = useMemo(() => {
    return uploadedFiles.length * pricePerImage;
  }, [uploadedFiles, pricePerImage]);

  // Handle file uploads
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUploadedFiles(Array.from(event.target.files));
    }
  };

  // Add creditCardInfo state
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: "#### #### #### ####",
    expirationDate: "",
    cvv: "",
  });

  const [colorState, setColorState] = useState({
    backgroundColor: "#f5f5f5",
    rgb: { r: 245, g: 245, b: 245 },
    cmyk: { c: 3, m: 2, y: 2, k: 0 },
  });

  const [inputValue, setInputValue] = useState(
    colorState.backgroundColor.replace("#", "")
  );

  const handleHexChange = (hex: string) => {
    const rgb = hexToRGB(hex);
    const cmyk = rgbToCMYK(rgb.r, rgb.g, rgb.b);

    setColorState((prevState) => ({
      ...prevState,
      backgroundColor: hex,
      rgb,
      cmyk,
    }));
  };

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

  const [currentPadding, setCurrentPadding] = useState({
    top: 20,
    bottom: 0,
    sides: 10,
  });

  const getPaddingStyles = useMemo(() => {
    return {
      paddingTop: `${(currentPadding.top / imageHeight) * 100}%`,
      paddingBottom: `${(currentPadding.bottom / imageHeight) * 100}%`,
      paddingLeft: `${(currentPadding.sides / imageWidth) * 100}%`,
      paddingRight: `${(currentPadding.sides / imageWidth) * 100}%`,
    };
  }, [currentPadding, imageWidth, imageHeight]);

  const handlePaddingChange = (
    side: "top" | "bottom" | "sides",
    value: number
  ) => {
    setCurrentPadding((prev) => ({ ...prev, [side]: value }));
  };

  const [selectedCroppingOption, setSelectedCroppingOption] =
    useState<string>("Recognizable");

  // Dynamically calculate imageMap based on imageType and selectedCroppingOption
  const imageMap = useMemo(() => {
    if (imageType === "model") {
      switch (selectedCroppingOption) {
        case "Nose Bridge":
          return modelImage_nosebridge;
        case "Mustache":
          return modelImage_mustache;
        default:
          return modelImage_recognizable;
      }
    }
    return stillLifeImage;
  }, [imageType, selectedCroppingOption]);

  const disableTopPadding =
    selectedCroppingOption === "Nose Bridge" ||
    selectedCroppingOption === "Mustache";

  return (
    <OrderImagesContext.Provider
      value={{
        clientName,
        setClientName,
        jobName,
        setJobName,
        imageType,
        setImageType,
        colorState,
        setColorState,
        inputValue,
        setInputValue,
        handleHexChange,
        handleRGBChange,
        handleCMYKChange,
        setCurrentPadding,
        currentPadding,
        getPaddingStyles,
        handlePaddingChange,
        disableTopPadding,
        selectedCroppingOption,
        setSelectedCroppingOption,
        imageWidth,
        setImageWidth,
        imageHeight,
        setImageHeight,
        aspectRatio,
        imageMap,
        pricePerImage,
        uploadedFiles,
        totalPrice,
        handleFileUpload,
        setCreditCardInfo,
        creditCardInfo,
      }}
    >
      {children}
    </OrderImagesContext.Provider>
  );
};
