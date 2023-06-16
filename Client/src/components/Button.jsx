import React from "react";

const Button = (props) => {
  return (
    <button
      className={` px-6 py-3 my-3 rounded-xl border-solid border-2 border-secondary bg-primary text-white text-sm {props.extrastyles}`}
    >
      {props.btnText}
    </button>
  );
};

export default Button;
