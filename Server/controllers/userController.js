const express = require("express");
const userModel = require("../model/userModel");
const applicationModel = require("../model/applicationModel");
const bcrypt = require("bcrypt");

exports.getUserData = async (req, res) => {
  // res.status(200).send(req.data);
  if (req.data.user_id) {
    user = await userModel.findById(req.data.user_id).lean();
    delete user.password;

    applications = await applicationModel
      .find({ createdBy: req.data.user_id })
      .lean();

    applied = applications.filter((app) => app.status === "Applied");
    if (applied) user.n_applied = applied.length;

    assessments = applications.filter(
      (app) => app.status === "Online Assessment"
    );
    if (assessments) user.n_assessments = assessments.length;

    interviews = applications.filter((app) => app.status === "Interview");
    if (interviews) user.n_interviews = interviews.length;

    rejected = applications.filter((app) => app.status === "Rejected");
    if (rejected) user.n_rejected = rejected.length;

    //user.applications = applications;

    res.status(200).send(user);
  } else res.status(404).send("User not found");
};

exports.editUserData = async (req, res) => {
  const filter = { _id: req.data.user_id };
  const update = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
  };

  if (req.body.password) {
    encryptedPassword = await bcrypt.hash(req.body.password, 10);
    update.password = encryptedPassword;
  }
  try {
    await userModel.findOneAndUpdate(filter, update);
    res.status(200).send();
    //res.status(200).send("User Profile Updated Successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
