import React, {ChangeEvent} from "react";
import {FilterValueType, StateType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Close, Delete} from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox";

export type todoListPropsType = {
    title: string
    tasks: StateType
    removeTask: (taskID: string, todoListID: string) => void
    addItem: (inputData: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeFilter: (filter: FilterValueType, todoListID: string) => void
    filter: FilterValueType
    todoListID: string
    removeTodoLists: (todoListID: string) => void
    changeTaskTitle: (title: string, taskID: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}


export function TodoList(props: todoListPropsType) {

    const addTask = (title: string) => {
        debugger
        props.addItem(title, props.todoListID)
    }
    const changeFilterAll = () => {
        props.changeFilter("all", props.todoListID);
    }
    const changeFilterCompleted = () => {
        props.changeFilter("completed", props.todoListID);
    }
    const changeFilterActive = () => {

        props.changeFilter("active", props.todoListID);
    }
    const deleteTodoList = () => props.removeTodoLists(props.todoListID)

    const changeTodolistTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }
    const todolist = props.tasks.map(task => {

        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(title, task.id, props.todoListID );
        }
        let removeTask = () => {
            props.removeTask(task.id, props.todoListID);
        }
        let changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked, props.todoListID)
        }

        return (
            <div className={"todolist"} key={task.id}>
                <div className={"deleteLi"}>
                    <Checkbox color={"primary"}
                           onChange={changeStatus}
                           checked={task.isDone}
                           className={task.isDone ? "completedTask" : ""}/>
                    <EditableSpan title={task.title} setNewTitle={changeTaskTitle}/>
                    <IconButton onClick={removeTask}>
                        <Close fontSize={"small"} color={"primary"} />
                    </IconButton>


                </div>
            </div>)
    })
    return (
        <div>
            <div>
                <div>
                    <h3 className={"title"}>

                        <div className={"whatToLearn"}>
                            <EditableSpan title={props.title} setNewTitle={changeTodolistTitle}/>
                        </div>
                        <IconButton onClick={deleteTodoList}>
                        <Delete  color={"primary"} />
                    </IconButton>
                    </h3>
                </div>
                <AddItemForm addItem={addTask}/>
                {todolist}
                <div className={"buttons"}>
                    <Button size={"small"} variant={"contained"} className= {"button"} color={props.filter === "all" ? "secondary" : "primary"} onClick={changeFilterAll}>All
                    </Button>
                    <Button size={"small"} variant={"contained"} className= {"button"} color={props.filter === "active" ? "secondary" : "primary"}
                            onClick={changeFilterActive}>Active
                    </Button>
                    <Button size={"small"} variant={"contained"}  className= {"button"} color={props.filter === "completed" ? "secondary" : "primary"}
                            onClick={changeFilterCompleted}>Completed
                    </Button>
                </div>
            </div>
        </div>
    );
}