import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const BackgroundEditPersonalDetails = ({ children }: Props) => {
  return (
    <div
      style={{
        background: "#fff",
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          content: "",
          background: "rgba(0, 0, 0, 0.6)",
          position: "relative",
          margin: 0,
          padding: 0,
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BackgroundEditPersonalDetails;
