import React, {useEffect, useState} from 'react'
import {todoListAPI} from "./todoListsAPI";




export default {
    title: 'API'
}

export const GetTodoLists = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        todoListAPI.getTodoLists()
            .then(res => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        todoListAPI.createTodolist("new td")
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null);
    const todolistID = "869a7350-81f8-4e78-99f8-1e85dfda4649"
    useEffect(() => {
        todoListAPI.deleteTodolist(todolistID).then((res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '44b9dcc2-2bb6-49c3-a6a5-aad554ea377a';
        const title = "eee-BLA"
        todoListAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
