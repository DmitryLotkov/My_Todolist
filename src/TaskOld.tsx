import React from "react";
import {taskType} from "./AppWithRedux";
import Checkbox from "@material-ui/core/Checkbox";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Close} from "@material-ui/icons";

export type TaskPropsType = {
    task: taskType
    todoLIstID: string
    removeTask: (taskID: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (title: string, taskID: string, todoListID: string) => void
}

export const TaskOld = React.memo(({task, todoLIstID, removeTask, changeStatus, changeTaskTitle}:TaskPropsType) =>{
    console.log("TaskOld")
    const onClickHandler = () => removeTask(task.id,todoLIstID)
    const onChangeHandler = () => changeStatus(task.id,task.isDone,todoLIstID)
    const changeTitleHandler = () => changeTaskTitle(task.title, task.id,todoLIstID)

    return(
        <div className={"todolist"} >
            <div className={"deleteLi"}>
                <Checkbox color={"primary"}
                          onChange={onChangeHandler}
                          checked={task.isDone}
                          className={task.isDone ? "completedTask" : ""}/>
                <EditableSpan title={task.title} setNewTitle={changeTitleHandler}/>
                <IconButton onClick={onClickHandler}>
                    <Close fontSize={"small"} color={"primary"} />
                </IconButton>


            </div>
        </div>)
})