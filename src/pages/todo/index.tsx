import { ReactElement,FC,useContext,useState } from "react";
import { TaskContext } from '../../context/task';
import Page from "../../components/Page";

import { Tooltip,Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import SyncIcon from '@material-ui/icons/Sync';

import TaskForm from "./taskForm";
import TaskList from "./taskList";

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButton: {
        position:"relative",
    },
    iconButton2: {
        position: "absolute",
        right: "0",
    },
    syncIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

const TodoApp:FC<any>=() : ReactElement=>{
    const { state, dispatch } = useContext(TaskContext);
    const [openTaskForm, setOpenTaskForm] = useState(false);
    const classes = useStyles();

    const handleClickOpenTaskForm = () => {
        setOpenTaskForm(true);
    };
    return(
        <Page title="Task list" description="you can view your task list" key="todo,list,add,view,abcgfd,sgdgdg">
            <TaskForm openTaskForm={openTaskForm} setOpenTaskForm={setOpenTaskForm} dispatch={dispatch}/>
            <div className={classes.iconButton}>
                <Tooltip title="Add your new task" aria-label="add">
                    <Fab color="primary" onClick={handleClickOpenTaskForm}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
                <Tooltip title="sync to gmail account " aria-label="add">
                    <Fab  className={classes.iconButton2} color="secondary" variant="extended" >
                        <SyncIcon className={classes.syncIcon}  />  Sync To Gmail Account
                    </Fab>
                </Tooltip>
            </div>
            <TaskList tasks={state?.list} />
        </Page>
    )
}

export default TodoApp;