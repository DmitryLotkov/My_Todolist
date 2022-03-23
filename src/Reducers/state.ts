import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "./task-reducer";
import {todoListsReducer} from "./todolistsReducer";
import thunkMiddleware from "redux-thunk";

export const rootReducer = combineReducers({
    tasks: taskReducer,
    toDoLists: todoListsReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;