import {
    CreateToDoListReducerActionType,
    RemoveToDoListActionType,
    SetTodoListActionType,
} from "./todolistsReducer";
import {taskAPI, TaskDataType, UpdateBodyType} from "../api/taskAPI";
import {Dispatch} from "redux";
import {AppRootStateType} from "./state";


export type TasksStateType = {
    [key: string]: Array<TaskDataType>
}
//types
export type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof createTaskAC>
    | ReturnType<typeof updateTaskAC>
    | CreateToDoListReducerActionType
    | RemoveToDoListActionType
    | SetTodoListActionType
    | ReturnType<typeof setTasksAC>
export type UpdateDomainTaskModelType = Partial<UpdateBodyType> //Это утилити тип, создает новый тип, где все параметры необязательные

//actions
export const removeTaskAC = (taskID: string, todolistID: string) =>
    ({type: 'REMOVE-TASK', todoListID: todolistID, taskID: taskID}) as const;
export const createTaskAC = (task: TaskDataType) =>
    ({type: 'ADD-TASK', task}) as const;
export const updateTaskAC = (taskID: string, todoListID: string, model: UpdateDomainTaskModelType) =>
    ({type: 'UPDATE-TASK', model, taskID: taskID, todoListID: todoListID}) as const;
export const setTasksAC = (tasks: Array<TaskDataType>, todoListID: string) =>
    ({type: "SET-TASKS", tasks, todoListID}) as const;


const initialState: TasksStateType = {};

export const taskReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskID)
            }
        case "ADD-TASK":
            return {
                ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => task.id === action.taskID ? {
                    ...task,
                    ...action.model
                } : task)
            }
        case "ADD-TODOLIST":

            state[action.todolist.id] = []
            return {
                ...state
            }
        case "REMOVE-TODOLIST":
            delete state[action.todoListID]
            return {
                ...state
            }
        case "SET-TODOLISTS":
            action.todolists.forEach(td => {
                state[td.id] = []
            })
            return {...state}
        case "SET-TASKS":
            return {...state, [action.todoListID]: action.tasks}
        default:
            return state
    }
}
//thunks
export const getTasks = (todoListID: string) => (dispatch: Dispatch<ActionsType>) => {
    taskAPI.getTasks(todoListID)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todoListID));
        })
        .catch((error) => console.log("error in getTasks", error));
}

export const createTask = (todoListID: string, inputData: string) => (dispatch: Dispatch<ActionsType>) => {
        taskAPI.createTask(todoListID, inputData)
            .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(createTaskAC(res.data.data.item));
            }
        })
    }

export const deleteTask = (todoListID: string, taskID: string) => (dispatch: Dispatch<ActionsType>) => {
        taskAPI.deleteTask(todoListID, taskID)
            .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(taskID, todoListID));
            }
        });
    }


export const updateTaskTC = (todoListID: string, taskID: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState();
        let task = state.tasks[todoListID].find(task => task.id === taskID);

        if (!task) {
            console.warn("Task is not found in the state");
            return
        }
        const apiModel: UpdateBodyType = {
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            ...domainModel
        }

        taskAPI.updateTaskTitle(todoListID, taskID, apiModel).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC(taskID, todoListID, apiModel))
            }
        });
    }
}