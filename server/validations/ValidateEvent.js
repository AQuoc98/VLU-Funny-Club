const validator = require("validator");
const _ = require("lodash");

ValidateEvent = async (dataReq, create) => {
  let data = dataReq.body;
  let dataFile = dataReq.file;

  let errors = {};

  data.eventTitle = _.get(data, "eventTitle", "");
  data.eventDesc = _.get(data, "eventDesc", "");
  data.eventAddress = _.get(data, "eventAddress", "");
  data.time = _.get(data, "time", "");

  //validate event title event
  if (validator.isEmpty(data.eventTitle)) {
    errors.eventTitle = "Vui lòng điền tên sự kiện";
  }
  //validate event desc
  if (validator.isEmpty(data.eventDesc)) {
    errors.eventDesc = "Vui lòng điền mô tả sự kiện";
  }
  //validata event address
  if (validator.isEmpty(data.eventAddress)) {
    errors.eventAddress = "Vui lòng điền địa điểm diễn ra";
  }
  //validata event address
  if (validator.isEmpty(data.time)) {
    errors.time = "Vui lòng điền thời gian diễn ra";
  }

  return {
    isValid: _.isEmpty(errors),
    errors,
  };
};
module.exports = ValidateEvent;
