import { useContext  } from "react";
import { TaskContext } from '../../context/task';

import { AppBar,Toolbar,Typography,CssBaseline,Container,Box,IconButton,Badge } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Outlet } from 'react-router-dom';

import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';

const useStyle= makeStyles((theme)=>({
    rootStyle:{
        flexGrow:1,
    },
    logoDiv:{
        flexGrow:1,
    },
    boxIcons:{
        flexGrow:0,
    },
    pageContainer:{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(5),
        [theme.breakpoints.up('xs')]: {
            paddingLeft:theme.spacing(3),
            paddingRight:theme.spacing(3),
        },
        [theme.breakpoints.up('md')]: {
            paddingLeft:theme.spacing(6),
            paddingRight:theme.spacing(6),
        },
        // px: { xs: 3, md: 6 },
        height: '100%',
        '& >:first-child': {
            flex: '1 0 115%'
        }
    }
}));

export default function MainLayout() {
    const classes=useStyle();
    const { state:{ list} } = useContext(TaskContext);
    return (
        <>
        <CssBaseline />
        <div className={classes.rootStyle}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography className={classes.logoDiv} variant="h6" noWrap component="div">
                            ToDo
                        </Typography>
                        <Box className={classes.boxIcons}>
                            <IconButton aria-label="show 4 new task" color="inherit">
                                <Badge badgeContent={list.length} color="error">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton edge="end" aria-label="account of current user" aria-haspopup="true" color="inherit">
                                <AccountCircle />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container maxWidth="lg" className={classes.pageContainer}>
                <Outlet />
            </Container>
        </div>
        </>
    );
}