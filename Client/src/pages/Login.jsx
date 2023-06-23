import React, { useState } from "react";
import BannerImg from "../images/banner image.png";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AuthServiceLogin } from "../services/AuthService";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMsg] = useState("");

  const onLoginSubmit = async (event) => {
    //console.log("OnLoginSubmit event called");
    event.preventDefault();
    setLoading(true);
    const response = await AuthServiceLogin(email, password);
    setLoading(false);

    if (response.status === 200) {
      window.location.href = "/";
    } else setErrorMsg(response.data);
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
        <div className="lg:basis-3/5 p-8 hidden lg:flex lg:flex-col lg:items-center lg:justify-start lg:content-center">
          {/* <div className="flex justify-start">
            <img className="w-24 h-24 float-left" src={Logo} />
          </div> */}

          <img
            className=" lg:w-3/5 lg:h-auto "
            src={BannerImg}
            alt="banner"
          ></img>
        </div>
        <div className="lg:basis-2/5 lg:p-12 p-6 pt-16">
          <p className="text-[24px] font-bold mt-8">
            Welcome to TrackMyJob !!!
          </p>
          <p className="text-[14px] text-gray-400 mt-2">
            Login into your Account
          </p>
          <form>
            <div className=" mt-8 lg:mt-16">
              <p className="text-[16px] font-bold">Email</p>
              <input
                placeholder="Enter Your Email"
                className="w-full lg:w-2/3 p-3 my-2 rounded-md border-[2px] border-solid border-primary"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </div>
            <div className="mt-3">
              <p className="text-[16px] font-bold">Password</p>
              <div className="w-full relative lg:w-2/3 my-2 ">
                <input
                  className="p-3 w-full rounded-md border-[2px] border-solid border-primary"
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
                <div className="flex mt-4 justify-end">
                  <a
                    className=" font-bold text-primary text-sm"
                    href="/forgot-password"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
            </div>

            <p className="text-[16px] text-red-700 mb-2">{errorMessage}</p>

            <input
              className="px-6 py-2 rounded-xl border-solid border-2  bg-primary text-white"
              type="submit"
              value="Login"
              onClick={onLoginSubmit}
            ></input>

            <div className="flex mt-4">
              <p>Don't Have an Account ? </p> &nbsp;
              <a className="font-bold text-primary" href="/signup">
                Click Here to Signup
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
