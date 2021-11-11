import React, {ChangeEvent, useState} from "react";
import {FilterValueType, StateType} from "./App";

export type todoListPropsType = {
    title: string
    tasks: StateType
    removeTask: (taskID: string) => void
    addTask: (inputData: string) => void
    changeStatus: (isDone: boolean, taskID: string) => void
    changeFilter: (filter:FilterValueType) => void
    filter: FilterValueType
}


export function TodoList(props: todoListPropsType) {
    let [error, setError] = useState()
    let [inputData, setInputData] = useState("");

    const addTask = () => {
        if(inputData.trim() != ""){
            props.addTask(inputData);
        }else{
            setError("Title is required!")
        }
        setInputData("");
    }
    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.value){
            setError(null)
        }
        setInputData(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLElement>) =>{
        if(e.charCode === 13) {
            addTask();
        }
    }
    const changeFilterAll = () => {
        props.changeFilter("all");
    }
    const changeFilterCompleted = () =>{
        props.changeFilter("completed");
    }
    const changeFilterActive = () =>{
        props.changeFilter("active");
    }
    const todolist = props.tasks.map(t => {

        let removeTask = () => {
            props.removeTask(t.id);
        }
        let changeStatus = (e:ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(e.currentTarget.checked, t.id)
        }

        return (
            <ul key={t.id}>
                <li>
                    <input type="checkbox"
                           onChange={changeStatus}
                           checked={t.isDone}
                           className={ t.isDone ? "completedTask":""}/>
                    <span>{t.title}</span>
                    <button onClick={removeTask}>x</button>

                </li>
            </ul>)
    })
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input autoFocus={true}
                           className={error && "red"}
                           onKeyPress={onKeyPressHandler}
                           value={inputData}
                           onChange={onchangeHandler}
                    />
                    <button onClick={addTask}>+</button>
                    {error&& <div className={"error"}>{error}</div>}
                </div>
                {todolist}
                <div>
                    <button className={props.filter === "all" ? "activeFilter": ""} onClick={changeFilterAll}>All</button>
                    <button className={props.filter === "active" ? "activeFilter": ""} onClick={changeFilterActive}>Active</button>
                    <button className={props.filter === "completed" ? "activeFilter": ""} onClick={changeFilterCompleted}>Completed</button>
                </div>
            </div>
        </div>
    );
}