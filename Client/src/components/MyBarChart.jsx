import React, { useState, useEffect } from "react";
import { GetApplicationStats } from "../services/ApplicationService";

import ReactApexChart from "react-apexcharts";

const MyBarChart = (props) => {
  const [dates, setDates] = useState([]);
  const [values, setValues] = useState([]);

  const getData = async () => {
    const response = await GetApplicationStats();
    if (response.status === 200) {
      const data = response.data;
      //console.log(data);
      const datesArr = data.map((item) => item._id);
      const valuesArr = data.map((item) => item.count);
      setDates(datesArr);
      setValues(valuesArr);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const chartData = {
    chart: {
      type: "bar",
      id: "apexchart-example",
      foreColor: "black",
      height: "10px",
    },
    plotOptions: {
      bar: {
        columnWidth: "40px",
      },
    },
    responsive: [
      {
        breakpoint: 1400,
        options: {
          chart: {
            height: "auto",
          },
        },
      },
      {
        breakpoint: 500,
        options: {
          chart: {
            height: "250px",
          },
        },
      },
    ],
    xaxis: {
      categories: dates,
    },

    legend: {
      width: 400,
    },
    fill: {
      colors: ["#4f46e5"],
    },
    stroke: {
      colors: ["#4f46e5"],
      width: 2,
    },

    series: [
      {
        name: "Number of Jobs Applied",
        type: "column",
        data: values,
      },
    ],
  };

  return (
    <div className="pt-6">
      <ReactApexChart
        options={chartData}
        series={chartData.series}
        height="400px"
      />
    </div>
  );
};

export default MyBarChart;
