import {FilterValueType} from "../trash/AppOld";
import {todoListAPI} from "../api/todoListsAPI";
import {Dispatch} from "redux";
import {TodoListType} from "../api/taskAPI";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/Error-utils";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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

//reducer
let initialState: Array<TodoListDomainType> = []

const slice = createSlice({
    name: "todolist",
    initialState,
    reducers: {
        removeTodoListAC(state, action: PayloadAction<{ todoListID: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID);
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        changeTodoListFilterAC(state, action: PayloadAction<{
            todoListID: string,
            filter: FilterValueType
        }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID);
            state[index].filter = action.payload.filter;
        },
        createTodoListAC(state, action: PayloadAction<{ todoList: TodoListType }>) {
            state.unshift({...action.payload.todoList, filter: "all", entityStatus: "idle"})
        },
        changeTodoListTitleAC(state, action: PayloadAction<{ todoListID: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID);
            state[index].title = action.payload.title;
        },
        setTodoListsAC(state, action: PayloadAction<{ todolists: Array<TodoListType> }>) {
            return action.payload.todolists.map(td => ({...td, filter: "all", entityStatus: "idle"}));
        },
        setTodoListEntityStatusAC(state, action: PayloadAction<{
            todoListID: string,
            entityStatus: RequestStatusType
        }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID);
            if (index > -1) {
                state[index].entityStatus = action.payload.entityStatus;
            }
        }
    },
})
export const {
    removeTodoListAC, changeTodoListFilterAC, createTodoListAC, changeTodoListTitleAC,
    setTodoListsAC, setTodoListEntityStatusAC
} = slice.actions;

export const todoListsReducer = slice.reducer;
//thunks
export const getTodolists = () => (dispatch: Dispatch/*<ActionsTasksType | ActionsTodoListsType | AuthActionsType>*/) => {
    dispatch(setAppStatusAC({status: "loading"}));

    todoListAPI.getTodoLists()
        .then(res => {
            dispatch(setTodoListsAC({todolists: res.data}));
            dispatch(setAppStatusAC({status: "succeeded"}));
        })
        .catch((error: Error) => {
            console.log("Error when you try do get todolist", error);
            handleServerNetworkError(error, dispatch);
        })

}

export const deleteTodoList = (todoListID: string) => (dispatch: Dispatch/*<ActionsTasksType | ActionsTodoListsType | AuthActionsType>*/) => {

    dispatch(setAppStatusAC({status: "loading"}));
    dispatch(setTodoListEntityStatusAC({todoListID, entityStatus: "loading"}));
    todoListAPI.deleteTodolist(todoListID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoListAC({todoListID}));
                dispatch(setAppStatusAC({status: "succeeded"}));
            } else {
                handleServerAppError(res.data, dispatch, todoListID);
            }
        })
        .catch((error: Error) => {
            console.log("Error when you try do delete todolist", error)
            handleServerNetworkError(error, dispatch, todoListID)
        })
}

export const createTodolist = (todoListTitle: string) => (dispatch: Dispatch/*<ActionsTasksType | ActionsTodoListsType | AuthActionsType>*/) => {
    dispatch(setAppStatusAC({status: "loading"}));

    todoListAPI.createTodolist(todoListTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(createTodoListAC({todoList: res.data.data.item}));
                dispatch(setAppStatusAC({status: "succeeded"}));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error: Error) => {
            console.log("Error when you try create todolist", error);
            handleServerNetworkError(error, dispatch);
        })

}

export const changeTodoListTitleTC = (todoListTitle: string, todoListID: string) => (dispatch: Dispatch/*<ActionsTasksType | ActionsTodoListsType | AuthActionsType>*/) => {
    dispatch(setAppStatusAC({status: "loading"}));

    todoListAPI.updateTodolist(todoListID, todoListTitle)
        .then(res => {

            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC({todoListID, title: todoListTitle}));
                dispatch(setAppStatusAC({status: "succeeded"}));
            } else {

                handleServerAppError(res.data, dispatch, todoListID);
            }
        })
        .catch((error: Error) => {

            console.log("error when you change todolist title", error);
            handleServerNetworkError(error, dispatch, todoListID);
        })

}

