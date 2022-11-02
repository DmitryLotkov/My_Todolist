import {AppRootStateType} from "../state/state";

export const statusSelector = (state:AppRootStateType) => state.app.status
export const errorSelector = (state:AppRootStateType) => state.app.error
