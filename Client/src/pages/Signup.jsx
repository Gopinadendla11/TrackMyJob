import React, { useState } from "react";
import BannerImg from "../images/banner image.png";
import { AuthServiceRegister } from "../services/AuthService";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMsg] = useState("");

  const onRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await AuthServiceRegister(
      firstName,
      lastName,
      email,
      password
    );
    //console.log(response);
    setLoading(false);
    if (response.status === 200) window.location.href = "/";
    else setErrorMsg(response.data);
  };

  const [loading, setLoading] = useState(false);

  return (
    <div className="h-screen w-screen bg-indigo-400 flex justify-center items-center lg:px-24 lg:py-16 sm:px-4 sm:py-4">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="w-full h-full rounded-lg bg-white drop-shadow-xl flex">
        <div className="hidden lg:basis-3/5 lg:p-8 lg:flex lg:flex-col lg:items-center lg:justify-start lg:content-center">
          <img className=" w-3/5 h-auto " src={BannerImg} alt="banner"></img>
        </div>
        <div className="lg:basis-2/5 p-6 pt-6 ">
          <p className="text-[20px] font-bold mt-8">
            Welcome to TrackMyJob !!!
          </p>
          <p className="text-[14px] text-gray-400 lg:mt-2">
            Register Your Account here.
          </p>
          <form>
            <div className="mt-4 ">
              <p className="text-[16px] font-bold">First Name</p>
              <input
                placeholder="Enter Your First Name"
                className="w-full lg:w-2/3 p-2 my-3 rounded-md border-[2px] border-solid border-primary"
                type="name"
                required
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              ></input>
            </div>
            <div>
              <p className="text-[16px] font-bold">Last Name</p>
              <input
                placeholder="Enter Your Last Name"
                className="w-full lg:w-2/3 p-2 my-3 rounded-md border-[2px] border-solid border-primary"
                type="name"
                required
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              ></input>
            </div>
            <div className="">
              <p className="text-[16px] font-bold">Email</p>
              <input
                placeholder="Enter Your Email"
                className="w-full lg:w-2/3 p-2 my-3 rounded-md border-[2px] border-solid border-primary"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </div>
            <p className="text-[16px] font-bold">Password</p>
            <div className="relative w-full lg:w-2/3 my-3 ">
              <input
                className="p-2 w-full rounded-md border-[2px] border-solid border-primary"
                placeholder="Your Password"
                type={isPasswordVisible ? "text" : "password"}
                onChange={(event) => setPassword(event.target.value)}
                required
                value={password}
              ></input>
              {isPasswordVisible ? (
                <AiOutlineEyeInvisible
                  className="absolute right-2 top-3 w-6 h-6 z-10"
                  onClick={() => setIsPasswordVisible(false)}
                ></AiOutlineEyeInvisible>
              ) : (
                <AiFillEye
                  className="absolute right-2 top-3 w-6 h-6 z-10"
                  onClick={() => setIsPasswordVisible(true)}
                ></AiFillEye>
              )}
            </div>
            <p className="text-[16px] text-red-700">{errorMessage}</p>
            <input
              className="px-6 py-2 my-5 rounded-xl border-solid border-2  bg-primary text-white"
              type="submit"
              value="Signup"
              onClick={onRegister}
            ></input>
          </form>
          <a className="font-bold text-primary" href="/">
            Click Here to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
