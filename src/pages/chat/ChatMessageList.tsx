import { useContext } from "react";
import { ChatContext } from "../../context/chat";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, IconButton, Input, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
  })
);
export default function ChatMessageList() {
  const classes = useStyles();
  const { selectConversationUserID, selectConversationUserData } =
    useContext(ChatContext);
  return (
    <div className={classes.root}>
      <h1>sdugfkjadgshkjfh</h1>
    </div>
  );
}
