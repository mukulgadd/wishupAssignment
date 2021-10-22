const { userModel, subscriptionModel } = require("../models");

const { validator } = require("../utils");

const { systemConfig } = require("../configs");

//rename to subscribe
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
        res.status(400).send({ status: false, msg: "Plan Id is required" });
        return
      }

      if (!validator.isValidPlanId(planId)) {
        res.status(400).send({ status: false, msg: "Please select a valid Plan Id" });
        return
      }

      if (!validator.isValid(startDate)) {
        res.status(400).send({ status: false, msg: "Start Date is required" });
        return
      }

      if (!validator.isValidStartDate(startDate)) {
        res.status(400).send({ status: false, msg: "Please select a valid start date" });
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

// getActiveSubscriptionWithDate
const getSubscriptionWithDate = async function (req, res) {
    try {
      let userName = req.params.userName;
      let userDate = req.params.date;
      if (!validator.isValidRequestParam(userName)) {
        res.status(400).send({ status: false, msg: "user name is not valid" });
        return
      }

      if (!validator.isValidRequestParam(userDate)) {
        res.status(400).send({ status: false, msg: "date is not valid" });
        return
      }

      if (!validator.isValidStartDate(userDate)) {
        res.status(400).send({ status: false, msg: "date is not valid" });
        return
      }

      let currentSubscriptions = await subscriptionModel.find({userName: userName});

      if(currentSubscriptions)
      {
        let details =[];
        for(let i=0; i<currentSubscriptions.length;i++)
        {

            if(currentSubscriptions[i].planId == 'FREE')
            {
              let tempObj = { Plan_Id : `${currentSubscriptions[i].planId}`, Days_Left : `Infinite`}
              details.push(tempObj);
            }
            else{
              var startedAt = currentSubscriptions[i].startDate.getTime(); //Get the number of milliseconds since January 1, 1970:
              let indexOfPlan = systemConfig.planIdEnumArray.indexOf(currentSubscriptions[i].planId);
              let validity = systemConfig.planValidityEnumArray[indexOfPlan];
              let validTill = startedAt + validity*24*60*60*1000;
              let formattedDate = new Date(userDate);
              let userEnteredDate = formattedDate.getTime();
              let validDays = (validTill - userEnteredDate)/(24*60*60*1000);
              if(validDays > 0)
              {
                let tempObj = { Plan_Id : `${currentSubscriptions[i].planId}`, Days_Left : `${validDays}`}
                details.push(tempObj);
              }
            }
        }
        res.status(201).send({ status: true, data : details });
      }
      res.status(201).send({ status: true, msg: "No Active Subscriptions" });
    } catch (error) {
      res.status(500).send({ status: false, msg: error.message });
    }
  };
  

  
const getSubscription = async function (req, res) {
  try {
    let userName = req.params.userName;
    if (!validator.isValidRequestParam(userName)) {
      res.status(400).send({ status: false, msg: "user name is not valid" });
      return
    }

    let currentSubscriptions = await subscriptionModel.find({userName: userName});

    if(currentSubscriptions)
    {
      let details =[];
      for(let i=0; i<currentSubscriptions.length;i++)
      {
        if(currentSubscriptions[i].planId == 'FREE')
            {
              let tempObj = { Plan_Id : `${currentSubscriptions[i].planId}`, Start_Date : `${currentSubscriptions[i].startDate}`, Valit_Till : `Infinite` }
            details.push(tempObj);
            }
          else{
            var startedAt = currentSubscriptions[i].startDate.getTime(); //Get the number of milliseconds since January 1, 1970:
            const indexOfPlan = systemConfig.planIdEnumArray.indexOf(currentSubscriptions[i].planId);
            let validity = systemConfig.planValidityEnumArray[indexOfPlan];
            let validTill = startedAt + validity*24*60*60*1000;
            let validDate = new Date(validTill);
            let tempObj = { Plan_Id : `${currentSubscriptions[i].planId}`, Start_Date : `${currentSubscriptions[i].startDate}`, Valit_Till : `${validDate}` }
            details.push(tempObj);
          }
      }
      res.status(201).send({ status: true, data : details });
    }
    res.status(201).send({ status: true, msg: "No Active Subscriptions" });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};


  
module.exports = {
  registerSubscription,
  getSubscriptionWithDate,
  getSubscription
};
