import {
    createTodoListAC,
    CreateToDoListReducerActionType,
    removeTodoListAC,
    RemoveToDoListActionType,
    SetTodoListActionType,
    setTodoListEntityStatusAC,
    setTodoListsAC
} from "../pages/TodoListList/Todolists/todolistsReducer";
import {taskAPI, TaskDataType, UpdateBodyType} from "../api/taskAPI";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/Error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppRootStateType} from "./state";


export type TasksStateType = {
    [key: string]: Array<TaskDataType>
}
//types
export type ActionsTasksType =

    | CreateToDoListReducerActionType
    | RemoveToDoListActionType
    | SetTodoListActionType


export type UpdateDomainTaskModelType = Partial<UpdateBodyType> //Это утилити тип, создает новый тип, где все параметры необязательные


const initialState: TasksStateType = {};
//thunks
export const createTaskTC = createAsyncThunk("tasks/createTask", async (param: { todoListID: string, inputData: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}));
    thunkAPI.dispatch(setTodoListEntityStatusAC({todoListID: param.todoListID, entityStatus: "loading"}));
    try {
        const res = await taskAPI.createTask(param.todoListID, param.inputData)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}));
            thunkAPI.dispatch(setTodoListEntityStatusAC({todoListID: param.todoListID, entityStatus: "succeeded"}));
            return res.data.data.item
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch, param.todoListID);
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error: any) {
        console.log("error when you try to create task", error);
        handleServerNetworkError(error, thunkAPI.dispatch, param.todoListID)
        return thunkAPI.rejectWithValue(null)
    }

})
export const fetchTasksTC = createAsyncThunk("tasks/fetchTasks", async (todoListID: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}));
    thunkAPI.dispatch(setTodoListEntityStatusAC({
        todoListID: todoListID,
        entityStatus: "loading"
    }));
    try {
        const res = await taskAPI.getTasks(todoListID)
        thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}));
        thunkAPI.dispatch(setTodoListEntityStatusAC({
            todoListID: todoListID,
            entityStatus: "succeeded"
        }));
        return {tasks: res.data.items, todoListID}
    } catch (error: any) {
        console.log("error when you try to do get toDoLists", error)
        handleServerNetworkError(error, thunkAPI.dispatch, todoListID)
        return thunkAPI.rejectWithValue(null)
    }

})
export const updateTaskTC = createAsyncThunk("tasks/updateTask", async (params: { todoListID: string, taskID: string, domainModel: UpdateDomainTaskModelType }, thunkAPI) => {

    const state = thunkAPI.getState() as AppRootStateType;
    let task = state.tasks[params.todoListID].find(task => task.id === params.taskID);
    thunkAPI.dispatch(setTodoListEntityStatusAC({
        todoListID: params.todoListID,
        entityStatus: "loading"
    }));
    if (!task) {
        console.warn("Task is not found in the state");
        return thunkAPI.rejectWithValue(null)
    }
    const apiModel: UpdateBodyType = {
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        status: task.status,
        ...params.domainModel
    }
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}));
    try {
        const res = await taskAPI.updateTask(params.todoListID, params.taskID, apiModel)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setTodoListEntityStatusAC({
                todoListID: params.todoListID,
                entityStatus: "succeeded"
            }));
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}));
            return params;

        } else {
            handleServerAppError(res.data, thunkAPI.dispatch, params.todoListID)
            return thunkAPI.rejectWithValue(null)
        }
    }
    catch (error: any) {
        console.log("error when you try do update task", error)
        handleServerNetworkError(error, thunkAPI.dispatch, params.todoListID)
        return thunkAPI.rejectWithValue(null)
    }

})
export const deleteTaskTC = createAsyncThunk("tasks/deleteTask", async (param: { todoListID: string, taskID: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}));
    thunkAPI.dispatch(setTodoListEntityStatusAC({todoListID: param.todoListID, entityStatus: "loading"}));
    try {
        const res = await taskAPI.deleteTask(param.todoListID, param.taskID)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}));
            thunkAPI.dispatch(setTodoListEntityStatusAC({todoListID: param.todoListID, entityStatus: "succeeded"}));
            return param
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch, param.todoListID)
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error: any) {
        console.log("error when you try to do delete task", error)
        handleServerNetworkError(error, thunkAPI.dispatch, param.todoListID)
        return thunkAPI.rejectWithValue(null)
    }
})


const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createTodoListAC, (state, action) => {
            state[action.payload.todoList.id] = [];
        });
        builder.addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.todoListID]
        });
        builder.addCase(setTodoListsAC, (state, action) => {
            action.payload.todolists.forEach((td: any) => {
                state[td.id] = []
            })
        })
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todoListID] = action.payload.tasks
        })
        builder.addCase(createTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload);
        })
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {

                const tasks = state[action.payload.todoListID];
                const index = tasks.findIndex(task => task.id === action.payload.taskID)
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel}
                }

        })
        builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
            if (action.payload) {
                const tasks = state[action.payload.todoListID]
                const index = tasks.findIndex(task => task.id === action.payload.taskID)
                if (index > -1) {
                    tasks.splice(index, 1);
                }
            }
        })
    }
})



export const taskReducer = slice.reducer;


