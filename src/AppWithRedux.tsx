import React, {useCallback} from 'react';
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
    console.log("AppWithRedux")
    let dispatch = useDispatch();
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.toDoLists);

    const changeStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID));
    },[dispatch]);

    const addTask = useCallback((inputData: string, todoListID: string) => {

        let action = addTaskAC(inputData, todoListID);
        dispatch(action);
    },[dispatch]);

    const changeTaskTitle = useCallback((title: string, taskID: string, todoListID: string,) => {
        let action = changeTaskTitleAC(title, taskID, todoListID)
        dispatch(action);
    },[dispatch])
    const removeTask = useCallback((taskID: string, todoListID: string) => {
        let action = removeTaskAC(taskID, todoListID);
        dispatch(action);
    },[dispatch]);

    const addTodolist = useCallback((title: string) => {
        let action = addTodoListAC(title);
        dispatch(action);
    },[dispatch]);

    const changeFilter = useCallback((filter: FilterValueType,todoListID: string ) => {
        let action = changeTodoListFilterAC(todoListID, filter);
        dispatch(action);
    },[dispatch]);

    const removeTodoLists = useCallback((todoListID: string) => {
        let action = removeTodoListAC(todoListID);
        dispatch(action);
    },[dispatch]);

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        let action = changeTodoListTitleAC(title, todoListID);
        dispatch(action);
    },[dispatch]);

const TodoListsJSX = todoLists.map(t => {

    return (
        <Grid item key={t.id}>
            <Paper elevation={2} style={{padding: "1rem"}}>
                <TodoList
                    title={t.title}
                    tasks={tasks[t.id]}
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
})
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
                        TodoListsJSX
                    }
                </Grid>

            </Container>
        </div>
    );

}



