import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../state/state";
import {updateTaskTC, deleteTask} from "../../../state/task-reducer";
import {TaskDataType, TaskStatuses} from "../../../api/taskAPI";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from "@mui/material/Checkbox";
import {RequestStatusType} from "../../../app/app-reducer";

export type TaskPropsType = {
    toDoListID: string
    taskID: string
    entityStatus: RequestStatusType
}

export const Task = React.memo(({toDoListID, taskID, entityStatus}: TaskPropsType) => {

    const dispatch = useDispatch();
    const task = useSelector<AppRootStateType, TaskDataType>(state => state.tasks[toDoListID]
        .filter(task => task.id === taskID)[0]);

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newTaskStatus = e.currentTarget.checked;
        const status: number = newTaskStatus ? TaskStatuses.Completed : TaskStatuses.New;
        dispatch(updateTaskTC(toDoListID, taskID, {status}))
    }, [dispatch, taskID, toDoListID]);

    const changeTaskTitle = useCallback((newValue: string) => {
        dispatch(updateTaskTC(toDoListID, taskID, {title: newValue}));
    }, [dispatch, taskID, toDoListID]);

    const removeTask = useCallback(() => {
        dispatch(deleteTask(toDoListID, taskID));
    }, [taskID, toDoListID, dispatch]);
    console.log("entityStatus in tasks", entityStatus)
    return (

        <div className={"todolist"}>
            <div className={"deleteLi"}>

                <Checkbox color={entityStatus === "loading" ? "warning":"primary"}
                          onChange={changeTaskStatus}
                          disabled={entityStatus === "loading"}
                          checked={task.status === TaskStatuses.Completed}
                          className={task.status === TaskStatuses.Completed ? "completedTask" : ""}/>
                <EditableSpan title={task.title} setNewTitle={changeTaskTitle}/>
                <IconButton onClick={removeTask} disabled={entityStatus === "loading"}>
                    <CloseIcon fontSize={"small"} color={entityStatus === "loading" ? "disabled":"primary"}/>
                </IconButton>
            </div>
        </div>)
})