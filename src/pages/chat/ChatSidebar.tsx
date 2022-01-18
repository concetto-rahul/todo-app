import { useState, useEffect } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import {
  Box,
  Hidden,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import withWidth, { WithWidth } from "@material-ui/core/withWidth";
import clsx from "clsx";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import PeopleFill from "@material-ui/icons/PeopleOutline";

import ChatAccount from "./ChatAccount";

const DRAWER_WIDTH = 320;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mobileDrawerIcon: {
      left: 0,
      zIndex: 9,
      width: 32,
      height: 32,
      position: "absolute",
      top: theme.spacing(30),
      borderRadius: `0 12px 12px 0`,
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      boxShadow: theme.palette.primary.light,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: DRAWER_WIDTH,
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-left",
    },
    drawerOpen: {
      width: DRAWER_WIDTH,
      position: "static",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      position: "static",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    drawerAvatarBox: {
      padding: "2px 1px 2px 3px",
      display: "flex",
      alignItems: "center",
    },
  })
);

const ChatSidebar = (props: WithWidth) => {
  const classes = useStyles();
  const { width } = props;
  const [open, setOpen] = useState(false);
  const isMobile = ["sm", "xs"].includes(width);
  const isCollapse = !isMobile && !open;

  const handleDrawer = () => {
    setOpen((open) => !open);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const handleOpenDrawer = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (isMobile) {
      return handleCloseDrawer();
    }
    return handleOpenDrawer();
  }, [isMobile]);



  const renderContent = (
    <>
      <Box className={classes.drawerHeader}>
        <ChatAccount isCollapse={isCollapse}/>
        <IconButton onClick={handleDrawer}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <>
      <Hidden only={["lg", "xl", "md"]}>
        <IconButton
          className={classes.mobileDrawerIcon}
          onClick={handleOpenDrawer}
        >
          <PeopleFill width={16} height={16} />
        </IconButton>
      </Hidden>
      <Hidden only={["lg", "xl", "md"]}>
        <Drawer
          ModalProps={{ keepMounted: true }}
          open={open}
          onClose={handleCloseDrawer}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
      <Hidden only={["sm", "xs"]}>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
    </>
  );
};

export default withWidth()(ChatSidebar);
