import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
import MessageIcon from "@material-ui/icons/MessageOutlined";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerAvatarBox: {
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
  const {
    userID,
    userName,
    handeleOpenForm,
    handeleShowContactOpen,
    logoutLoginData,
  } = useContext(ChatContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (key: string = "") => {
    if (key === "addNewContact") {
      handeleOpenForm();
    }
    setAnchorEl(null);
  };

  const handleLogoutData = () => {
    logoutLoginData();
    navigate("/chat");
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
          <IconButton onClick={handeleShowContactOpen}>
            <MessageIcon />
          </IconButton>
          <IconButton
            aria-label="Options"
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
            <MenuItem onClick={() => handleClose("addNewContact")}>
              Add New Contact
            </MenuItem>
            <MenuItem onClick={handleLogoutData}>Logout</MenuItem>
          </Menu>
        </Box>
      )}
    </>
  );
}
