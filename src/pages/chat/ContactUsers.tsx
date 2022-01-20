import { useContext, useState } from "react";
import { ChatContext } from "../../context/chat";
import {
  createStyles,
  makeStyles,
  Theme,
  alpha,
} from "@material-ui/core/styles";
import {
  Drawer,
  Box,
  IconButton,
  Typography,
  Divider,
  InputBase,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import ArrowBackIcon from "@material-ui/icons/ArrowBackOutlined";
import SearchIcon from "@material-ui/icons/Search";

const DRAWER_WIDTH = 320;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messageDrawerDiv: {
      textAlign: "center",
    },
    messageDrawer: {
      width: DRAWER_WIDTH,
      position: "static",
    },
    drawer: {
      width: DRAWER_WIDTH,
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
    drawerHeader: {
      flexShrink: 0,
      minHeight: 70,
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "100%",
      },
      border: "1px solid rgba(0, 0, 0, 0.12)",
      borderRadius: "22px",
      margin: theme.spacing(1, 0),
    },
    drawerNameBox: {
      marginLeft: "8px",
      marginRight: "13px",
    },
  })
);

const ContactUsers = () => {
  const {
    showContact,
    handeleShowContactClose,
    contactList,
    selectUserForConversation,
  } = useContext(ChatContext);
  const [serachKeyWord, setSerachKeyWord] = useState("");
  const classes = useStyles();

  let filteredData = [];
  if (serachKeyWord.length > 0) {
    filteredData = contactList.filter((entry) =>
      Object.values(entry).some(
        (val) => typeof val === "string" && val.includes(serachKeyWord)
      )
    );
  } else {
    filteredData = contactList;
  }
  return (
    <div className={classes.messageDrawerDiv}>
      <Drawer
        ModalProps={{ keepMounted: true }}
        open={showContact}
        onClose={handeleShowContactClose}
        className={classes.messageDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box className={classes.drawerHeader}>
          <IconButton onClick={handeleShowContactClose}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">New Chat</Typography>
        </Box>
        <Divider />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setSerachKeyWord(e.target.value)}
          />
        </div>
        <Divider />
        <List>
          {filteredData &&
            filteredData.map((data) => {
              return (
                <ListItem
                  button
                  key={`contactUser${data.userName}`}
                  style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
                  onClick={() => selectUserForConversation(data.userID)}
                >
                  <ListItemIcon>
                    <Avatar alt={data.userName} src={`${data.userName}`} />
                  </ListItemIcon>
                  <ListItemText
                    primary={data.userName}
                    primaryTypographyProps={{
                      noWrap: true,
                      variant: "subtitle2",
                    }}
                    secondary={data.userID}
                    secondaryTypographyProps={{
                      noWrap: true,
                      variant: "body2",
                      color: "textSecondary",
                    }}
                  />
                </ListItem>
              );
            })}
        </List>
      </Drawer>
    </div>
  );
};

export default ContactUsers;
