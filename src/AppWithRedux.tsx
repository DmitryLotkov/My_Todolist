import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {Menu} from "@material-ui/icons";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {AddItemForm} from "./AddItemForm";
import Paper from "@material-ui/core/Paper";

import {
    changeTodoListFilterAC,
     deleteTodoList, getTodolists,
    TodoListDomainType, createTodolist, changeTodoListTitleTC,
} from "./Reducers/todolistsReducer";

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Reducers/state";
import {TaskDataType} from "./api/taskAPI";



export type FilterValueType = "all" | "active" | "completed"

export type TasksStateType = {
    [key: string]: Array<TaskDataType>
}

export const AppWithRedux = React.memo(() => {

    const dispatch = useDispatch();
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.toDoLists);


    useEffect(()=>{
        dispatch(getTodolists())
    },[dispatch]);

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolist(title))
    },[dispatch]);

    const changeFilter = useCallback((filter: FilterValueType,todoListID: string ) => {
        dispatch(changeTodoListFilterAC(todoListID, filter));
    },[dispatch]);

    const removeTodoLists = useCallback((todoListID: string) => {
        dispatch(deleteTodoList(todoListID))
    },[dispatch]);

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodoListTitleTC(title, todoListID));
    },[dispatch]);

const TodoListsJSX = todoLists.map(t => {

    return (
        <Grid item key={t.id}>
            <Paper elevation={1} style={{padding: "1rem"}}>
                <TodoList
                    title={t.title}
                    tasks={tasks[t.id]}
                    changeFilter={changeFilter}
                    filter={t.filter}
                    todoListID={t.id}
                    removeTodoLists={removeTodoLists}
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

})



