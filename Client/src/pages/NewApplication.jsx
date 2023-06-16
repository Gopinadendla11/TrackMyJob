import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Formik, Form, Field } from "formik";
import { AddNewApplication } from "../services/ApplicationService";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const NewApplication = () => {
  const [showsidebar, setsidebar] = React.useState(true);

  const toggleSideNav = () => {
    setsidebar((prev) => !prev);
  };
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [sev, setSev] = useState("error");

  const onFormSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const response = await AddNewApplication(values);
    if (response.status === 200) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setAlert(true);
      setSev("success");
      resetForm();
    } else {
      setSev("error");
    }
    setAlert(true);
    setAlertMsg(response.data);
  };

  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <div className="flex ">
        <Sidebar />
        <div className="w-full p-12">
          <Snackbar
            open={alert}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={6000}
            onClose={() => setAlert(false)}
          >
            <Alert
              onClose={() => setAlert(false)}
              severity={sev}
              sx={{ width: "100%" }}
            >
              {alertMsg}
            </Alert>
          </Snackbar>
          <Formik
            initialValues={{
              companyName: "",
              jobRole: "",
              jobDesc: "",
              jobPortal: "",
              jobLink: "",
              refDetails: "",
              notes: "",
            }}
            onSubmit={onFormSubmit}
            // onSubmit={(values, { resetForm }) => AddNewApplication(values)}
          >
            <Form className="flex flex-col lg:w-full items-center">
              <div className="w-full lg:w-3/4 my-2">
                <p className="text-8 font-bold">Company Name:</p>
                <Field
                  className="p-2 my-2 w-full border-solid border-2 border-gray-500 focus:outline-none focus:border-primary rounded-md"
                  type="text"
                  name="companyName"
                  placeholder="Enter the Company Name"
                  required="true"
                />
              </div>

              <div className="w-full lg:w-3/4 my-2">
                <p className="text-8 font-bold">Job Role:</p>
                <Field
                  className="p-2 my-2 w-full border-solid border-2 border-gray-500 focus:outline-none focus:border-primary rounded-md"
                  type="text"
                  name="jobRole"
                  placeholder="Enter the job Role"
                />
              </div>

              <div className="w-full lg:w-3/4 my-2">
                <p className="text-8 font-bold">Job Portal:</p>
                <Field
                  className="p-2 my-2 w-full border-solid border-2 border-gray-500 focus:outline-none focus:border-primary rounded-md"
                  type="text"
                  name="jobPortal"
                  placeholder="Enter the job portal name"
                />
              </div>

              <div className="w-full lg:w-3/4 my-2">
                <p className="text-8 font-bold">Job Link:</p>
                <Field
                  className="p-2 my-2 w-full border-solid border-2 border-gray-500 focus:outline-none focus:border-primary rounded-md"
                  type="text"
                  name="jobLink"
                  placeholder="Paste the Job URL"
                />
              </div>
              <div className="w-full lg:w-3/4 my-2">
                <p className="text-8 font-bold">Referral Details:</p>
                <Field
                  className="p-2 my-2 w-full border-solid border-2 border-gray-500 focus:outline-none focus:border-primary rounded-md"
                  type="text"
                  name="refDetails"
                  placeholder="Enter the referral details"
                />
              </div>

              <div className="w-full lg:w-3/4 my-2">
                <p className="text-8 font-bold">Additional Notes:</p>
                <Field
                  component="textarea"
                  rows="6"
                  className="p-2 my-2 w-full border-solid border-2 border-gray-500 focus:outline-none focus:border-primary rounded-md"
                  type="text"
                  name="notes"
                  placeholder="Enter any Notes here..."
                />
              </div>

              <div className="w-full lg:w-3/4 my-2">
                <p className="text-8 font-bold">Job Description:</p>
                <Field
                  component="textarea"
                  rows="6"
                  className="p-2 my-2 w-full border-solid border-2 border-gray-500 focus:outline-none focus:border-primary rounded-md"
                  type="text"
                  name="jobDesc"
                  placeholder="Enter job Description..."
                />
              </div>
              <input
                type="submit"
                className="bg-primary text-white text-[18px] p-3 w-1/2 md:w-1/4 my-6 rounded-lg"
                // onClick={onApplicationSubmit}
              ></input>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default NewApplication;
