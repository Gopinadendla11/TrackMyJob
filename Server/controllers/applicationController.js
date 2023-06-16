const applicationModel = require("../model/applicationModel");
const mongoose = require("mongoose");

exports.newApplication = async (req, res) => {
  const appData = req.body;
  appData.createdBy = req.data.user_id;
  appData.createdAt = new Date();
  //console.log(appData);
  if (!(appData.companyName && appData.jobRole && appData.jobLink))
    return res.status(400).send("Company Name and Job details are required");
  else {
    try {
      result = await new applicationModel(appData).save();
      return res.status(200).send("Application Saved Successfully");
    } catch (error) {
      console.log(error);
    }
  }
};

exports.getApplications = async (req, res) => {
  const user = req.data.user_id;
  try {
    const appData = await applicationModel.find({ createdBy: user });
    return res.status(200).send(appData);
  } catch (err) {
    console.log(err);
  }
};

exports.updateStatus = async (req, res) => {
  const user = req.body._id;
  const temp_status = req.body.status;
  try {
    const result = await applicationModel.findByIdAndUpdate(user, {
      status: temp_status,
    });
    return res.status(200).send("Success");
  } catch (err) {
    console.log(err);
  }
};

exports.getStats = async (req, res) => {
  const match = {
    createdBy: new mongoose.Types.ObjectId(req.data.user_id),
    createdAt: {
      $gte: new Date(Date.now() - 7 * 86400000),
      $lte: new Date(),
    },
  };
  const group = {
    _id: {
      $dateToString: {
        format: "%m/%d/%Y",
        date: "$createdAt",
        timezone: "America/New_York",
      },
    },
    count: { $sum: 1 },
  };

  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toLocaleDateString("en-US"));
  }

  try {
    let data = await applicationModel
      .aggregate([{ $match: match }, { $group: group }])
      .exec();

    const newData = [];
    for (const date of dates) {
      const existingData = data.find(
        (item) => Date.parse(item._id) === Date.parse(date)
      );
      if (existingData) {
        newData.push(existingData);
      } else {
        newData.push({ _id: date, count: 0 });
      }
    }

    newData.sort((a, b) => {
      const dateA = new Date(a._id);
      const dateB = new Date(b._id);
      return dateA - dateB;
    });
    res.status(200).send(newData);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteApplications = async (req, res) => {
  //console.log("Delete applications called");
  const user = req.body._id;
  const appData = req.body;
  try {
    const result = await applicationModel.deleteMany({ _id: { $in: appData } });
  } catch (err) {
    console.log(err);
  }
  return res.status(200).send(appData);
};
