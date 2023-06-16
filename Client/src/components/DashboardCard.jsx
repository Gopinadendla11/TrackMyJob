import React from "react";

const DashboardCard = (props) => {
  return (
    <div
      className={`w-full max-w-[300px] rounded-lg p-8 flex justify-between bg-white drop-shadow-xl m-2 ${props.className}`}
    >
      <div>
        <p className="text-md xl:text-2xl font-bold">{props.number}</p>
        <p className="text-[14px] xl:text-[16px] ">{props.name}</p>
      </div>
      <img
        alt="dashboard data"
        className="w-8 h-8 xl:w-12 xl:h-12"
        src={props.image}
      ></img>
    </div>
  );
};

export default DashboardCard;
