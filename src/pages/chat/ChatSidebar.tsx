import { useState, useEffect, useContext } from "react";
import { ChatContext } from "../../context/chat";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import BadgeStatus from "../../components/BadgeStatus";
import {
  Box,
  Hidden,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  InputBase,
  alpha,
  Avatar,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import withWidth, { WithWidth } from "@material-ui/core/withWidth";
import clsx from "clsx";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PeopleFill from "@material-ui/icons/PeopleOutline";

import ChatAccount from "./ChatAccount";
import ContactUsers from "./ContactUsers";
import SearchIcon from "@material-ui/icons/Search";

const DRAWER_WIDTH = 320;

const AVATAR_SIZE = 48;
const AVATAR_SIZE_GROUP = 32;

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
      width: theme.spacing(8) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(10) + 1,
      },
    },
    drawerAvatarBox: {
      padding: "2px 1px 2px 3px",
      display: "flex",
      alignItems: "center",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(1),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(2),
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
      padding: theme.spacing(1, 0, 1, 0),
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
    conversationList: {
      cursor: "pointer",
    },
    conversationListItem: {
      padding: theme.spacing(1.5, 2),
      transition: theme.transitions.create("all"),
    },
    conversationListItemBox: {
      position: "relative",
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
      "& .avatarWrapper": {
        position: "absolute",
        width: AVATAR_SIZE_GROUP,
        height: AVATAR_SIZE_GROUP,
        "&:nth-of-type(1)": {
          left: 0,
          zIndex: 9,
          bottom: 2,
          "& .MuiAvatar-root": {
            border: () => `solid 2px ${theme.palette.background.paper}`,
          },
        },
        "&:nth-of-type(2)": { top: 2, right: 0 },
      },
    },
    conversationAvatarWrapper: {
      position: "relative",
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
      "& .MuiAvatar-img": { borderRadius: "50%" },
      "& .MuiAvatar-root": { width: "100%", height: "100%" },
    },
  })
);

const ChatSidebar = (props: WithWidth) => {
  const classes = useStyles();
  const { width } = props;
  const [serachKeyWord, setSerachKeyWord] = useState("");
  const [open, setOpen] = useState(false);
  const isMobile = ["sm", "xs"].includes(width);
  const isCollapse = !isMobile && !open;

  const { formattedConversations, selectUserForConversation } =
    useContext(ChatContext);
  console.log(formattedConversations);

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
        <ChatAccount isCollapse={isCollapse} />
        <IconButton onClick={handleDrawer}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
      <Divider />
      {!isCollapse && (
        <>
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
        </>
      )}
      <List className={classes.conversationList}>
        {formattedConversations &&
          formattedConversations.map((conversationsData: any) => (
            <ChatConversationItem
              key={`${conversationsData.recipients
                .map((data: any) => data.id)
                .join("-")}`}
              isCollap={isCollapse}
              conversationsData={conversationsData}
              selectUserForConversation={selectUserForConversation}
            />
          ))}
      </List>
    </>
  );

  return (
    <>
      <ContactUsers />
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

const ChatConversationItem = ({
  isCollap,
  conversationsData,
  selectUserForConversation,
}: {
  isCollap: boolean;
  conversationsData: any;
  selectUserForConversation: (data: any) => void;
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isGroup = conversationsData.recipients.length > 1;
  const isOnlineGroup =
    isGroup &&
    conversationsData.recipients
      .map((item: any) => item.status)
      .includes("online");
  const isUnread = false;

  const userNames = conversationsData.recipients
    .map((data: any) => data.name)
    .join(", ");
  const userIDs = conversationsData.recipients
    .map((data: any) => data.id)
    .join(",");

  return (
    <ListItem
      button
      className={classes.conversationListItem}
      onClick={() => selectUserForConversation(userIDs)}
    >
      <ListItemAvatar>
        <Box className={classes.conversationListItemBox}>
          {conversationsData.recipients.slice(0, 2).map((participant: any) => (
            <div
              className={classes.conversationAvatarWrapper}
              key={participant.id}
            >
              <Avatar alt={participant.name} src={participant.name} />
              {!isGroup && participant?.status && (
                <BadgeStatus
                  status={participant.status}
                  style={{
                    right: 2,
                    bottom: 2,
                    position: "absolute",
                  }}
                />
              )}
            </div>
          ))}

          {isOnlineGroup && (
            <BadgeStatus
              status="online"
              style={{ right: 2, bottom: 2, position: "absolute" }}
            />
          )}
        </Box>
      </ListItemAvatar>
      {!isCollap && (
        <>
          <ListItemText
            primary={userNames}
            primaryTypographyProps={{
              noWrap: true,
              variant: "subtitle2",
            }}
            secondary={conversationsData.lastMessage.message}
            secondaryTypographyProps={{
              noWrap: true,
              variant: isUnread ? "subtitle2" : "body2",
              color: isUnread ? "textPrimary" : "textSecondary",
            }}
          />

          <Box
            style={{
              marginLeft: theme.spacing(2),
              height: 44,
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
            }}
          >
            <Box
              style={{
                marginBottom: theme.spacing(1.25),
                fontSize: 12,
                lineHeight: "22px",
                whiteSpace: "nowrap",
                color: "text.disabled",
              }}
            >
              {/* {formatDistanceToNowStrict(new Date(displayLastActivity), {
                addSuffix: false,
              })} */}
              {1}
            </Box>
            {isUnread && <BadgeStatus status="unread" size="small" />}
          </Box>
        </>
      )}
    </ListItem>
  );
};

export default withWidth()(ChatSidebar);
