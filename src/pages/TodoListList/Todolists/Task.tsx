import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../state/state";
import {updateTaskTC, deleteTaskTC} from "../../../state/task-reducer";
import {TaskDataType, TaskStatuses} from "../../../api/taskAPI";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from "@mui/material/Checkbox";
import {RequestStatusType} from "../../../state/app-reducer";

export type TaskPropsType = {
    todoListID: string
    taskID: string
    entityStatus: RequestStatusType
}

export const Task = React.memo(({todoListID, taskID, entityStatus}: TaskPropsType) => {

    const dispatch = useDispatch();
    const task = useSelector<AppRootStateType, TaskDataType>(state => state.tasks[todoListID]
        .filter(task => task.id === taskID)[0]);

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newTaskStatus = e.currentTarget.checked;
        const status: number = newTaskStatus ? TaskStatuses.Completed : TaskStatuses.New;
        dispatch(updateTaskTC({taskID, todoListID, domainModel:{status}}))
    }, [dispatch, taskID, todoListID]);

    const changeTaskTitle = useCallback((newValue: string) => {
        dispatch(updateTaskTC({todoListID, taskID, domainModel:{title: newValue}}));
    }, [dispatch, taskID, todoListID]);

    const removeTask = useCallback(() => {
        dispatch(deleteTaskTC({todoListID, taskID}));
    }, [taskID, todoListID, dispatch]);

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