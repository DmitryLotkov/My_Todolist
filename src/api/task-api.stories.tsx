import React, {useEffect, useState} from 'react'

import {taskAPI, UpdateBodyType} from "./taskAPI";


export default {
    title: 'API_Tasks'
}

const todoListID = "e10511d7-5398-4310-aae6-d85b528fd0ae";

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        taskAPI.getTasks(todoListID)
            .then((res) => {
                setState(res.data.items);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistID, setTodolistID] = useState<any>(null);
    const [taskTitle, setTaskTitle] = useState<any>(null);

    const createTask = () =>{
        taskAPI.createTask(todoListID, taskTitle)
            .then((res) => {

                setState(res.data.data.item)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input onChange={(e)=>{setTodolistID(e.currentTarget.value)}} placeholder={"Enter a todolistID"} value={todolistID} type="text"/>
            <input onChange={(e) =>{setTaskTitle(e.currentTarget.value)}} placeholder={"Enter taskTitle"} value={taskTitle} type="text"/>
            <button onClick={createTask}>CreateTask</button>
        </div>
    </div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistID, setTodolistID] = useState<any>(null);
    const [taskID, setTaskID] = useState<any>(null);

    const deleteTask = () =>{
        taskAPI.deleteTask(todoListID, taskID)
            .then(res => {
                    if (res.data.resultCode === 0) {
                        setState(res.data)
                    }
                }
            )
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input onChange={(e)=>{setTodolistID(e.currentTarget.value)}} placeholder={"Enter a todolistID"} value={todolistID} type="text"/>
            <input onChange={(e) =>{setTaskID(e.currentTarget.value)}} placeholder={"Enter taskID"} value={taskID} type="text"/>
            <button onClick={deleteTask}>DeleteTask</button>
        </div>
    </div>
}


export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todolistID, setTodolistID] = useState<any>(null);
    const [taskID, setTaskID] = useState<any>(null);
    const model: UpdateBodyType = {
        deadline: "",
        description: "",
        priority: 1,
        startDate: "",
        status: 2,
        title: "Ara",
    }

    const updateTask = () =>{
        taskAPI.updateTask(todoListID, taskID, model)
            .then(res => {
                if (res.data.resultCode === 0) {
                    setState(res.data)
                }
            });
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input onChange={(e)=>{setTodolistID(e.currentTarget.value)}} placeholder={"Enter a todolistID"} value={todolistID} type="text"/>
            <input onChange={(e) =>{setTaskID(e.currentTarget.value)}} placeholder={"Enter taskID"} value={taskID} type="text"/>
            <button onClick={updateTask}>UpdateTask</button>
        </div>
    </div>
}

// @ts-ignore