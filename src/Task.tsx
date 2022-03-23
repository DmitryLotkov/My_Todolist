import React, {ChangeEvent, useCallback} from "react";

import Checkbox from "@material-ui/core/Checkbox";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Reducers/state";
import {updateTaskTC, deleteTask} from "./Reducers/task-reducer";
import {TaskDataType, TaskStatuses} from "./api/taskAPI";

export type TaskPropsType = {
    toDoListID: string
    taskID: string
}

export const Task = React.memo(({toDoListID, taskID}: TaskPropsType) => {

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

    return (

        <div className={"todolist"}>
            <div className={"deleteLi"}>

                <Checkbox color={"primary"}
                          onChange={changeTaskStatus}
                          checked={task.status === TaskStatuses.Completed}
                          className={task.status === TaskStatuses.Completed ? "completedTask" : ""}/>
                <EditableSpan title={task.title} setNewTitle={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <Close fontSize={"small"} color={"primary"}/>

                </IconButton>
            </div>
        </div>)
})