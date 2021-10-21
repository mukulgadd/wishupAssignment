const { userModel, subscriptionModel } = require("../models");

const { validator } = require("../utils");

const { systemConfig } = require("../configs");

const registerSubscription = async function (req, res) {
  try {
    let requestBody = req.body;
    if (!validator.isValidRequestBody(requestBody)) {
      res.status(400).send({ status: false, msg: "request body is required" });
      return
    }

    const { userName, planId, startDate } = requestBody;

    if (!validator.isValid(userName)) {
        res.status(400).send({ status: false, msg: "User Name is required" });
        return
      }

      if (!validator.isValid(planId)) {
        res.status(400).send({ status: false, msg: "title is required" });
        return
      }

      if (!validator.isValidPlanId(planId)) {
        res.status(400).send({ status: false, msg: "Please select a valid Plan Id" });
        return
      }

      if (!validator.isValid(startDate)) {
        res.status(400).send({ status: false, msg: "title is required" });
        return
      }

      if (!validator.isValidStartDate(startDate)) {
        res.status(400).send({ status: false, msg: "title is required" });
        return
      }

      const isUserPresent = await userModel.findOne({ userName });

      if(!isUserPresent){
          res.status(404).send({status: false, msg: "User not present, please check the user name."})
          return
      }

    const newSubscription = {userName, planId, startDate};
    const createSubscription = await subscriptionModel.create(newSubscription);

    if(createSubscription){
        const indexOfPlanId = systemConfig.planIdEnumArray.indexOf(planId);
        const amount = systemConfig.planCostEnumArray[indexOfPlanId];
        res.status(200).send({ status: true, msg: `Amount: -${amount} debited` });
        return
    }

    if(!createSubscription){
        const indexOfPlanId = systemConfig.planIdEnumArray.indexOf(planId);
        const amount = systemConfig.planCostEnumArray[indexOfPlanId];
        res.status(200).send({ status: false, msg: `Amount: +${amount} credited` });
        return
    }
    
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};


const getSubscriptionWithDate = async function (req, res) {
    try {
      let userName = req.params.userName;
      let date = req.params.date;
      if (!validator.isValidRequestParam(userName)) {
        res.status(400).send({ status: false, msg: "user name is not valid" });
        return
      }

      if (!validator.isValidRequestParam(date)) {
        res.status(400).send({ status: false, msg: "date is not valid" });
        return
      }

      if (!validator.isValidStartDate(date)) {
        res.status(400).send({ status: false, msg: "date is not valid" });
        return
      }

      const currentSubscriptions = await subscriptionModel.find({userName: userName});

      if(currentSubscriptions)
      {
        for(const i=0; i<currentSubscriptions.length;i++)
        {
            var startedAt = currentSubscriptions[0].startDate.getTime(); //Get the number of milliseconds since January 1, 1970:
            
            var specific_date = new Date('2017-03-26');
            var current_date = new Date();
            if(current_date.getTime() > specific_date.getTime())
            {
                console.log('current_date date is grater than specific_date')
            }
            else
            {
                console.log('current_date date is lower than specific_date')
            }
        }
      }
      res.status(201).send({ status: true, data: userDetails });
    } catch (error) {
      res.status(500).send({ status: false, msg: error.message });
    }
  };
  
