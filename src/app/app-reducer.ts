export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
//status = loading - крутилку показываем
const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as NullableType<string>
}
export type NullableType<T> = null | T
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}

        default:
            return state
    }
}
export const setAppStatusAC = (status: RequestStatusType) => ({ type: "APP/SET-STATUS", status}) as const;
export const setAppErrorAC = (error: NullableType<string>) => ({type: "APP/SET-ERROR", error}) as const;


export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
type ActionsType = SetAppStatusType | SetAppErrorType