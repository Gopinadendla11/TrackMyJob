const express = require("express");
const jwt = require("jsonwebtoken");

exports.generateAccessToken = (data, expireTime) => {
  return jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: expireTime });
};

exports.verifyAccessToken = (token) => {
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    console.log(error);
  }
  return decodedToken;
};
