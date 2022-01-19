import { useState, useContext } from "react";
import { ChatContext } from "../../context/chat";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, IconButton, Input, Divider } from "@material-ui/core";

import MicIcon from "@material-ui/icons/Mic";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import PhotoIcon from "@material-ui/icons/Photo";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: 56,
      display: "flex",
      position: "relative",
      alignItems: "center",
      paddingLeft: theme.spacing(2),
    },
    inputIcon: {
      flexShrink: 0,
      marginRight: theme.spacing(1.5),
      "& > *": { margin: theme.spacing(0.5) },
    },
    sendIcon: {
      margin: theme.spacing(0, 1),
    },
  })
);
export default function ChatMessageInput() {
  const classes = useStyles();
  const { selectConversationUserID, selectConversationUserData,sendMessage } =
    useContext(ChatContext);
  const [message, setMessage] = useState("");

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message) {
      return "";
    }

    sendMessage({
      recipientId: selectConversationUserID,
      message,
      contentType: "text",
      attachments: [],
      createdAt: new Date().getTime(),
    });

    return setMessage("");
  };
  return (
    <div className={classes.root}>
      <Input
        disabled={false}
        fullWidth
        value={message}
        disableUnderline
        onKeyUp={handleKeyUp}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        endAdornment={
          <Box className={classes.inputIcon}>
            <IconButton disabled={true} size="small">
              <PhotoIcon width={24} height={24} />
            </IconButton>
            <IconButton disabled={true} size="small">
              <AttachFileIcon width={24} height={24} />
            </IconButton>
            <IconButton disabled={true} size="small">
              <MicIcon width={24} height={24} />
            </IconButton>
          </Box>
        }
        style={{ height: "100%" }}
      />

      <Divider orientation="vertical" flexItem />

      <IconButton
        color="primary"
        disabled={!message}
        onClick={handleSend}
        className={classes.sendIcon}
      >
        <SendIcon width={24} height={24} />
      </IconButton>
    </div>
  );
}
