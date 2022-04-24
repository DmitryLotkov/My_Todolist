import {Dispatch} from 'redux'
import {handleServerAppError, handleServerNetworkError} from "../utils/Error-utils";
import {SetAppErrorType, setAppStatusAC, SetAppStatusType} from "../app/app-reducer";
import {authAPI} from "../api/authAPI";
import {ActionsTasksType} from "../state/task-reducer";
import {ActionsTodoListsType} from "../state/todolistsReducer";


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
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case "auth/SET-IS-INITIALIZED-IN":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'auth/SET-IS-LOGGED-IN', value} as const)

export const setInitializedAC = (isInitialized: boolean) =>
    ({type: 'auth/SET-IS-INITIALIZED-IN', isInitialized} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsTasksType | ActionsTodoListsType | AuthActionsType>) => {
    dispatch(setAppStatusAC('loading')) // Этот AC запускает глобальную крутилку, чтобы показать, что пошел запрос на сервер

    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true)); //Этот флаг показывает, что мы залогинились, чтобы был редирект на логин компоненту
                dispatch(setAppStatusAC('succeeded')); // Этот AC выключает глобальную крутилку, чтобы показать, что пошел запрос на сервер выполнен
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })
}
export const logOutTC = () => (dispatch: Dispatch<ActionsTasksType | ActionsTodoListsType | AuthActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
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
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC('succeeded'));
            } else {
               /* handleServerAppError(res.data, dispatch);*/
                dispatch(setAppStatusAC("failed"));
            }
        }).catch((error) => {
        handleServerNetworkError(error, dispatch);
    }).finally(()=>{
        dispatch(setInitializedAC(true)); // это надо, чтобы не было бесконечной крутилки. А вообще флаг лечит проблему
    })                                                      //передергивания инерфейса с логина на аккаунт
}

// types
type setIsInitializedType= ReturnType<typeof setInitializedAC>
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusType | SetAppErrorType | setIsInitializedType
