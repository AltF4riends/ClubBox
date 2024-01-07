// ImageContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

type ImageContextType = {
  eventImageUrl: string | null;
  eventImage: File | null;
  setEventImageInfo: (url: string, file: File) => void;
};

type ImageProviderProps = {
  children: ReactNode;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const EventImageContext = (): ImageContextType => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("EventImageContext must be used within an ImageProvider");
  }
  return context;
};

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [eventImageUrl, setEventImageUrl] = useState<string | null>(null);
  const [eventImage, setEventImage] = useState<File | null>(null);

  const setEventImageInfo = (url: string, file: File) => {
    setEventImageUrl(url);
    setEventImage(file);
  };

  return (
    <ImageContext.Provider
      value={{ eventImageUrl, eventImage, setEventImageInfo }}
    >
      {children}
    </ImageContext.Provider>
  );
};
