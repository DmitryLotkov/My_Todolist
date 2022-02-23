import React, {useReducer} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./TodoList";
import {Menu} from "@material-ui/icons";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {AddItemForm} from "./AddItemForm";
import Paper from "@material-ui/core/Paper";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./Reducers/task-reducer";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./Reducers/todolistsReducer";


export type FilterValueType = "all" | "active" | "completed"
export type StateType = Array<taskType>

export type TodoListType = {
    id: string, title: string, filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: Array<taskType>
}

export type taskType = {
    id: string, title: string, isDone: boolean
}

export function AppWithReducer() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, dispatchToDoList] = useReducer(todoListsReducer,[
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ])
    let [tasks, dispatchTasks] = useReducer(taskReducer,{
        [todoListID1]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "TypeScript", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Cucumbers", isDone: false},
        ]
    });


    const changeStatus = (taskID: string, isDone: boolean, todoListID: string) => {
    let action = changeTaskStatusAC(taskID, isDone, todoListID);
        dispatchTasks(action);
    }
    const addTask = (inputData: string, todoListID: string) => {
        let action = addTaskAC(inputData, todoListID);
        dispatchTasks(action);
    };
    const changeTaskTitle = (title: string, taskID: string, todoListID: string,) => {
        let action = changeTaskTitleAC(title, taskID, todoListID)
        dispatchTasks(action);
    }
    const removeTask = (taskID: string, todoListID: string) => {
        let action = removeTaskAC(taskID, todoListID);
        dispatchTasks(action);
    };

    const addTodolist = (title: string) => {
        let action = addTodoListAC(title);
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
    const changeTodoListTitle = (title: string, todoListID: string) => {
        let action = changeTodoListTitleAC(title, todoListID);
        dispatchToDoList(action);
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
                <Grid container style={{padding: "2rem"}}>
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



