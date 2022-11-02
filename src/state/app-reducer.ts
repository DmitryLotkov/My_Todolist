import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
//status = loading - крутилку показываем
const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as NullableType<string>
}
export type NullableType<T> = null | T


const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>){
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: NullableType<string>}>){
            state.error = action.payload.error
        }
    }
})
export const appReducer = slice.reducer


export const {setAppErrorAC, setAppStatusAC} = slice.actions
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type AppActionsType = SetAppStatusType | SetAppErrorType