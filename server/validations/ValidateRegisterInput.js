//load model
const { Student } = require("../models/student.model");

//3rd packages
const validator = require("validator");
const _ = require("lodash");

//validate is empty
validateRegisterInput = async (data) => {
  let errors = {};

  data.userName = _.get(data, "userName", "");
  data.passWord = _.get(data, "passWord", "");
  data.passWord2 = _.get(data, "passWord2", "");
  data.fullName = _.get(data, "fullName", "");
  data.mssv = _.get(data, "mssv", "");
  data.major = _.get(data, "major", "");
  data.classMajor = _.get(data, "classMajor", "");

  //Validate UserName for Register
  if (validator.isEmpty(data.userName)) {
    errors.userName = "Vui lòng nhập tên đăng nhập !";
  } else {
    const student = await Student.findOne({ userName: data.userName });
    if (student) errors.userName = "Tên đăng nhập đã tồn tại !";
  }
  //Validate PassWord for register
  if (validator.isEmpty(data.passWord)) {
    errors.passWord = "Vui lòng nhập mật khẩu!";
  } else if (!validator.isLength(data.passWord, { min: 6 })) {
    errors.passWord = "Mật khẩu ít nhất 6 kí tự !";
  }
  //Validate PassWord2 for register
  if (validator.isEmpty(data.passWord2)) {
    errors.passWord2 = "Vui lòng nhập mật khẩu 2";
  } else if (!validator.equals(data.passWord, data.passWord2)) {
    errors.passWord2 = "Mật khẩu không trùng khớp";
  }
  //Validate fullname for register
  if (validator.isEmpty(data.fullName)) {
    errors.fullName = " Vui lòng nhập họ và tên đầy đủ !";
  }
  // validate mssv for register
  if (validator.isEmpty(data.mssv)) {
    errors.mssv = "Vui lòng nhập MSSV";
  } else {
    const student = await Student.findOne({ mssv: data.mssv });
    if (student) errors.mssv = "MSSV không được trùng";
  }
  //validate major for register
  if (validator.isEmpty(data.major)) {
    errors.major = "Vui lòng chọn chuyên nghành";
  }
  //validate class major for register
  if (validator.isEmpty(data.classMajor)) {
    errors.classMajor = "Vui lòng nhập lớp chuyên nghành ";
  }
  return {
    isValid: _.isEmpty(errors),
    errors,
  };
};
module.exports = validateRegisterInput;
