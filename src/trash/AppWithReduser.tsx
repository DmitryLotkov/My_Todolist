import React, {useCallback, useReducer} from 'react';
import '../app/App.scss';
import {v1} from "uuid";
import {TodoList} from "../pages/TodoListList/Todolists/TodoList";
import AppBar from '@mui/material/AppBar/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton/IconButton';


import {taskReducer} from "../state/task-reducer";
import {changeTodoListFilterAC, todoListsReducer,} from "../pages/TodoListList/Todolists/todolistsReducer";
import {TaskPriorities, TaskStatuses} from "../api/taskAPI";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {
    changeTodoListTitleTC,
    createTodolistTC,
    deleteTodoListTC
} from "../pages/TodoListList/Todolists/todolistsActions";


export type FilterValueType = "all" | "active" | "completed"


export function AppWithReducer() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, dispatchToDoList] = useReducer(todoListsReducer, [
        {id: todoListID1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
        {id: todoListID2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
    ])
    let [tasks, dispatchTasks] = useReducer(taskReducer, {
        [todoListID1]: [
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.New,
                todoListId: todoListID1,
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: "",
                deadline: "",
                addedDate: ""
            },
            {
                id: v1(),
                title: "React",
                status: TaskStatuses.New,
                todoListId: todoListID1,
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: "",
                deadline: "",
                addedDate: ""
            },
            {
                id: v1(),
                title: "Redux",
                status: TaskStatuses.Completed,
                todoListId: todoListID1,
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: "",
                deadline: "",
                addedDate: ""
            },
            {
                id: v1(),
                title: "TypeScript",
                status: TaskStatuses.Completed,
                todoListId: todoListID1,
                startDate: "",
                priority: TaskPriorities.High,
                order: 0,
                description: "",
                deadline: "",
                addedDate: ""
            },
        ],
        [todoListID2]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.New,
                todoListId: todoListID2,
                startDate: "",
                priority: TaskPriorities.High,
                order: 0,
                description: "",
                deadline: "",
                addedDate: ""
            },
            {
                id: v1(),
                title: "Bread",
                status: TaskStatuses.New,
                todoListId: todoListID2,
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: "",
                deadline: "",
                addedDate: ""
            },
            {
                id: v1(),
                title: "Cucumbers",
                status: TaskStatuses.Completed,
                todoListId: todoListID2,
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: "",
                deadline: "",
                addedDate: ""
            },
        ]
    });

    const addTodolist = (title: string) => {
        let action = createTodolistTC.fulfilled(
            {
                todoList: {
                    title,
                    addedDate: "",
                    order: 0,
                    id: v1()
                }
            }, "requestId", title);
        dispatchToDoList(action);
        dispatchTasks(action);
    }
    const changeFilter = (filter: FilterValueType, todoListID: string) => {

        let action = changeTodoListFilterAC({todoListID, filter});
        dispatchToDoList(action);
    }
    const removeTodoLists = (todoListID: string) => {
        let action = deleteTodoListTC.fulfilled({todoListID}, "requestId", todoListID);
        dispatchToDoList(action);
        dispatchTasks(action);
    }
    const changeTodoListTitle = useCallback((todoListTitle: string, todoListID: string) => {
        const params = {todoListID, todoListTitle}
        changeTodoListTitleTC.fulfilled(params, "requestId", params);
    }, []);

    return (
        <div className={"App"}>

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
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
                                            entityStatus={t.entityStatus}
                                            title={t.title}
                                            tasks={tasksForTodoLists}
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




