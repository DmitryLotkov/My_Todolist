import {TaskDataType} from "../../api/taskAPI";
import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/state";
import {
    changeTodoListFilterAC, changeTodoListTitleTC,
    createTodolist, deleteTodoList,
    getTodolists,
    TodoListDomainType
} from "../../state/todolistsReducer";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {TodoList} from "./Todolists/TodoList";
import Container from "@material-ui/core/Container";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";

export type FilterValueType = "all" | "active" | "completed"

export type TasksStateType = {
    [key: string]: Array<TaskDataType>
}


export const TodoListList:React.FC = () =>{
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

    const TodoListJSX = todoLists.map(t => {

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