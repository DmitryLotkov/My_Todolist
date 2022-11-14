import React, {useCallback, useEffect} from "react";
import {FilterValueType} from "../../../trash/AppOld";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {Task} from "./Task";
import {TaskDataType, TaskStatuses} from "../../../api/taskAPI";
import {createTaskTC, fetchTasksTC} from "../../../state/task-reducer";
import {useDispatch} from "react-redux";
import Stack from "@mui/material/Stack/Stack";
import {RequestStatusType} from "../../../state/app-reducer";
import {Delete} from "@mui/icons-material/";

export type todoListPropsType = {
    title: string
    tasks: Array<TaskDataType>
    changeFilter: (filter: FilterValueType, todoListID: string) => void
    filter: FilterValueType
    todoListID: string
    removeTodoLists: (todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
    entityStatus: RequestStatusType
}


export const TodoList = React.memo(({
                                        todoListID,
                                        changeFilter,
                                        removeTodoLists,
                                        changeTodoListTitle,
                                        tasks,
                                        filter,
                                        entityStatus,
                                        title} :todoListPropsType) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchTasksTC(todoListID))

    }, [dispatch, todoListID]);

    const addTask = useCallback((inputData: string) => {
        dispatch(createTaskTC(todoListID, inputData ))
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
    },[todoListID, changeTodoListTitle]);

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
                     todoListID={todoListID}
                     entityStatus={entityStatus}
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

                        <IconButton onClick={deleteTodoList} disabled={entityStatus === "loading"}>
                            <Delete color={ entityStatus === "loading" ? "disabled": "primary"}/>
                        </IconButton>
                    </h3>
                </div>
                <AddItemForm addItem={addTask} disabled={entityStatus === "loading"}/>
                {todolist}
                <Stack className={"buttons"} direction="row" spacing={2}>
                    <Button  size={"small"} variant={"contained"} className={"button"}
                            color={filter === "all" ? "secondary" : "primary"} onClick={changeFilterAll}>All
                    </Button>
                    <Button size={"small"} variant={"contained"} className={"button"}
                            color={filter === "active" ? "secondary" : "primary"}
                            onClick={changeFilterActive}>Active
                    </Button>
                    <Button  size={"small"} variant={"contained"} className={"button"}
                            color={filter === "completed" ? "secondary" : "primary"}
                            onClick={changeFilterCompleted}>Completed
                    </Button>
                </Stack>
            </div>
        </div>
    );
})