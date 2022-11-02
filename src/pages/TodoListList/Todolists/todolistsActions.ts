//thunks
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../../state/app-reducer";
import {todoListAPI} from "../../../api/todoListsAPI";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/Error-utils";
import {
    changeTodoListTitleAC,
    createTodoListAC,
    removeTodoListAC,
    setTodoListEntityStatusAC,
    setTodoListsAC
} from "./todolistsReducer";

export const getTodolistsTC = () => (dispatch: Dispatch/*<ActionsTasksType | ActionsTodoListsType | AuthActionsType>*/) => {
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
export const deleteTodoListTC = (todoListID: string) => (dispatch: Dispatch/*<ActionsTasksType | ActionsTodoListsType | AuthActionsType>*/) => {

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
export const createTodolistTC = (todoListTitle: string) => (dispatch: Dispatch/*<ActionsTasksType | ActionsTodoListsType | AuthActionsType>*/) => {
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