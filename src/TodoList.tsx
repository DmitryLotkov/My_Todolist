import React, {ChangeEvent} from "react";
import {FilterValueType, StateType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type todoListPropsType = {
    title: string
    tasks: StateType
    removeTask: (taskID: string, todoListID: string) => void
    addItem: (inputData: string, todoListID: string) => void
    changeStatus: (isDone: boolean, taskID: string, todoListID: string) => void
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
            props.changeStatus(e.currentTarget.checked, task.id, props.todoListID)
        }

        return (
            <ul key={task.id}>
                <li>
                    <input type="checkbox"
                           onChange={changeStatus}
                           checked={task.isDone}
                           className={task.isDone ? "completedTask" : ""}/>
                    <EditableSpan title={task.title} setNewTitle={changeTaskTitle}/>
                    <button onClick={removeTask}>x</button>

                </li>
            </ul>)
    })
    return (
        <div>
            <div>
                <div>
                    <h3><EditableSpan title={props.title} setNewTitle={changeTodolistTitle}/>
                        <button onClick={deleteTodoList}>x</button>
                    </h3>
                </div>
                <AddItemForm addItem={addTask}/>
                {todolist}
                <div>
                    <button className={props.filter === "all" ? "activeFilter" : ""} onClick={changeFilterAll}>All
                    </button>
                    <button className={props.filter === "active" ? "activeFilter" : ""}
                            onClick={changeFilterActive}>Active
                    </button>
                    <button className={props.filter === "completed" ? "activeFilter" : ""}
                            onClick={changeFilterCompleted}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
}