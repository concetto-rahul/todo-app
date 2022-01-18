import { isEmpty, phoneNumber, textOnly } from "./basicValidations";
export const checkChatLoginValidation = (formdata: any) => {
  let errors: any = {};
  if (formdata) {
    if (isEmpty(formdata.mobileNumber)) {
      errors["mobileNumber"] = "Please provide your mobile number.";
    } else if (!phoneNumber(formdata.mobileNumber)) {
      errors["mobileNumber"] = "Please provide valid mobile number..";
    }

    if (isEmpty(formdata.userName)) {
      errors["userName"] = "Please provide your name.";
    } else if (!textOnly(formdata.userName)) {
      errors["userName"] = "Please provide valid name. alphabet and space only";
    }
  }
  return errors;
};
