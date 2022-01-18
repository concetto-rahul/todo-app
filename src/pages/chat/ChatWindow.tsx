import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      minWidth: "1px",
    },
    messageDiv: {
      flexGrow: 1,
      display: "flex",
      overflow: "hidden",
    },
  })
);

export default function ChatWindow() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Divider />
      <Box className={classes.messageDiv}>
        <Divider />
      </Box>
    </Box>
  );
}
