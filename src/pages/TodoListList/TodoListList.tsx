import {TaskDataType} from "../../api/taskAPI";
import React, {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../state/state";
import {
    changeTodoListFilterAC, changeTodoListTitleTC,
    createTodolist, deleteTodoList,
    getTodolists,
    TodoListDomainType
} from "../../state/todolistsReducer";

import {TodoList} from "./Todolists/TodoList";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import {Navigate} from "react-router-dom";



export type FilterValueType = "all" | "active" | "completed"

export type TasksStateType = {
    [key: string]: Array<TaskDataType>
}


export const TodoListList:React.FC = () =>{
    const dispatch = useDispatch();
    const tasks = useAppSelector<TasksStateType>(state => state.tasks);
    const todoLists = useAppSelector<Array<TodoListDomainType>>(state => state.toDoLists);
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);

    useEffect(()=>{
        dispatch(getTodolists())
    },[dispatch]);

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolist(title))
    },[dispatch]);

    const changeFilter = useCallback((filter: FilterValueType,todoListID: string ) => {
        dispatch(changeTodoListFilterAC({todoListID, filter}));
    },[dispatch]);

    const removeTodoLists = useCallback((todoListID: string) => {
        dispatch(deleteTodoList(todoListID))
    },[dispatch]);

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {

        if(title.length >100){
           return
        }
        dispatch(changeTodoListTitleTC(title, todoListID));
    },[dispatch]);
    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }
    const TodoListJSX = todoLists.map(t => {

        return (
            <Grid item key={t.id}>
                <Paper elevation={1} style={{padding: "1rem"}}>
                    <TodoList
                        entityStatus={t.entityStatus}
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
        <>
            <Container fixed>
                <Grid container style={{paddingRight: "2rem",paddingTop: "2rem",paddingBottom:"2rem" }}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={8}>
                    {
                        TodoListJSX
                    }
                </Grid>
            </Container>
        </>
    )
}