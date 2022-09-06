import {combineReducers} from "redux";
import {taskReducer} from "./task-reducer";
import {todoListsReducer} from "./todolistsReducer";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./app-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "../login/auth-reducer";
import { configureStore } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
    tasks: taskReducer,
    toDoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
