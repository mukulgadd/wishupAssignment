const { userModel } = require("../models");

const { validator } = require("../utils");

const registerUser = async function (req, res) {
  try {
    let userName = req.params.userName;
    if (!validator.isValidRequestParam(userName)) {
      res.status(400).send({ status: false, msg: "request param is not valid" });
      return
    }

    //const isUserIdAlreadyUsed = await userModel.findOne({ userName }); 

    // if (isUserIdAlreadyUsed) {
    //   res.status(400).send({ status: false, message: `${userName}  is already registered` });
    //   return;
    // }

    const createUser = await userModel.create({userName: userName});
    res.status(201).send({ status: true, data: createUser });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};


const getUser = async function (req, res) {
  try {
    let userName = req.params.userName;
    if (!validator.isValidRequestParam(userName)) {
      res.status(400).send({ status: false, msg: "request param is not valid" });
      return
    }
    const userDetails = await userModel.findOne({userName: userName});
    if(userDetails)
    {
      res.status(200).send({ status: true, data: userDetails });
    }
    else{
      res.status(404).send({ status: false, msg: "User Name does not exist" });
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};



module.exports = {
  registerUser,
  getUser
};
