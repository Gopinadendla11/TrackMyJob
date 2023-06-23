import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import { AuthServiceResetPassword } from "../services/AuthService";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const ResetPassword = () => {
  const { token } = useParams();
  const [isValidToken, setIsValidToken] = useState(false);
  const [decodedToken, setDecodedToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    // Verify the token when the component mounts
    verifyToken();
  }, []);

  const HandlePasswordReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    const response = await AuthServiceResetPassword(
      decodedToken.email,
      newPassword
    );
    setLoading(false);

    if (response.status === 200) {
      setAlert(true);
      setAlertMsg("The Password has been updated Successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else setError(response.data);
  };

  const verifyToken = () => {
    try {
      const myDecodedToken = decodeToken(token);
      setDecodedToken(myDecodedToken);
      const isMyTokenExpired = isExpired(token);

      setIsValidToken(!isMyTokenExpired);
    } catch (error) {
      setIsValidToken(false);
    }
  };

  if (!isValidToken) {
    return (
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Invalid Link
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, This password reset link is invalid or Expired. Please Try
            again.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/forgot-password"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back
            </a>
          </div>
        </div>
      </main>
    );
  } else
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
        <div className="w-full sm:max-w-md p-6 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={HandlePasswordReset}>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block font-medium mb-2">
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block font-medium mb-2"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md"
            >
              Reset Password
            </button>
            <button
              className="w-full bg-primary text-white py-2 px-4 rounded-md mt-4"
              onClick={(e) => {
                e.preventDefault();
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

export default ResetPassword;
