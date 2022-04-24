import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ActionsTodoListsType, setTodoListEntityStatusAC} from "../state/todolistsReducer";
import {Dispatch} from "redux";
import {ActionsTasksType} from "../state/task-reducer";
import {ResponseType} from '../api/taskAPI'
import {AuthActionsType} from "../login/auth-reducer";
export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<ActionsTasksType | ActionsTodoListsType | AuthActionsType>, todoListID?:string) =>{
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]));
    } else {
        dispatch(setAppErrorAC("Some error occupied"));
    }
    dispatch(setAppStatusAC("failed"));
    todoListID && dispatch(setTodoListEntityStatusAC(todoListID, "failed"));
}
export const handleServerNetworkError = (error:Error, dispatch:Dispatch<ActionsTasksType>, todoListID?:string) =>{
    dispatch(setAppErrorAC(error.message));
    dispatch(setAppStatusAC("failed"));
    if(todoListID)
    dispatch(setTodoListEntityStatusAC(todoListID, "failed"));

}
