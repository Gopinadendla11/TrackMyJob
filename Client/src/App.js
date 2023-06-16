import React from "react";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import RequireAuth from "./pages/RequireAuth";
import NewApplication from "./pages/NewApplication";
import { Applications } from "./pages/Applications";
import { Profile } from "./pages/Profile";

const App = () => {
  return (
    <div className="App font-Poppins">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          ></Route>
          <Route path="/login" exact Component={Login}></Route>
          <Route path="/signup" exact Component={Signup}></Route>
          <Route
            path="/new-application"
            exact
            element={
              <RequireAuth>
                <NewApplication />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/applications"
            exact
            element={
              <RequireAuth>
                <Applications />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/profile"
            exact
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          ></Route>

          <Route path="/404" exact Component={ErrorPage}></Route>
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
