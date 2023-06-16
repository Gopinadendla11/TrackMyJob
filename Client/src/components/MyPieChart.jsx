import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { GetUserData } from "../services/UserDataService";

const MyPieChart = () => {
  const [data, setData] = useState([0]);
  const getData = async () => {
    const response = await GetUserData();
    if (response.status === 200) {
      const user = response.data;
      const appStats = [
        user.n_applied,
        user.n_assessments,
        user.n_interviews,
        user.n_rejected,
      ];
      setData(appStats);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const chartData = {
    chart: {
      type: "pie",
      id: "trackmyjob-jobs-percentage",
      foreColor: "black",
    },
    labels: ["Applied", "Online Assessments", "Interviews", "Rejected"],
    fill: {
      colors: ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"],
    },
    stroke: {
      colors: ["white"],
      width: 1,
    },
    legend: {
      position: "bottom",
    },
    series: data,
    // responsive: [
    //   {
    //     breakpoint: 480,
    //     options: {
    //       chart: {
    //         width: 200,
    //       },
    //       legend: {
    //         position: "bottom",
    //       },
    //     },
    //   },
    // ],
  };

  return (
    <div className="py-12">
      <ReactApexChart
        type="pie"
        options={chartData}
        series={chartData.series}
        height="auto"
      />
    </div>
  );
};

export default MyPieChart;
