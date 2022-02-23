import {combineReducers, createStore} from "redux";
import {taskReducer} from "./task-reducer";
import {todoListsReducer} from "./todolistsReducer";

export const rootReducer = combineReducers({
    tasks: taskReducer,
    toDoLists: todoListsReducer,
})
export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;