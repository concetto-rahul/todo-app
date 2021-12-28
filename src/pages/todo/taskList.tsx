import {ReactElement, FC} from "react";
import {Task,taskStatus} from "../../schema/task";

import { makeStyles,Theme } from '@material-ui/core/styles';
import {Grid,Card,CardActionArea,CardActions,CardContent,Button,Typography,CardMedia} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme)=>({
    root: {
        marginTop:theme.spacing(5),
    },
    cardDescription:{
        height:60,
        overflow: 'hidden',
        WebkitLineClamp: 3,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical'
    },
    imgCard:{
        boxShadow:"none",
    }
}));

interface Props {
    tasks:Task[];
}

const TaskList:FC<Props>=({tasks}) : ReactElement=>{
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <Grid container spacing={3}>
            {tasks.length?(
                    tasks.map((task:Task)=>{
                        return (
                        <Grid item md={6} xs={12} key={task.id}>
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" noWrap>{task.title}</Typography>
                                        <Typography className={classes.cardDescription} variant="body2" color="textSecondary" component="p">{task.description}</Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">Share</Button>
                                    <Button size="small" color="primary">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        )
                    })
                ):(
                    <>
                    <Grid item md={12} xs={12}>
                        <Card className={classes.imgCard}>
                            <CardMedia component="img" alt="No task List" image="/images/todos_empty.svg" title="No task" />
                        </Card>
                    </Grid>
                    </>
            )}
        </Grid>
    </div>
  );
}

export default TaskList;