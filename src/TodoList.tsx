import React, {ChangeEvent, useState} from "react";
import {FilterValueType, StateType} from "./App";

export type todoListPropsType = {
    title: string
    tasks: StateType
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (inputData: string, todoListID: string) => void
    changeStatus: (isDone: boolean, taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValueType, todoListID: string) => void
    filter: FilterValueType
    todoListID: string
    removeTodoLists: (todoListID: string) => void
}


export function TodoList(props: todoListPropsType) {
    let [error, setError] = useState()
    let [inputData, setInputData] = useState("");

    const addTask = () => {

        if (inputData.trim() !== "") {
            props.addTask(inputData, props.todoListID);
        } else {
            setError("Title is required!")
        }
        setInputData("");
    }
    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value) {
            setError(null)
        }
        setInputData(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
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
    const todolist = props.tasks.map(t => {


        let removeTask = () => {
            props.removeTask(t.id, props.todoListID);
        }
        let changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            debugger
            console.log(e.currentTarget.checked)
            props.changeStatus(e.currentTarget.checked, t.id, props.todoListID)

        }

        return (
            <ul key={t.id}>
                <li>
                    <input type="checkbox"
                           onChange={changeStatus}
                           checked={t.isDone}
                           className={t.isDone ? "completedTask" : ""}/>
                    <span>{t.title}</span>
                    <button onClick={removeTask}>x</button>

                </li>
            </ul>)
    })
    return (
        <div>
            <div>
                <div>
                    <h3>{props.title}
                        <button onClick={deleteTodoList}>x</button>
                    </h3>
                </div>

                <div>
                    <input autoFocus={true}
                           className={error && "red"}
                           onKeyPress={onKeyPressHandler}
                           value={inputData}
                           onChange={onchangeHandler}
                    />
                    <button onClick={addTask}>+</button>
                    {error && <div className={"error"}>{error}</div>}
                </div>
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