import {
    AddToDoListReducerActionType,
    RemoveToDoListActionType,
    SetTodoListActionType,
} from "./todolistsReducer";
import {taskAPI, TaskDataType, TaskStatuses, UpdateBodyType} from "../api/taskAPI";
import {Dispatch} from "redux";
import {AppRootStateType} from "./state";


export type SetServerTasksType = {
    type: "SET-TASKS"
    tasks: Array<TaskDataType>
    todoListID: string
}
export type TasksStateType = {
    [key: string]: Array<TaskDataType>
}
export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusType
    | UpdateTaskActionType
    | AddToDoListReducerActionType
    | RemoveToDoListActionType
    | SetTodoListActionType
    | SetServerTasksType;

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoListID: string
    taskID: string
}


export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskDataType
}
export type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS',
    status: TaskStatuses
    todoListID: string
    taskID: string
}
export type UpdateTaskActionType = {
    type: 'UPDATE-TASK',
    model:UpdateDomainTaskModelType
    todoListID: string
    taskID: string
}
export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todoListID: todolistID, taskID: taskID}
}
export const createTaskAC = (task: TaskDataType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
/*export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListID: string): ChangeTaskStatusType => {
    return {type: 'CHANGE-TASK-STATUS', status, todoListID: todoListID, taskID: taskID}
}*/
export const updateTaskAC = (taskID: string, todoListID: string, model:UpdateDomainTaskModelType): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', model, taskID: taskID, todoListID: todoListID}
}
export const setTasksAC = (tasks: Array<TaskDataType>, todoListID: string): SetServerTasksType => {
    return {type: "SET-TASKS", tasks, todoListID}
}

const initialState: TasksStateType = {};

export const taskReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskID)
            }
        }
        case "ADD-TASK": {
            return {
                ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        /*case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .map(task => task.id === action.taskID ? {...task, status: action.status} : task)
            }
        }*/
        case "UPDATE-TASK": {
            debugger
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => task.id === action.taskID ? {
                    ...task,
                   ...action.model
                } : task)
            }
        }

        case "ADD-TODOLIST": {

            state[action.todolist.id] = []
            return {
                ...state
            }
        }
        case "REMOVE-TODOLIST":
            delete state[action.todoListID]
            return {
                ...state
            }
        case "SET-TODOLISTS": {
            action.todolists.forEach(td => {
                state[td.id] = []
            })
            return {...state}
        }
        case "SET-TASKS": {

            return {...state, [action.todoListID]: action.tasks}
        }
        default:
            return state
    }
}

export const getTasks = (todoListID: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.getTasks(todoListID).then(res => {

            dispatch(setTasksAC(res.data.items, todoListID))
        }).catch((error) => console.log("error in getTasks", error))
    }

}
export const createTask = (todoListID: string, inputData: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.createTask(todoListID, inputData).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(createTaskAC(res.data.data.item));
            }
        })
    }
}
export const deleteTask = (todoListID: string, taskID: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.deleteTask(todoListID, taskID).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(taskID, todoListID))
            }
        });
    }
}

export type UpdateDomainTaskModelType = {
    title?: string,
    description?: string,
    completed?: boolean,
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todoListID: string, taskID: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
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