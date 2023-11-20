import { ReactNode } from "react";
import React from 'react'

interface Props {
  children: ReactNode;
}

const RightBoxRegP1 = ({children}:Props) => {
    return (
            <div
      style={{
        margin: 0,
        padding: 0,
        height: 90 + "vh", //
        width: 45 + "vw", //
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: "white",//white
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>

        

      <div
        className="container-sm"
        style={{
          width: 700 + "px",
          height: 800 + "px",
          position: "relative",
          margin: 0,
          paddingTop: 70 + "px",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "flex-start;", //center
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {children}

      </div>
    </div>
    )
}

export default RightBoxRegP1