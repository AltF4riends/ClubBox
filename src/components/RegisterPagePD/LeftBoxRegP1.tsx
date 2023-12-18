import { ReactNode } from "react";
import smallClubBox from "../RegisterPagePD/SmallerClub.jpg";
import custInterview from "../RegisterPagePD/customerInterview.png";

const LeftBoxRegP1 = () => {

    return (
      <div
      style={{
        margin: 0,
        padding: 0,
        height: 90 + "vh", //
        width: 15 + "vw", //
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: "maroon",//
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: "0.8"
      }}>
      
          <div
            className="container-sm"
            style={{
              width: 290 + "px",
              height: 700 + "px",
              position: "relative",

              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}>

                <div
                  style={{
                  width: 190 + "px",
                  height: 100 + "px",
                }}>

                <img
                        src={smallClubBox}
                        style={{
                          height: 100 + "px",
                          width: 190 + "px",
                        }}
                        alt="ClubBox Logo"/>
                </div>

                <div>
                <h4 
                style={{
                  color:"white"
                }}>ClubBox System</h4>
                </div>

                <div
                style={{
                  marginTop:"125px",
                }}>
                  <h2
                  style={{
                    color:"white"
                  }}>“A Few Clicks Away To Unpack and Explore The Abundance Of Clubs”</h2></div>

                <div
                style={{
                  marginTop: 100 + "px",
                  width: 200 + "px",
                  height: 200 + "px",
                }}>
                    <img
                      src={custInterview}
                      style={{
                        height: 200 + "px",
                        width: 200 + "px",
                      }}
                      alt="ClubBox Logo"/>
                </div>
      </div>
    </div>
    )
}

export default LeftBoxRegP1
