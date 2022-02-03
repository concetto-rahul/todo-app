import { useContext, useState } from "react";
import { ChatContext } from "../../context/chat";
import { checkChatLoginValidation } from "../../validations/chatLoginValidation";
import { isEmpty } from "../../validations/basicValidations";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

export default function CreateNewContact() {
  const { showCreateForm, handeleCloseForm, createContact } =
    useContext(ChatContext);
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [formErrors, setFormErrors] = useState<any>({});

  const submitFormData = (event: any) => {
    event.preventDefault();
    const formData = { mobileNumber, userName };
    const validationError = checkChatLoginValidation(formData);
    console.log(validationError);
    if (!isEmpty(validationError)) {
      setFormErrors({ ...validationError });
    } else {
      createContact({ name: userName, phone: mobileNumber });
      setMobileNumber("");
      setUserName("");
      setFormErrors({});
      handeleCloseForm();
    }
  };

  return (
    <>
      <Dialog
        open={showCreateForm}
        onClose={handeleCloseForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Contact</DialogTitle>
        <DialogContent>
          <TextField
            id="userName"
            label="Full Name"
            variant="outlined"
            name="userName"
            error={formErrors?.userName ? true : false}
            helperText={formErrors?.userName}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            id="mobileNumber"
            label="Mobile Number"
            variant="outlined"
            name="mobileNumber"
            error={formErrors?.mobileNumber ? true : false}
            helperText={formErrors?.mobileNumber}
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitFormData} color="primary">
            Save Data
          </Button>
          <Button onClick={handeleCloseForm} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
