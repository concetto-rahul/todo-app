import { useContext, useRef, useEffect } from "react";
import { ChatContext } from "../../context/chat";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import { Box, Avatar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootStyle: {
      display: "flex",
      marginBottom: theme.spacing(3),
    },
    contentStyle: {
      maxWidth: 320,
      padding: theme.spacing(1.5),
      marginTop: theme.spacing(0.5),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.info.light,
      color: "#FFF",
    },
    infoStyle: {
      display: "flex",
      marginBottom: theme.spacing(0.75),
      color: theme.palette.text.secondary,
    },
    messageImgStyle: {
      width: "100%",
      cursor: "pointer",
      objectFit: "cover",
      borderRadius: theme.shape.borderRadius,
      [theme.breakpoints.up("md")]: {
        height: 200,
        minWidth: 296,
      },
    },
  })
);

export default function ChatMessageList() {
  const theme = useTheme();
  const { selectUserConversationMessages } = useContext(ChatContext);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [
    selectUserConversationMessages && selectUserConversationMessages.message,
  ]);
  return (
    <div
      style={{ padding: theme.spacing(3), height: theme.spacing(40),overflow:"auto" }}
    >
      {selectUserConversationMessages &&
        selectUserConversationMessages.messages.map((message: any) => (
          <ChatMessageItem key={message.messageId} message={message} />
        ))}
    </div>
  );
}

const ChatMessageItem = ({ message }: { message: any }) => {
  const theme = useTheme();
  const classes = useStyles();
  const isMe = message.isMe;
  const isImage = message.contentType === "image";
  const senderName = message.senderName;

  return (
    <div className={classes.rootStyle}>
      <Box
        style={{
          display: "flex",
          ...(isMe && {
            marginLeft: "auto",
          }),
        }}
      >
        {!isMe && (
          <Avatar
            alt={senderName}
            src={senderName}
            style={{ width: 32, height: 32, marginRight: theme.spacing(2) }}
          />
        )}

        <div>
          <Typography
            variant="caption"
            className={classes.infoStyle}
            style={{
              ...(isMe && { justifyContent: "flex-end" }),
            }}
          >
            {!isMe && `${senderName}`}&nbsp;
            {/* {formatDistanceToNowStrict(new Date(message.createdAt), {
              addSuffix: true,
            })} */}
          </Typography>

          <div
            className={classes.contentStyle}
            style={{
              ...(isMe && {
                color: "grey.800",
                backgroundColor: "primary.lighter",
              }),
              ...(isImage && { padding: 0 }),
            }}
          >
            {isImage ? (
              <img
                alt="attachment"
                src={message.body}
                // onClick={() => onOpenLightbox(message.body)}
                className={classes.messageImgStyle}
              />
            ) : (
              <Typography variant="body2">{message.message}</Typography>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};
