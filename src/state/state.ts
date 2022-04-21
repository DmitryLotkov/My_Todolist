import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "./task-reducer";
import {todoListsReducer} from "./todolistsReducer";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "../app/app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

export const rootReducer = combineReducers({
    tasks: taskReducer,
    toDoLists: todoListsReducer,
    app: appReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
// @ts-ignore
window.store = store;