import React from 'react';
import './App.css';

import {TodoList} from "./TodoList";
import {Menu} from "@material-ui/icons";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {AddItemForm} from "./AddItemForm";
import Paper from "@material-ui/core/Paper";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./Reducers/task-reducer";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./Reducers/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Reducers/state";


export type FilterValueType = "all" | "active" | "completed"


export type TodoListType = {
    id: string, title: string, filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: Array<taskType>
}

export type taskType = {
    id: string, title: string, isDone: boolean
}

export function AppWithRedux() {

    let dispatch = useDispatch();
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.toDoLists);

    const changeStatus = (taskID: string, isDone: boolean, todoListID: string) => {
    let action = changeTaskStatusAC(taskID, isDone, todoListID);
        dispatch(action);
    };

    const addTask = (inputData: string, todoListID: string) => {
        let action = addTaskAC(inputData, todoListID);
        dispatch(action);
    };

    const changeTaskTitle = (title: string, taskID: string, todoListID: string,) => {
        let action = changeTaskTitleAC(title, taskID, todoListID)
        dispatch(action);
    }
    const removeTask = (taskID: string, todoListID: string) => {
        let action = removeTaskAC(taskID, todoListID);
        dispatch(action);
    };

    const addTodolist = (title: string) => {
        let action = addTodoListAC(title);
        dispatch(action);
    }

    const changeFilter = (filter: FilterValueType,todoListID: string ) => {
        let action = changeTodoListFilterAC(todoListID, filter);
        dispatch(action);
    }

    const removeTodoLists = (todoListID: string) => {
        let action = removeTodoListAC(todoListID);
        dispatch(action);
    }

    const changeTodoListTitle = (title: string, todoListID: string) => {
        let action = changeTodoListTitleAC(title, todoListID);
        dispatch(action);
    }

    return (
        <div className={"App"}>

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{paddingRight: "2rem",paddingTop: "2rem",paddingBottom:"2rem" }}>
                        <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={8}>
                    {
                        todoLists.map(t => {
                            let tasksForTodoLists = tasks[t.id]
                            if (t.filter === "completed") {
                                tasksForTodoLists = tasksForTodoLists.filter(t => t.isDone)
                            }
                            if (t.filter === "active") {
                                tasksForTodoLists = tasksForTodoLists.filter(t => !t.isDone)
                            }

                            return (
                                <Grid item key={t.id}>
                                    <Paper elevation={2} style={{padding: "1rem"}}>
                                        <TodoList
                                            title={t.title}
                                            tasks={tasksForTodoLists}
                                            removeTask={removeTask}
                                            addItem={addTask}
                                            changeStatus={changeStatus}
                                            changeFilter={changeFilter}
                                            filter={t.filter}
                                            todoListID={t.id}
                                            removeTodoLists={removeTodoLists}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                </Grid>

            </Container>
        </div>
    );

}



