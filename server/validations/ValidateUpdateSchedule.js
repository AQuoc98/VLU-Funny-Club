// load model
const { Schedule } = require("../models/schedule.model");

// 3rd packages
const validator = require("validator");
const _ = require("lodash");

ValidateUpdateSchedule = async (data) => {
  let errors = {};

  data.date = _.get(data, "date", "");
  data.room = _.get(data, "room", "");
  data.content = _.get(data, "content", "");
  data.note = _.get(data, "note", "");

  //Validate isEmpty
  if (validator.isEmpty(data.date)) {
    errors.date = "Vui lòng nhập ngày !";
  }
  if (validator.isEmpty(data.room)) {
    errors.room = "Vui lòng nhập phòng !";
  }
  if (validator.isEmpty(data.content)) {
    errors.content = "Vui lòng nhập nội dung";
  }
  if (validator.isEmpty(data.note)) {
    errors.note = "Vui lòng nhập lưu ý !";
  }
  return {
    isValid: _.isEmpty(errors),
    errors,
  };
};
module.exports = ValidateUpdateSchedule;
