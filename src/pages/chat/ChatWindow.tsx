import { useContext } from "react";
import { ChatContext } from "../../context/chat";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Divider, Typography } from "@material-ui/core";
import UserHeaderAccount from "./UserHeaderAccount";
import ChatMessageInput from "./ChatMessageInput";
import ChatMessageList from "./ChatMessageList";

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
    noSelectedConDiv: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(5, 0),
      justifyContent: "center",
    },
  })
);

export default function ChatWindow() {
  const { selectConversationUserID } = useContext(ChatContext);
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {selectConversationUserID !== "" ? (
        <>
          <UserHeaderAccount />
          <Divider />
          <Box className={classes.messageDiv}>
            <Box style={{ flexGrow: 1 }}>
              <ChatMessageList/>
              <Divider />
              <ChatMessageInput />
            </Box>
          </Box>
        </>
      ) : (
        <Box className={classes.noSelectedConDiv}>
          <Typography variant="h4">
            Select conversation to start chat.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
