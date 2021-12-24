import { ActionMap } from "../schema/common";
import { Task,taskStatus } from "../schema/task";
import { getUniqueId } from "../utils/helper";

export enum taskActionTypes {
    LIST_TASK="listTask",
    GET_TASK="getTask",
    CREATE_TASK="createTask",
    UPDATE_TASK="updateTask",
    DELETE_TASK="deleteTask",
    ACTION_LOADING="loadingAction",
}

export type TaskInitialState={
    list:Task[];
    loading:boolean;
}

export const taskInitialState={
    list:[],
    loading:false,
}

type TaskActionPayload={
    [taskActionTypes.LIST_TASK] : Task[];
    [taskActionTypes.CREATE_TASK] : {
        title: string;
        description?: string;
    };
    [taskActionTypes.UPDATE_TASK] : {
        id: string;
        title: string;
        description?: string;
        status?: taskStatus;
    };
    [taskActionTypes.GET_TASK]: {
        id: number;
    };
    [taskActionTypes.DELETE_TASK]: {
        id: number;
    }
}

export type TaskActions = ActionMap<TaskActionPayload>[keyof ActionMap<TaskActionPayload>];

export const taskReducer = (state:any,action:TaskActions)=>{
    switch (action.type) {
        case taskActionTypes.CREATE_TASK:
            return {
                ...state,
                loading:false,
                list:[
                    ...state.list,
                    {
                        id: getUniqueId(),
                        title: action.payload.title,
                        description: action.payload.description,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        status: taskStatus.PENDING,
                    }
                ]
            }
        case taskActionTypes.UPDATE_TASK:
            return {
                ...state,
                loading:false,
                list:[
                    ...state.list,
                    {
                        title: action.payload.title,
                        description: action.payload.description,
                        updatedAt: new Date(),
                        status: action.payload.status,
                    }
                ]
            }
        default:
            return state;
    }
}