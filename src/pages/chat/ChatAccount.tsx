import { useState, useContext } from "react";
import { ChatContext } from "../../context/chat";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Box,
  IconButton,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Fade,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerAvatarBox: {
      padding: "2px 1px 2px 3px",
      display: "flex",
      alignItems: "center",
    },
    drawerNameBox: {
      marginLeft: "8px",
      marginRight: "13px",
    },
  })
);

interface Props {
  isCollapse: boolean;
}

export default function ChatAccount({ isCollapse }: Props) {
  const classes = useStyles();
  const { userID, userName, handeleOpenForm } = useContext(ChatContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (key: string = "") => {
    if (key === "addNewContact") {
      handeleOpenForm();
    }
    setAnchorEl(null);
  };

  return (
    <>
      {!isCollapse && (
        <Box className={classes.drawerAvatarBox}>
          <Avatar alt={userName} src={`${userName}`} />
          <Box className={classes.drawerNameBox}>
            <Typography noWrap variant="subtitle1">
              {userName}
            </Typography>
            <Typography
              noWrap
              variant="body2"
              style={{ color: "text.secondary" }}
            >
              {userID}
            </Typography>
          </Box>
          <IconButton
            aria-label="options"
            aria-controls="fade-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={() => handleClose("")}
            TransitionComponent={Fade}
            PaperProps={{
              style: {
                width: "20ch",
              },
            }}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={() => handleClose("addNewContact")}>
              Add New Contact
            </MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>
        </Box>
      )}
    </>
  );
}
