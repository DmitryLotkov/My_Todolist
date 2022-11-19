//thunks
import {setAppStatusAC} from "../../../state/app-reducer";
import {todoListAPI} from "../../../api/todoListsAPI";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/Error-utils";
import {setTodoListEntityStatusAC} from "./todolistsReducer";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getTodolistsTC = createAsyncThunk("todolist/getTodos", async (arg, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: "loading"}));
    try {
        const res = await todoListAPI.getTodoLists();
        dispatch(setAppStatusAC({status: "succeeded"}));
        return {todolists: res.data};
    } catch (error: any) {
        console.log("Error when you try do get todolist", error);
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
})
export const deleteTodoListTC = createAsyncThunk("todolist/deleteTodos", async (todoListID: string, thunkAPI) => {

    thunkAPI.dispatch(setAppStatusAC({status: "loading"}));
    thunkAPI.dispatch(setTodoListEntityStatusAC({todoListID, entityStatus: "loading"}));
    try {
        const res = await todoListAPI.deleteTodolist(todoListID)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}));
            return {todoListID: todoListID};
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch, todoListID);
            return thunkAPI.rejectWithValue(null);
        }
    } catch (error: any) {
        console.log("Error when you try do delete todolist", error)
        handleServerNetworkError(error, thunkAPI.dispatch, todoListID);
        return thunkAPI.rejectWithValue(null);
    }
})
export const createTodolistTC = createAsyncThunk("todolist/createTodos", async (todoListTitle: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}));
    try {
        const res = await todoListAPI.createTodolist(todoListTitle)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}));
            return {todoList: res.data.data.item};
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (error: any) {
        console.log("Error when you try create todolist", error);
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null)
    }
})
export const changeTodoListTitleTC = createAsyncThunk("todolist/changeTodoListTitle", async (params: { todoListTitle: string, todoListID: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}));
    try {
        const res = await todoListAPI.updateTodolist(params.todoListID, params.todoListTitle)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}));
            return {todoListID: params.todoListID, todoListTitle: params.todoListTitle};
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch, params.todoListID);
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error: any) {
        console.log("error when you change todolist title", error);
        handleServerNetworkError(error, thunkAPI.dispatch, params.todoListID);
        return thunkAPI.rejectWithValue(null)
    }
})
