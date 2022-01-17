import { useContext } from "react";
import { TaskContext } from "../../context/task";

import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Container,
  Box,
  IconButton,
  Badge,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import TaskIcon from "@material-ui/icons/ListAltOutlined";
import MoviesIcon from "@material-ui/icons/MovieFilterOutlined";
import VideotelephonyIcon from '@material-ui/icons/DuoOutlined';
import ChatIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';

const useStyle = makeStyles((theme) => ({
  rootStyle: {
    flexGrow: 1,
  },
  logoDiv: {
    flexGrow: 1,
  },
  boxIcons: {
    flexGrow: 0,
  },
  pageContainer: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(10),
    paddingTop: theme.spacing(5),
    [theme.breakpoints.up("xs")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    // px: { xs: 3, md: 6 },
    height: "100%",
    "& >:first-child": {
      flex: "1 0 115%",
    },
  },
  bottomNavigationMain: {
    width: "100%",
    position: "fixed",
    top: "auto",
    bottom: 0,
  },
}));

type BottomNavigationTabType = {
  label: string;
  url: string;
  icon: any;
};

export const bottomNavigationTab: BottomNavigationTabType[] = [
  {
    label: "Task",
    url: "/list",
    icon: <TaskIcon />,
  },
  {
    label: "Movies",
    url: "/movies",
    icon: <MoviesIcon />,
  },
  {
    label: "Videotelephony",
    url: "/videotelephony",
    icon: <VideotelephonyIcon />,
  },
  {
    label: "Chat",
    url: "/chat",
    icon: <ChatIcon />,
  },
];

export default function MainLayout() {

  const classes = useStyle();
  const {
    state: { list },
  } = useContext(TaskContext);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickNavigation = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    navigate(bottomNavigationTab[newValue].url);
  };
  
  let checkURL=location.pathname && location.pathname.split("/");
  checkURL=checkURL && checkURL.filter(Boolean);
  const bottomNavigationTabValue = checkURL && checkURL[0]?bottomNavigationTab.findIndex(data=>data.url===`/${checkURL[0]}`):0;

  return (
    <>
      <CssBaseline />
      <div className={classes.rootStyle}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                className={classes.logoDiv}
                variant="h6"
                noWrap
                component="div"
              >
                ToDo
              </Typography>
              <Box className={classes.boxIcons}>
                <IconButton aria-label="show 4 new task" color="inherit">
                  <Badge badgeContent={list.length} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Container maxWidth="lg" className={classes.pageContainer}>
          <Outlet />
        </Container>
        <BottomNavigation
          value={bottomNavigationTabValue}
          showLabels
          className={classes.bottomNavigationMain}
          onChange={handleClickNavigation}
        >
          {bottomNavigationTab.map((data) => {
            return (
              <BottomNavigationAction
                key={data.label}
                label={data.label}
                icon={data.icon}
              />
            );
          })}
        </BottomNavigation>
      </div>
    </>
  );
}
