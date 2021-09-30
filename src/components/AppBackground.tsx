import { useLocation } from "react-router-dom";

function AppBackground() {
  const location = useLocation();

  return (
    <div
      style={{ zIndex: -10 }}
      className={
        "absolute w-full h-full top-0 left-0 transition-colors " +
        (location.pathname === "/nftdrop" ? "bg-black" : "bg-mainbg")
      }
    />
  );
}

export default AppBackground;
