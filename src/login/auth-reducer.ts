import {Dispatch} from 'redux'
import {handleServerAppError, handleServerNetworkError} from "../utils/Error-utils";
import {setAppStatusAC} from "../state/app-reducer";
import {authAPI} from "../api/authAPI";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

const initialState = {
    isLoggedIn: false,
    isInitialized: false
}

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action:PayloadAction<{value:boolean}>){
            state.isLoggedIn = action.payload.value
        },
        setInitializedAC(state, action:PayloadAction<{isInitialized:boolean}>){
            state.isInitialized = action.payload.isInitialized
        }
    }
})
export const authReducer = slice.reducer;
// actions

export const setIsLoggedInAC = slice.actions.setIsLoggedInAC;
export const setInitializedAC = slice.actions.setInitializedAC;


// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch/*<ActionsTasksType | ActionsTodoListsType | AuthActionsType>*/) => {
    dispatch(setAppStatusAC({status: 'loading'})) // Этот AC запускает глобальную крутилку, чтобы показать, что пошел запрос на сервер

    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true})); //Этот флаг показывает, что мы залогинились, чтобы был редирект на логин компоненту
                dispatch(setAppStatusAC({status: 'succeeded'})); // Этот AC выключает глобальную крутилку, чтобы показать, что пошел запрос на сервер выполнен
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })
}
export const logOutTC = () => (dispatch: Dispatch/*<ActionsTasksType | ActionsTodoListsType | AuthActionsType>*/) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
            } else {
               /* handleServerAppError(res.data, dispatch);*/
                dispatch(setAppStatusAC({status: "failed"}));
            }
        }).catch((error) => {
        handleServerNetworkError(error, dispatch);
    }).finally(()=>{
        dispatch(setInitializedAC({isInitialized:true})); // это надо, чтобы не было бесконечной крутилки. А вообще флаг лечит проблему
    })                                                      //передергивания инерфейса с логина на аккаунт
}

// types
/*type setIsInitializedType= ReturnType<typeof setInitializedAC>
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusType | SetAppErrorType | setIsInitializedType*/
