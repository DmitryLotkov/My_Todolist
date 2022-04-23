import {FilterValueType} from "../trash/AppOld";
import {todoListAPI} from "../api/todoListsAPI";
import {Dispatch} from "redux";
import {TodoListType} from "../api/taskAPI";
import {RequestStatusType, SetAppErrorType, setAppStatusAC, SetAppStatusType} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/Error-utils";
import {ActionsTasksType} from "./task-reducer";


export type ActionsTodoListsType =
    RemoveToDoListActionType
    | CreateToDoListReducerActionType
    | ChangeTodoListFilterActionType
    | ChangeTodoListTitleActionType
    | SetTodoListActionType
    | SetAppStatusType
    | SetAppErrorType
    | SetTodoListEntityStatusActionType

export type TodoListDomainType = TodoListType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
};
//actionsType
export type SetTodoListActionType = ReturnType<typeof setTodoListsAC>;
export type RemoveToDoListActionType = ReturnType<typeof removeTodoListAC>;
export type CreateToDoListReducerActionType = ReturnType<typeof createTodoListAC>;
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>;
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>;
export type SetTodoListEntityStatusActionType = ReturnType<typeof setTodoListEntityStatusAC>;

//actions
export const removeTodoListAC = (todolistID: string) =>
    ({type: 'REMOVE-TODOLIST', todoListID: todolistID} as const);
export const changeTodoListFilterAC = (todoListID: string, filter: FilterValueType) =>
    ({type: "CHANGE-TODOLIST-FILTER", filter: filter, todoListID: todoListID} as const);
export const createTodoListAC = (todolist: TodoListType) =>
    ({type: "ADD-TODOLIST", todolist} as const);
export const changeTodoListTitleAC = (todoListID: string, title: string) =>
    ({type: "CHANGE-TODOLIST-TITLE", title, todoListID} as const);
export const setTodoListsAC = (todolists: Array<TodoListType>) =>
    ({type: 'SET-TODOLISTS', todolists} as const);
export const setTodoListEntityStatusAC = (todoListID: string, entityStatus: RequestStatusType) =>
    ({type: 'SET-ENTITY-STATUS', status: entityStatus, todoListID} as const);

//reducer
let initialState: Array<TodoListDomainType> = []

export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsTodoListsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todoListID);
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: "idle"}, ...state]
        case "CHANGE-TODOLIST-FILTER":
            return state.map(t => t.id === action.todoListID ? {...t, filter: action.filter} : t)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl);
        case "SET-TODOLISTS":
            return action.todolists.map(td => ({...td, filter: "all", entityStatus: "idle"}));
        case "SET-ENTITY-STATUS": {
            return state.map(tl => tl.id === action.todoListID ? {...tl, entityStatus: action.status} : tl);
        }
        default:
            return state;
    }
}

//thunks
export const getTodolists = () => (dispatch: Dispatch<ActionsTasksType | ActionsTodoListsType>) => {
    dispatch(setAppStatusAC("loading"));

    todoListAPI.getTodoLists()
        .then(res => {
            dispatch(setTodoListsAC(res.data));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch((error: Error) => {
            console.log("Error when you try do get task", error);
            handleServerNetworkError(error, dispatch);
        })

}

export const deleteTodoList = (todoListID: string) => (dispatch: Dispatch<ActionsTasksType | ActionsTodoListsType>) => {
    dispatch(setAppStatusAC("loading"));
    dispatch(setTodoListEntityStatusAC(todoListID, "loading"));
    todoListAPI.deleteTodolist(todoListID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoListAC(todoListID));
                dispatch(setAppStatusAC("succeeded"));
                dispatch(setTodoListEntityStatusAC(todoListID, "succeeded"));
            } else {
                handleServerAppError(res.data, dispatch, todoListID);
            }
        })
        .catch((error: Error) => {
            console.log("Error when you try do get task", error)
            handleServerNetworkError(error, dispatch,todoListID)
        })
}

export const createTodolist = (todoListTitle: string) => (dispatch: Dispatch<ActionsTasksType | ActionsTodoListsType>) => {
    dispatch(setAppStatusAC("loading"));

    todoListAPI.createTodolist(todoListTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(createTodoListAC(res.data.data.item));
                dispatch(setAppStatusAC("succeeded"));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error: Error) => {
            console.log("Error when you try do get task", error);
            handleServerNetworkError(error, dispatch);
        })

}

export const changeTodoListTitleTC = (todoListTitle: string, todoListID: string) => (dispatch: Dispatch<ActionsTasksType | ActionsTodoListsType>) => {
    dispatch(setAppStatusAC("loading"));

    todoListAPI.updateTodolist(todoListID, todoListTitle)
        .then(res => {

            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(todoListID, todoListTitle));
                dispatch(setAppStatusAC("succeeded"));
            } else {

                handleServerAppError(res.data, dispatch, todoListID);
            }
        })
        .catch((error: Error) => {

            console.log("error when you try do get task", error);
            handleServerNetworkError(error, dispatch, todoListID);
        })

}

