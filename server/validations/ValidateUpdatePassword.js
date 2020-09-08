//3rd packages
  const validator = require("validator");
const _ = require("lodash");

//validate is empty
validateUpdatePassword = async (data) => {
  let errors = {};

  data.password = _.get(data, "password2", "");
  data.newPassword = _.get(data, "newPassword", "");
  data.password2 = _.get(data, "password2", "");

  //Validate PassWord for update
  if (validator.isEmpty(data.password)) {
    errors.password = "Vui lòng nhập mật khẩu!";
  } else if (!validator.isLength(data.password, { min: 6 })) {
    errors.password = "Mật khẩu ít nhất 6 kí tự !";
  }
  //Validate newPassword for update
  if (validator.isEmpty(data.newPassword)) {
    errors.newPassword = "Vui lòng nhập mật khẩu!";
  } else if (!validator.isLength(data.newPassword, { min: 6 })) {
    errors.newPassword = "Mật khẩu ít nhất 6 kí tự !";
  }
  //Validate PassWord2 for update
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Vui lòng nhập mật khẩu 2";
  } else if (!validator.equals(data.newPassword, data.password2)) {
    errors.password2 = "Mật khẩu không trùng khớp";
  }
  return {
    isValid: _.isEmpty(errors),
    errors,
  };
};
module.exports = validateUpdatePassword;
