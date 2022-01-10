import { isEmpty, textOnly } from "./basicValidations";
export const creatTaskValidation = (formdata: any) => {
  let errors: any = {};
  if (formdata) {
    if (isEmpty(formdata.title)) {
      errors["title"] = "Title is required.";
    } else if (!textOnly(formdata.title)) {
      errors["title"] = "Please enter text only.";
    }

    if (isEmpty(formdata.description)) {
      errors["description"] = "Description is required.";
    }
  }
  return errors;
};
