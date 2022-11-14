import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from "redux";
import {taskReducer} from "./task-reducer";
import {todoListsReducer} from "../pages/TodoListList/Todolists/todolistsReducer";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./app-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {loginReducer} from "../auth/login-reducer";
import {configureStore} from '@reduxjs/toolkit'
import {useMemo} from "react";

export const rootReducer = combineReducers({
    tasks: taskReducer,
    toDoLists: todoListsReducer,
    app: appReducer,
    auth: loginReducer
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()


export function useActions<T extends ActionCreatorsMapObject>(actions:T) {
    const dispatch = useAppDispatch()
    return useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])
}