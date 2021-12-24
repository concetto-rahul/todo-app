import { createContext,useReducer,FC,ReactElement } from 'react';
import { TaskInitialState,taskInitialState,taskReducer } from "../reducer/task";

const TaskContext = createContext<{
    state: TaskInitialState;
    dispatch: React.Dispatch<any>;
  }>({
    state: taskInitialState,
    dispatch: () => null
});

const TaskContextProvider: FC<any> = ({ children }) : ReactElement => {
    const [state,dispatch]=useReducer(taskReducer,taskInitialState);
    return (
        <TaskContext.Provider value={{state,dispatch}}>
            {children}
        </TaskContext.Provider>
    );
};

export { TaskContext, TaskContextProvider };