import { useContext } from "react";
import { ChatContext } from "../../context/chat";
import { VideocallContext } from "../../context/videocall";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, IconButton, Avatar, Typography } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PhoneIcon from "@material-ui/icons/Phone";
import VideoIcon from "@material-ui/icons/Videocam";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      minHeight: 70,
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 3),
    },
    avatarBox: {
      display: "flex",
      alignItems: "center",
    },
  })
);

export default function UserHeaderAccount() {
  const classes = useStyles();
  const { selectConversationUserID, selectConversationUserData } =
    useContext(ChatContext);
  const { handleVideoCall } = useContext(VideocallContext);

  const headerUserName =
    selectConversationUserData.length > 1
      ? "Group"
      : selectConversationUserData.map((data: any) => data.name).join(", ");

  return (
    <>
      {selectConversationUserID && selectConversationUserData && (
        <Box className={classes.root}>
          <Box className={classes.avatarBox}>
            <Box style={{ position: "relative" }}>
              <Avatar src={headerUserName} alt={headerUserName} />
            </Box>
            <Box style={{ marginLeft: "20px" }}>
              <Typography variant="subtitle2">{headerUserName}</Typography>
              <Typography variant="body2" style={{ color: "text.secondary" }}>
                {`last activity text`}
              </Typography>
            </Box>
          </Box>
          <Box style={{ flexGrow: 1 }} />
          <IconButton>
            <PhoneIcon width={20} height={20} />
          </IconButton>
          <IconButton onClick={handleVideoCall}>
            <VideoIcon width={20} height={20} />
          </IconButton>
          <IconButton>
            <MoreVertIcon width={20} height={20} />
          </IconButton>
        </Box>
      )}
    </>
  );
}
