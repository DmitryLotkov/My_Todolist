import React, {ChangeEvent, useCallback} from "react";

import Checkbox from "@material-ui/core/Checkbox";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Reducers/state";
import {taskType} from "./AppWithRedux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./Reducers/task-reducer";

export type TaskPropsType = {
    toDoListID: string
    taskID: string
}

export const Task = React.memo(({toDoListID, taskID}:TaskPropsType) => {

    const dispatch = useDispatch();

    const task = useSelector<AppRootStateType, taskType>(state => state.tasks[toDoListID]
        .filter(task => task.id === taskID)[0]);

    const onChangeHandler = useCallback((e:ChangeEvent<HTMLInputElement>) => {
        const newTaskStatus = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(taskID, newTaskStatus, toDoListID))
    },[dispatch, taskID, toDoListID])
    const changeTitleHandler = useCallback((newValue: string) =>{
        dispatch(changeTaskTitleAC(taskID, newValue, toDoListID ))
    },[dispatch, taskID, toDoListID]);

    const onClickHandler = useCallback(() =>{
        dispatch(removeTaskAC(taskID, toDoListID))
    },[taskID, toDoListID, dispatch])
    return (

        <div className={"todolist"}>
            <div className={"deleteLi"}>
                <Checkbox color={"primary"}
                          onChange={onChangeHandler}
                          checked={task.isDone}
                          className={task.isDone ? "completedTask" : ""}/>
                <EditableSpan title={task.title} setNewTitle={changeTitleHandler}/>
                <IconButton onClick={onClickHandler}>
                    <Close fontSize={"small"} color={"primary"}/>
                </IconButton>
            </div>
        </div>)
})