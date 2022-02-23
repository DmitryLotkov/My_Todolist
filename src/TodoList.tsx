import React, {useCallback} from "react";
import {FilterValueType, StateType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


import {Task} from "./Task";

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


export const TodoList = React.memo(({
                                        todoListID,
                                        addItem,
                                        changeFilter,
                                        removeTodoLists,
                                        changeTodoListTitle,
                                        tasks,
                                        filter,
                                        title} :todoListPropsType) => {

    const addTask = useCallback((title: string) => {
        addItem(title, todoListID)
    }, [addItem, todoListID]);

    const changeFilterAll = useCallback(() => {
        changeFilter("all", todoListID);
    },[todoListID, changeFilter]);

    const changeFilterCompleted = useCallback(() => {
        changeFilter("completed", todoListID);
    },[changeFilter, todoListID]);

    const changeFilterActive = useCallback(() => {
        changeFilter("active", todoListID);
    },[changeFilter, todoListID]);

    const deleteTodoList = useCallback(() =>
        removeTodoLists(todoListID),[todoListID, removeTodoLists])

    const changeTodolistTitle = useCallback((title: string) => {
        changeTodoListTitle(title, todoListID)
    },[changeTodoListTitle, todoListID]);


    let tasksForTodoLists = tasks;

    if (filter === "completed") {
        tasksForTodoLists = tasksForTodoLists.filter(t => t.isDone)
    }
    if (filter === "active") {
        tasksForTodoLists = tasksForTodoLists.filter(t => !t.isDone)
    }

    const todolist = tasksForTodoLists.map(task => {


        return <Task key={task.id}
                     taskID={task.id}
                     toDoListID={todoListID}
                    />
    })
    return (
        <div>
            <div>
                <div>
                    <h3 className={"title"}>

                        <div className={"whatToLearn"}>
                            <EditableSpan title={title} setNewTitle={changeTodolistTitle}/>
                        </div>
                        <IconButton onClick={deleteTodoList}>
                            <Delete color={"primary"}/>
                        </IconButton>
                    </h3>
                </div>
                <AddItemForm addItem={addTask}/>
                {todolist}
                <div className={"buttons"}>
                    <Button size={"small"} variant={"contained"} className={"button"}
                            color={filter === "all" ? "secondary" : "primary"} onClick={changeFilterAll}>All
                    </Button>
                    <Button size={"small"} variant={"contained"} className={"button"}
                            color={filter === "active" ? "secondary" : "primary"}
                            onClick={changeFilterActive}>Active
                    </Button>
                    <Button size={"small"} variant={"contained"} className={"button"}
                            color={filter === "completed" ? "secondary" : "primary"}
                            onClick={changeFilterCompleted}>Completed
                    </Button>
                </div>
            </div>
        </div>
    );
})