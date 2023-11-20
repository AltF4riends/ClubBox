import { ReactNode } from "react";
import background from "./Forgot_copy.png";

interface Props {
  children: ReactNode;
}

const BackgroundFPassword = ({ children }: Props) => {
  return (
    <div
      style={{
        backgroundImage: `url('${background}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100vw 100vh",
        height: 100 + "vh",
        width: 100 + "vw",
        margin: 0,
        padding: 0,
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundFPassword;
