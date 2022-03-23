import React, {useCallback, useReducer} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./TodoList";
import {Menu} from "@material-ui/icons";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {AddItemForm} from "./AddItemForm";
import Paper from "@material-ui/core/Paper";
import {taskReducer} from "./Reducers/task-reducer";
import {
    createTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer,
} from "./Reducers/todolistsReducer";
import {TaskDataType, TaskPriorities, TaskStatuses} from "./api/taskAPI";


export type FilterValueType = "all" | "active" | "completed"
export type StateType = Array<TaskDataType>

export type TasksStateType = {
    [key: string]: Array<TaskDataType>
}


export function AppWithReducer() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, dispatchToDoList] = useReducer(todoListsReducer,[
        {id: todoListID1, title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: todoListID2, title: "What to buy", filter: "all", addedDate: "", order: 0},
    ])
    let [tasks, dispatchTasks] = useReducer(taskReducer,{
        [todoListID1]: [
            {id: v1(), title: "JS", status: TaskStatuses.New, todoListId:todoListID1, startDate: "", priority:TaskPriorities.Low, order:0, description:"", deadline:"", addedDate:""},
            {id: v1(), title: "React", status: TaskStatuses.New, todoListId:todoListID1, startDate: "", priority:TaskPriorities.Low, order:0, description:"", deadline:"", addedDate:""},
            {id: v1(), title: "Redux", status: TaskStatuses.Completed, todoListId:todoListID1, startDate: "", priority:TaskPriorities.Low, order:0, description:"", deadline:"", addedDate:""},
            {id: v1(), title: "TypeScript", status: TaskStatuses.Completed, todoListId:todoListID1, startDate: "", priority:TaskPriorities.High, order:0, description:"", deadline:"", addedDate:""},
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", status: TaskStatuses.New, todoListId:todoListID2, startDate: "", priority:TaskPriorities.High, order:0, description:"", deadline:"", addedDate:""},
            {id: v1(), title: "Bread", status: TaskStatuses.New, todoListId:todoListID2, startDate: "", priority:TaskPriorities.Low, order:0, description:"", deadline:"", addedDate:""},
            {id: v1(), title: "Cucumbers", status: TaskStatuses.Completed, todoListId:todoListID2, startDate: "", priority:TaskPriorities.Low, order:0, description:"", deadline:"", addedDate:""},
        ]
    });

    const addTodolist = (title: string) => {
        let action = createTodoListAC({
            title:title,
            addedDate:"",
            order:0,
            id:v1()});
        dispatchToDoList(action);
        dispatchTasks(action);
    }
    const changeFilter = (filter: FilterValueType,todoListID: string ) => {
        debugger
        let action = changeTodoListFilterAC(todoListID, filter);
        dispatchToDoList(action);
    }
    const removeTodoLists = (todoListID: string) => {
        let action = removeTodoListAC(todoListID);
        dispatchToDoList(action);
        dispatchTasks(action);
    }
    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        changeTodoListTitleAC(title, todoListID);
    },[]);

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
                <Grid container style={{padding: "2rem"}}>
                        <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={8}>
                    {
                        todoLists.map(t => {
                            let tasksForTodoLists = tasks[t.id]
                            if (t.filter === "completed") {
                                tasksForTodoLists = tasksForTodoLists.filter(t => t.status === TaskStatuses.Completed)
                            }
                            if (t.filter === "active") {
                                tasksForTodoLists = tasksForTodoLists.filter(t => t.status === TaskStatuses.New)
                            }

                            return (
                                <Grid item key={t.id}>
                                    <Paper elevation={2} style={{padding: "1rem"}}>
                                        <TodoList
                                            title={t.title}
                                            tasks={tasksForTodoLists}
                                            /*changeStatus={changeStatus}*/
                                            changeFilter={changeFilter}
                                            filter={t.filter}
                                            todoListID={t.id}
                                            removeTodoLists={removeTodoLists}
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




