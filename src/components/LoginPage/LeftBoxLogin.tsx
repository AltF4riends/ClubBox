import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const LeftBoxLogin = ({ children }: Props) => {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        height: 80 + "vh",
        width: 25 + "vw",
        borderColor: "white",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: "maroon",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
        overflowWrap: "anywhere",
      }}
    >
      {children}
    </div>
  );
};

export default LeftBoxLogin;
