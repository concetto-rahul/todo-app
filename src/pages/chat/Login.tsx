import { ReactElement, FC, useState, useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

import { Typography, Box, TextField, Button } from "@material-ui/core";
import { checkChatLoginValidation } from "../../validations/chatLoginValidation";
import { isEmpty } from "../../validations/basicValidations";
import { ChatContext } from "../../context/chat";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3),
      "& > *": {
        margin: theme.spacing(1),
        width: "35ch",
      },
    },
  })
);
const Login: FC<any> = (): ReactElement => {
  const classes = useStyles();
  const { saveLoginData }=useContext(ChatContext);

  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [formErrors, setFormErrors] = useState<any>({});

  const handleLogin = (event: any) => {
    event.preventDefault();
    const formData = { mobileNumber, userName };
    const validationError = checkChatLoginValidation(formData);
    console.log(validationError);
    if (!isEmpty(validationError)) {
      setFormErrors({ ...validationError });
    } else {
      event.target.reset();
      saveLoginData(formData);
      navigate("/chat");
    }
  };

  return (
    <>
      <Box color="text.primary">
        <Typography variant="h6">Login</Typography>
        <form
          className={classes.root}
          onSubmit={handleLogin}
          autoComplete="off"
        >
          <TextField
            id="userName"
            label="Your Name"
            variant="outlined"
            name="userName"
            error={formErrors?.userName ? true : false}
            helperText={formErrors?.userName}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Login;
