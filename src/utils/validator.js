const { systemConfig } = require("../configs");

const dateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

const isValidStartDate = function (startDate) {
  return dateRegex.test(startDate);
};

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidPlanId = function (planId) {
  return systemConfig.planIdEnumArray.includes(planId);
};

const isValidRequestParam = function (userName) {
  return Object.keys(userName).length > 0;
};


module.exports = {
  isValidStartDate,
  isValidRequestParam,
  isValidPlanId,
  isValid
}
