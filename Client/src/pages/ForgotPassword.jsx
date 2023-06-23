import React, { useState } from "react";
import { AuthServiceForgotPassword } from "../services/AuthService";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    //console.log(`Submitted email: ${email}`);
    setLoading(true);
    const response = await AuthServiceForgotPassword(email);
    setLoading(false);

    if (response.status === 200) {
      setAlert(true);
      setAlertMsg("A Password reset link has been sent to your email");
    } else setErrorMsg(response.data);
  };

  return (
    <div className="bg-purple-100 flex justify-center items-center h-screen">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={alert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={() => setAlert(false)}
      >
        <Alert
          onClose={() => setAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
      <div className="bg-white p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12">
          Forgot Password?
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="email" className="mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="p-3 border  border-primary  rounded mb-8"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className="text-[16px] text-red-700">{errorMessage}</p>
          <button
            type="submit"
            className="px-6 py-2  text-white rounded bg-primary mb-4"
          >
            Submit
          </button>
          <button
            className="px-6 py-2  text-white rounded bg-primary mb-4"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
