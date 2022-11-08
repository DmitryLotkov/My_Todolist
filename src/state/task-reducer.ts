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
import {Dispatch} from "redux";
import {AppRootStateType} from "./state";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/Error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export type TasksStateType = {
    [key: string]: Array<TaskDataType>
}
//types
export type ActionsTasksType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof createTaskAC>
    | ReturnType<typeof updateTaskAC>
    | CreateToDoListReducerActionType
    | RemoveToDoListActionType
    | SetTodoListActionType
    /*| ReturnType<typeof fetchTasksSuccess>*/

export type UpdateDomainTaskModelType = Partial<UpdateBodyType> //Это утилити тип, создает новый тип, где все параметры необязательные


const initialState: TasksStateType = {};
export const fetchTasksTC = createAsyncThunk("tasks/fetchTasks", (todoListID: string, thunkAPI) => {

    thunkAPI.dispatch(setAppStatusAC({status: "loading"}));
    thunkAPI.dispatch(setTodoListEntityStatusAC({
        todoListID: todoListID,
        entityStatus: "loading"
    }));

    return taskAPI.getTasks(todoListID)
        .then(res => {

            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}));
            thunkAPI.dispatch(setTodoListEntityStatusAC({
                todoListID: todoListID,
                entityStatus: "succeeded"
            }));

            return {tasks: res.data.items, todoListID}
        })
    /*.catch((error: Error) => {

        console.log("error when you try to do get toDoLists", error)
        handleServerNetworkError(error, thunkAPI.dispatch, todoListID)
    })*/


 })
/*export const createTaskTC = createAsyncThunk("tasks/createTask", (todoListID: string, inputData: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}));
    thunkAPI.dispatch(setTodoListEntityStatusAC({todoListID, entityStatus: "loading"}));
    taskAPI.createTask(todoListID, inputData)
        .then((res) => {
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(createTaskAC({task: res.data.data.item}));
                thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}));
                thunkAPI.dispatch(setTodoListEntityStatusAC({todoListID, entityStatus: "succeeded"}));
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch, todoListID);
            }
        })
        .catch((error: Error) => {
            console.log("error when you try to create task", error);
            handleServerNetworkError(error, thunkAPI.dispatch, todoListID)
        })
}*/



const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskID: string, todolistID: string }>) {
            const tasks = state[action.payload.todolistID]
            const index = tasks.findIndex(task =>
                task.id === action.payload.taskID)
            if (index > -1) {
                tasks.splice(index, 1);
            }
        },
        createTaskAC(state, action: PayloadAction<{ task: TaskDataType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task);
        },
        updateTaskAC(state, action: PayloadAction<{
            taskID: string,
            todoListID: string,
            model: UpdateDomainTaskModelType
        }>) {
            const tasks = state[action.payload.todoListID];
            const index = tasks.findIndex(task =>
                task.id === action.payload.taskID)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
    },
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
            }
        )
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todoListID] = action.payload.tasks
            }
        )
    }

})


export const {removeTaskAC, createTaskAC, updateTaskAC} = slice.actions;
export const taskReducer = slice.reducer;

//thunks

export const createTaskTC = (todoListID: string, inputData: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}));
    dispatch(setTodoListEntityStatusAC({todoListID, entityStatus: "loading"}));
    taskAPI.createTask(todoListID, inputData)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(createTaskAC({task: res.data.data.item}));
                dispatch(setAppStatusAC({status: "succeeded"}));
                dispatch(setTodoListEntityStatusAC({todoListID, entityStatus: "succeeded"}));
            } else {
                handleServerAppError(res.data, dispatch, todoListID);
            }
        })
        .catch((error: Error) => {
            console.log("error when you try to create task", error);
            handleServerNetworkError(error, dispatch, todoListID)
        })
}

export const deleteTaskTC = (todoListID: string, taskID: string) => (dispatch: Dispatch/*<ActionsTasksType | ActionsTodoListsType | AuthActionsType>*/) => {
    dispatch(setAppStatusAC({status: "loading"}));
    dispatch(setTodoListEntityStatusAC({todoListID, entityStatus: "loading"}));
    taskAPI.deleteTask(todoListID, taskID)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC({taskID, todolistID: todoListID}));
                dispatch(setAppStatusAC({status: "succeeded"}));
                dispatch(setTodoListEntityStatusAC({todoListID, entityStatus: "succeeded"}));
            } else {
                handleServerAppError(res.data, dispatch, todoListID)
            }
        })
        .catch((error: Error) => {
            console.log("error when you try do delete task", error)
            handleServerNetworkError(error, dispatch, todoListID)
        })
}
export const updateTaskTC = (todoListID: string, taskID: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch/*<ActionsTasksType | ActionsTodoListsType | AuthActionsType>*/, getState: () => AppRootStateType) => {
        const state = getState();
        let task = state.tasks[todoListID].find(task => task.id === taskID);
        dispatch(setTodoListEntityStatusAC({
            todoListID,
            entityStatus: "loading"
        }));
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
        dispatch(setAppStatusAC({status: "loading"}));
        taskAPI.updateTaskTitle(todoListID, taskID, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setTodoListEntityStatusAC({
                        todoListID,
                        entityStatus: "succeeded"
                    }));
                    dispatch(updateTaskAC({taskID, todoListID, model: apiModel}));
                    dispatch(setAppStatusAC({status: "succeeded"}));
                } else {
                    handleServerAppError(res.data, dispatch, todoListID)
                }
            })
            .catch((error: Error) => {
                console.log("error when you try do update task", error)
                handleServerNetworkError(error, dispatch, todoListID)
            });
    }
}