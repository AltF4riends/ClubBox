// ImageContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

type ImageContextType = {
  imageUrl: string | null;
  image: File | null;
  setImageInfo: (url: string, file: File) => void;
  setProfileImage: (url: string) => void;
};

type ImageProviderProps = {
  children: ReactNode;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const useImageContext = (): ImageContextType => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const setImageInfo = (url: string, file: File) => {
    setImageUrl(url);
    setImage(file);
  };

  const setProfileImage = (url: string) => {
    setImageUrl(url);
  };

  return (
    <ImageContext.Provider
      value={{ imageUrl, image, setImageInfo, setProfileImage }}
    >
      {children}
    </ImageContext.Provider>
  );
};
