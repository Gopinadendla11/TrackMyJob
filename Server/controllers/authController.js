const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const userModel = require("../model/userModel");
const authUtils = require("../Utils/authUtils");

exports.login = async (req, res) => {
  //console.log("Auth Login API Called");
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).send("All input is required");
  }
  // Validate if user exist in our database
  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    // Create token
    const token = authUtils.generateAccessToken(
      { user_id: user._id, email },
      "2h"
    );

    // save user token
    user.token = token;
    //console.log("Response OK token sent");
    res.status(200).json(user);
  } else res.status(400).send("Invalid Credentials");
};

exports.register = async (req, res) => {
  //console.log("Auth register API Called");
  const { first_name, last_name, email, password } = req.body;

  if (!(email && password && first_name && last_name)) {
    res.status(400).send("All input is required");
  }
  // check if user already exist
  const oldUser = await userModel.findOne({ email });
  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  }
  //Encrypt user password
  encryptedPassword = await bcrypt.hash(password, 10);
  // Create user in our database
  const user = await userModel.create({
    first_name,
    last_name,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });
  const token = authUtils.generateAccessToken(
    { user_id: user._id, email },
    "2h"
  );
  // Create token
  user.token = token;
  return res.status(200).json(user);
};

exports.forgot_password = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send("Email is required");

  const user = await userModel.findOne({ email });
  if (!user) return res.status(400).send("User with email does not exist");

  const token = authUtils.generateAccessToken(user.toJSON(), "15m");
  const subject = "Reset Password";
  const link = `${process.env.BASE_URL}/reset-password/${token}`;
  const message = `Dear User,\n \nWe received a request to reset your password for your account at TrackMyjob.online. To proceed with the password reset, please click on the link below:\n \n${link}`;

  try {
    //Create a transporter with your email service provider configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Create the email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject,
      text: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};

exports.reset_password = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password))
    res.status(400).send("Email or Password is required");

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).send("User with email does not exist");

    encryptedPassword = await bcrypt.hash(password, 10);
    user.password = encryptedPassword;
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
