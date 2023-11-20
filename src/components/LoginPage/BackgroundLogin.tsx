//rafce

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const BackgroundLogin = ({ children }: Props) => {
  return (
    <div>
      {" "}
      <div
        style={{
          backgroundImage:
            "url('https://assets.hmetro.com.my/images/articles/j-utm_HMfield_image_socialmedia.var_1601624192.jpg')",
          position: "absolute",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: 100 + "vh",
          width: 100 + "vw",
          margin: 0,
          padding: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            backgroundImage:
              "url('https://safoodbank.org/wp-content/uploads/2023/08/3-ribbon-png-image.png')",

            backgroundSize: "cover",
            margin: 0,
            padding: 0,
            height: 100 + "vh",
            width: 100 + "vw",
          }}
        >
          <div
            style={{
              content: "",
              background: "rgba(0,0,0,0.6)",
              position: "relative",
              margin: 0,
              padding: 0,
              height: 100 + "vh",
              width: 100 + "vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundLogin;
