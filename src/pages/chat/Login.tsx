import { ReactElement, FC, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

import { Typography, Box, TextField, Button } from "@material-ui/core";
import { checkChatLoginValidation } from "../../validations/chatLoginValidation";
import { isEmpty } from "../../validations/basicValidations";

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
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [formErrors, setFormErrors] = useState<any>({});

  const handleLogin = (event: any) => {
    event.preventDefault();
    const formData = { mobileNumber };
    const validationError = checkChatLoginValidation(formData);
    console.log(validationError);
    if (!isEmpty(validationError)) {
      setFormErrors({ ...validationError });
    } else {
      event.target.reset();
      localStorage.setItem("chat-userID", mobileNumber);
      navigate("/chat");
    }
  };

  return (
    <>
      <Box color="text.primary">
        <Typography variant="h4">Login</Typography>
        <form
          className={classes.root}
          onSubmit={handleLogin}
          autoComplete="off"
        >
          <TextField
            id="mobileNumber"
            label="Mobile Number"
            variant="outlined"
            name="mobileNumber"
            error={formErrors?.mobileNumber ? true : false}
            helperText={formErrors?.mobileNumber}
            value={mobileNumber}
            onChange={(e)=>setMobileNumber(e.target.value)}
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
