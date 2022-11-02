import {AppRootStateType} from "../../../state/state";

export const isLoggedInSelector = (state:AppRootStateType) => state.auth.isLoggedIn

export const tasksSelector = (state:AppRootStateType) => state.tasks
export const todoListSelector = (state:AppRootStateType) => state.toDoLists
