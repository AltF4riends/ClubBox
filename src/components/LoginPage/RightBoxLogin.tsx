import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
const RightBoxLogin = ({ children }: Props) => {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        height: 80 + "vh",
        width: 25 + "vw",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        overflowWrap: "anywhere",
      }}
    >
      <div
        className="container-sm"
        style={{
          width: "22.65vw",
          height: "49.75vh",
          position: "relative",

          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default RightBoxLogin;
