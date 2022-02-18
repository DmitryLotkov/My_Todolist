import {TasksStateType, taskType} from "../App";
import {v1} from "uuid";
import { AddToDoListReducerActionType, RemoveToDoListActionType} from "./todolistsReducer";


export type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusType |
    ChangeTaskTitleType | AddToDoListReducerActionType | RemoveToDoListActionType;

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoListID: string
    taskID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string
    todoListID: string
}
export type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS',
    isDone: boolean
    todoListID: string
    taskID: string
}
export type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE',
    taskID: string,
    title: string,
    todoListID: string
}
export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todoListID: todolistID, taskID: taskID}
}
export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todoListID:todolistID}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusType => {
    return {type: 'CHANGE-TASK-STATUS', isDone: isDone, todoListID: todoListID, taskID:taskID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleType => {
    return {type: 'CHANGE-TASK-TITLE', title: title, taskID:taskID, todoListID:todoListID}
}


let initialState: TasksStateType = {};

export const taskReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":{
            return {
                ...state, [action.todoListID]:state[action.todoListID].filter(t => t.id !==action.taskID)
            }
        }
        case "ADD-TASK": {
            const newTask:taskType = {
                id: v1(), title: action.title, isDone: false
            }
            return {
                ...state, [action.todoListID]:[newTask, ...state[action.todoListID]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.todoListID]:state[action.todoListID].map(task => task.id === action.taskID ? {...task,isDone:action.isDone}:task)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state, [action.todoListID]:state[action.todoListID].map(task => task.id === action.taskID ? {...task, title: action.title}: task)
            }
        }
        case "ADD-TODOLIST":{

            state[action.todoListID] = []
            return {
                ...state
            }
        }
        case "REMOVE-TODOLIST":
            delete state[action.todoListID]
            return {
                ...state
            }
        default:
            return state
    }
}