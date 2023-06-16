import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ApplicationsImg from "../images/applications.png";
import OnlineAssessmentImg from "../images/binary-code.png";
import InterviewImg from "../images/job-interview.png";
import RejectedImg from "../images/file.png";
import { GetUserData } from "../services/UserDataService";
import MyBarChart from "../components/MyBarChart";
import MyPieChart from "../components/MyPieChart";
import DashboardCard from "../components/DashboardCard";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [n_applied, setApplied] = useState("");
  const [n_assessments, setAssessments] = useState("");
  const [n_interviews, setInterviews] = useState("");
  const [n_rejected, setRejected] = useState("");

  const getData = async () => {
    const response = await GetUserData();

    if (response.status === 200) {
      const user = response.data;
      let updateName =
        user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1);
      setName(updateName);
      setApplied(user.n_applied);
      setAssessments(user.n_assessments);
      setInterviews(user.n_interviews);
      setRejected(user.n_rejected);
    }
  };

  useEffect(() => {
    getData();
    setLoading(false);
  }, []);

  const [loading, setLoading] = useState(true);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="h-screen w-screen flex overflow-scroll">
        <Sidebar />
        <div className="h-screen bg-purple-50 w-full ">
          <p className="px-5 xl:px-20 py-12 text-4xl font-bold text-center sm:text-left">
            Welcome {name}
          </p>
          {/* Dashboard Cards */}
          <div className="flex flex-wrap md:flex-nowrap justify-center xl:justify-between px-5 xl:px-20 2xl:space-x-12 ">
            <DashboardCard
              name="Job Applications"
              number={n_applied}
              image={ApplicationsImg}
            />
            <DashboardCard
              name="Online Assessments"
              number={n_assessments}
              image={OnlineAssessmentImg}
            />
            <DashboardCard
              name="Interviews"
              number={n_interviews}
              image={InterviewImg}
            />
            <DashboardCard
              name="Rejected"
              number={n_rejected}
              image={RejectedImg}
            />
          </div>

          {/* Charts */}
          <div className="flex flex-col md:flex-row  justify-center w-full px-8 xl:px-20 pt-12">
            <div className="basis-2/3 xl:mr-8 rounded-lg p-4 md:p-8 flex-col justify-between bg-white drop-shadow-xl mb-6">
              <p className="font-bold text-[18px]">
                Number of jobs applied everyday
              </p>
              <MyBarChart />
            </div>
            <div className="basis-1/3 rounded-lg p-8 flex-col justify-between bg-white drop-shadow-xl mb-6">
              <p className="font-bold">Job Hunt progress</p>
              <MyPieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
