import React from "react";

const Card = (props) => {
  return (
    <div
      className={`rounded-lg p-4 bg-white drop-shadow-xl ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
