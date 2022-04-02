import React, {useCallback, useEffect} from "react";
import {FilterValueType} from "../../../trash/AppOld";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {TaskDataType, TaskStatuses} from "../../../api/taskAPI";
import {createTask, getTasks} from "../../../state/task-reducer";
import {useDispatch} from "react-redux";


export type todoListPropsType = {
    title: string
    tasks: Array<TaskDataType>
    changeFilter: (filter: FilterValueType, todoListID: string) => void
    filter: FilterValueType
    todoListID: string
    removeTodoLists: (todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}


export const TodoList = React.memo(({
                                        todoListID,
                                        changeFilter,
                                        removeTodoLists,
                                        changeTodoListTitle,
                                        tasks,
                                        filter,
                                        title} :todoListPropsType) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getTasks(todoListID))

    }, [dispatch, todoListID]);

    const addTask = useCallback((inputData: string) => {
        dispatch(createTask(todoListID, inputData ))
    },[dispatch, todoListID]);

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
        removeTodoLists(todoListID),[todoListID, removeTodoLists]);

    const changeTodolistTitle = useCallback((newValue:string) => {
        changeTodoListTitle(newValue, todoListID);
    },[dispatch, todoListID]);


    let tasksForTodoLists = tasks;

    if (filter === "completed") {
        tasksForTodoLists = tasksForTodoLists.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === "active") {
        tasksForTodoLists = tasksForTodoLists.filter(t => t.status === TaskStatuses.Completed)
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