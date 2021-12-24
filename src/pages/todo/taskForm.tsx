import React, { useState } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { taskActionTypes } from '../../reducer/task';
import {creatTaskValidation } from '../../validations/task';
import { isEmpty } from '../../validations/basicValidations';
const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    formRoot: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width:"100%",
        },
    }
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


type TaskFormType={
    openTaskForm:boolean;
    setOpenTaskForm:(data:boolean) => void;
    dispatch:any;
}


export interface DialogFormProps extends WithStyles<typeof styles> {
    children: React.ReactNode;
    [key: string]: any;
}

const DialogForm = withStyles(styles)((props: DialogFormProps) => {
    const { children, classes, ...other } = props;
    return (
      <form className={classes.formRoot} {...other}>
        {children}
      </form>
    );
});

export default function TaskForm({openTaskForm,setOpenTaskForm,dispatch}:TaskFormType) {
    const [submitButtonDisable,setSubmitButtonDisable]=useState(false);
    const [formErrors,setFormErrors]=useState<any>({});
    const onSaveChanges = async (event:any) => {
        setSubmitButtonDisable(true);
        event.preventDefault();
        const data = new FormData(event.target);

        let formData={
            title: data.get('title'),
            description: data.get('description')
        };
        const validationError=creatTaskValidation(formData);
        if(!isEmpty(validationError)){
            setFormErrors({...validationError});
            setSubmitButtonDisable(false);
        }else{
            await dispatch({type:taskActionTypes.CREATE_TASK,payload:formData});
            event.target.reset();
            setSubmitButtonDisable(false);
            setFormErrors([]);
            setOpenTaskForm(false);
        }
    };

    const handleClose = () => {
        setOpenTaskForm(false);
    };

    return (
        <Dialog aria-labelledby="customized-dialog-title" open={openTaskForm}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Create Your New Task
            </DialogTitle>
            <DialogContent dividers>
                <DialogForm autoComplete="off" onSubmit={onSaveChanges}>
                    <TextField id="task-title" name="title" label="Title" variant="outlined" error={formErrors?.title?true:false} helperText={formErrors?.title}/>
                    <TextField id="task-description" name="description" label="Description" multiline rows={4}  variant="outlined" error={formErrors?.description?true:false} helperText={formErrors?.description}/>
                    <Button disabled={submitButtonDisable} autoFocus type="submit" color="primary" variant="contained">
                        Submit
                    </Button>
                </DialogForm>
            </DialogContent>
        </Dialog>
    );
}
