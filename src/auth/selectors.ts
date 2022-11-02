import {AppRootStateType} from "../state/state";

export const isInitializedSelector = (state:AppRootStateType) => state.auth.isInitialized
export const isLoggedInSelector = (state:AppRootStateType) => state.auth.isLoggedIn