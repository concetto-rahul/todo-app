import { isEmpty, phoneNumber } from "./basicValidations";
export const checkChatLoginValidation = (formdata: any) => {
  let errors: any = {};
  if (formdata) {
    if (isEmpty(formdata.mobileNumber)) {
      errors["mobileNumber"] = "Please provide your mobile number.";
    } else if (!phoneNumber(formdata.mobileNumber)) {
      errors["mobileNumber"] = "Please provide valid mobile number..";
    }
  }
  return errors;
};
