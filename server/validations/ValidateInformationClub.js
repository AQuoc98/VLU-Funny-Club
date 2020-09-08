//3rd packages
const validator = require("validator");
const _ = require("lodash");



//validate isEmpty
validateInformationClub = async (data) => {
  let errors = {};

  data.clubName = _.get(data, "clubName", "");
  data.clubDesc = _.get(data, "clubDesc", "");
  data.clubHistory = _.get(data, "clubHistory", "");
  data.clubGroupType = _.get(data, "clubGroupType", "");
  data.clubPhone = _.get(data, "clubPhone", "");
  data.clubEmail = _.get(data, "clubEmail", "");

  //validate for clubGroupType
  if (validator.isEmpty(data.clubGroupType)) {
    errors.clubGroupType = " Vui lòng không bỏ trống ";
  }
  // validate for clubName
  if (validator.isEmpty(data.clubName)) {
    errors.clubName = " Vui lòng không bỏ trống ";
  }
  //validate for clubDesc
  if (validator.isEmpty(data.clubDesc)) {
    errors.clubDesc = " Vui lòng không bỏ trống ";
  }
  //validate for clubHistory
  if (validator.isEmpty(data.clubHistory)) {
    errors.clubHistory = " Vui lòng không bỏ trống ";
  }
  //Validate for clubPhone
  if (validator.isEmpty(data.clubPhone)) {
    errors.clubPhone = " Vui lòng không bỏ trống";
  } else if (validator.isAlpha(data.clubPhone)) {
    errors.clubPhone = 'Vui long nhap dung so dien thoai'
  }
  
  //validate for clubEmail
  if (validator.isEmpty(data.clubEmail)) {
    errors.clubEmail = "Vui lòng không bỏ trống";
  } 
  return {
    isValid: _.isEmpty(errors),
    errors,
  };
};

module.exports = validateInformationClub;
