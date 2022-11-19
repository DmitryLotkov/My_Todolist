import {handleServerAppError, handleServerNetworkError} from "../utils/Error-utils";
import {setAppStatusAC} from "../state/app-reducer";
import {authAPI, FiledErrorType} from "../api/authAPI";
import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

// thunks
export const loginTC = createAsyncThunk<undefined, LoginParamsType, {
    rejectValue: { errors: Array<string>, fieldErrors?: Array<FiledErrorType> }
}>("auth/login", async (data, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'})); // Этот AC выключает глобальную крутилку, чтобы показать, что пошел запрос на сервер выполнен
            return
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldErrors: res.data.fieldErrors})
        }
    } catch (err: any) {
        const error: AxiosError = err
        handleServerNetworkError(error, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue({errors: ["error"], fieldErrors: undefined})
    }
})
export const logOutTC = createAsyncThunk("auth/logout", async (arg, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        let res = await authAPI.logOut()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedInAC({value: false}))
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
    }
})
export const initializeAppTC = createAsyncThunk("auth/initialize", async (arg, thunkAPI) => {
    try {
        let res = await authAPI.me()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedInAC({value: true}));
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}));
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            thunkAPI.dispatch(setAppStatusAC({status: "failed"}));
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch);
    }
})

const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        isInitialized: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        },
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logOutTC.fulfilled, (state) => {
            state.isLoggedIn = false
        })
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isLoggedIn = true
            state.isInitialized = true
        })
    }
})
export const loginReducer = slice.reducer;
// actions

export const setIsLoggedInAC = slice.actions.setIsLoggedInAC;






