import React from "react";

const Btn = ({
  children,
  textColor = "white",
  bgColor = "rgb(229, 19, 61)",
  border = "none",
}) => {
  return (
    <button className="mainBtn" style={{ color: textColor, backgroundColor: bgColor, border }}>
      {children}
    </button>
  );
};

export default Btn;
