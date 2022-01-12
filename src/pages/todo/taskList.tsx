import { ReactElement, FC } from "react";
import { Task } from "../../schema/task";

import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardMedia,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
  cardGrid: {
    position: "relative",
  },
  cardDescription: {
    height: 60,
    overflow: "hidden",
    WebkitLineClamp: 3,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
  },
  imgCard: {
    boxShadow: "none",
  },
  cardDeleteIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    color: "#f44336",
    cursor:"pointer"
  },
}));

interface Props {
  tasks: Task[];
  taskClickAction: (taskId: string | undefined) => void;
  deleteTask: (taskId: string | undefined) => void;
}

const TaskList: FC<Props> = ({
  tasks,
  taskClickAction,
  deleteTask,
}): ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {tasks.length ? (
          tasks.map((task: Task) => {
            return (
              <Grid
                item
                md={6}
                xs={12}
                key={task.id}
                className={classes.cardGrid}
              >
                <DeleteIcon
                  className={classes.cardDeleteIcon}
                  onClick={() => deleteTask(task.id)}
                />
                <Card onClick={() => taskClickAction(task.id)}>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        noWrap
                      >
                        {task.title}
                      </Typography>
                      <Typography
                        className={classes.cardDescription}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {task.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })
        ) : (
          <>
            <Grid item md={12} xs={12}>
              <Card className={classes.imgCard}>
                <CardMedia
                  component="img"
                  alt="No task List"
                  image="/images/todos_empty.svg"
                  title="No task"
                />
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default TaskList;
