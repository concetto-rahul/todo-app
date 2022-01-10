import { ReactElement, FC, useContext, useState, useEffect } from "react";
import { TaskContext } from "../../context/task";
import Page from "../../components/Page";

import { Tooltip, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SyncIcon from "@material-ui/icons/Sync";

import { getFunctions, httpsCallable } from "firebase/functions";
import { useFirebase } from "../../firebase-client/useInitFirebase";

import TaskForm from "./taskForm";
import TaskList from "./taskList";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Task } from "../../schema/task";
import { taskActionTypes } from "../../reducer/task";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButton: {
      position: "relative",
    },
    iconButton2: {
      position: "absolute",
      right: "0",
    },
    syncIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

const TodoApp: FC<any> = (): ReactElement => {
  const app = useFirebase();
  const functions = getFunctions(app);
  const queryParams = new URLSearchParams(window.location.search);
  const redirectURLCode = queryParams.get("code");
  const { state, dispatch } = useContext(TaskContext);
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [syncingListData, setSyncingListData] = useState(false);
  const [formFieldData, setFormFieldData] = useState<Task | null>(null);
  const classes = useStyles();

  useEffect(() => {
    async function updateListData() {
      setSyncingListData(true);
      console.log("redirectURLCode", redirectURLCode);
      const uploadFile = await httpsCallable(functions, "uploadFile");
      await uploadFile({
        code: redirectURLCode,
        listData: [
          {
            id: 1640699479291,
            title: "Create Your New Task One",
            description:
              "Create Your New Task One Create Your New Task One Create Your New Task One Create Your New Task One Create Your New Task OneCreate Your New Task One Create Your New Task One",
            createdAt: "2021-12-28T13:51:19.291Z",
            updatedAt: "2021-12-28T13:51:19.291Z",
            status: "pending",
          },
          {
            id: 1640699490360,
            title: "Create Your New Task Two",
            description:
              "Create Your New Task Two Create Your New Task Two Create Your New Task Two Create Your New Task Two Create Your New Task Two Create Your New Task Two",
            createdAt: "2021-12-28T13:51:30.360Z",
            updatedAt: "2021-12-28T13:51:30.360Z",
            status: "pending",
          },
          {
            id: 1640699501020,
            title: "Create Your New Task Three",
            description:
              "Create Your New Task Three Create Your New Task Three Create Your New Task Three Create Your New Task Three Create Your New Task Three Create Your New Task Three",
            createdAt: "2021-12-28T13:51:41.020Z",
            updatedAt: "2021-12-28T13:51:41.020Z",
            status: "pending",
          },
        ],
      })
        .then((res: any) => {
          console.log("uploadFile res", res?.data);
        })
        .catch((err) => console.log("uploadFile Error", err));
    }
    redirectURLCode && updateListData();
  }, [redirectURLCode]);

  const handleClickOpenTaskForm = (taskId: null | string = null) => {
    if (taskId && state?.list) {
      const listData = state?.list?.filter(
        (listData) => listData.id === taskId
      );
      if(listData.length > 0){
        setFormFieldData({...listData[0]});
      }
    }
    setOpenTaskForm(true);
  };

  const handleAuthURL = async () => {
    if (!syncingListData) {
      const generateAuthUrl = await httpsCallable(functions, "generateAuthUrl");
      await generateAuthUrl()
        .then((res: any) => {
          console.log(res?.data?.authUrl);
          if (res?.data?.authUrl) {
            window.location.href = `${res?.data?.authUrl}`;
          }
        })
        .catch((err) => console.log("Error", err));
    } else {
      alert("Please wait data syncingp0 is in progress...");
    }
  };

  const closeTaskForm = ()=>{
    setFormFieldData(null);
    setOpenTaskForm(false);
  }

  const deleteTask = (taskId: undefined | string) => {
    taskId && dispatch({ type: taskActionTypes.DELETE_TASK, payload: {id:taskId} })
  };

  return (
    <Page
      title="Task list"
      description="you can view your task list"
      key="todo,list,add,view,abcgfd,sgdgdg"
    >
      <TaskForm
        openTaskForm={openTaskForm}
        closeTaskForm={closeTaskForm}
        dispatch={dispatch}
        formFieldData={formFieldData}
      />
      <div className={classes.iconButton}>
        <Tooltip title="Add your new task" aria-label="add">
          <Fab color="primary" onClick={() => handleClickOpenTaskForm(null)}>
            <AddIcon />
          </Fab>
        </Tooltip>
        <Tooltip title="sync to gmail account " aria-label="add">
          <Fab
            className={classes.iconButton2}
            color="secondary"
            variant="extended"
            onClick={handleAuthURL}
          >
            <SyncIcon className={classes.syncIcon} /> Sync To Gmail Account
          </Fab>
        </Tooltip>
      </div>
      <TaskList tasks={state?.list} taskClickAction={handleClickOpenTaskForm} deleteTask={deleteTask}/>
    </Page>
  );
};

export default TodoApp;
