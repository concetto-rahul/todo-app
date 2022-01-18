import { ReactElement, FC } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3),
      height:"72vh",
      display:"flex"
    },
  })
);

interface Props {
  userID?: string;
}

const Dashboard: FC<Props> = ({ userID }): ReactElement => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root}>
        <ChatSidebar />
        <ChatWindow />
      </Card>
    </>
  );
};

export default Dashboard;
