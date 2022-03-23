import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./TodoList";
import {Menu} from "@material-ui/icons";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {AddItemForm} from "./AddItemForm";
import Paper from "@material-ui/core/Paper";
import {TaskDataType, TaskPriorities, TaskStatuses} from "./api/taskAPI";


export type FilterValueType = "all" | "active" | "completed"


export type TodoListType = {
    id: string, title: string, filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: Array<TaskDataType>
}

export type taskType = {
    id: string, title: string, isDone: boolean
}

function App() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ])
    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListID1]: [
            {id: v1(), title: "JS", status: TaskStatuses.New, addedDate: "", deadline:"", description:"",order:0, priority:TaskPriorities.Middle,startDate:"", todoListId:"" },
            {id: v1(), title: "React", status: TaskStatuses.New, addedDate: "", deadline:"", description:"",order:0, priority:TaskPriorities.Middle,startDate:"", todoListId:""},
            {id: v1(), title: "Redux", status: TaskStatuses.New, addedDate: "", deadline:"", description:"",order:0, priority:TaskPriorities.Middle,startDate:"", todoListId:""},
            {id: v1(), title: "TypeScript", status: TaskStatuses.New, addedDate: "", deadline:"", description:"",order:0, priority:TaskPriorities.Middle,startDate:"", todoListId:""},
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", status: TaskStatuses.New, addedDate: "", deadline:"", description:"",order:0, priority:TaskPriorities.Low,startDate:"", todoListId:""},
            {id: v1(), title: "Bread", status: TaskStatuses.New, addedDate: "", deadline:"", description:"",order:0, priority:TaskPriorities.Low,startDate:"", todoListId:""},
            {id: v1(), title: "Cucumbers", status: TaskStatuses.New, addedDate: "", deadline:"", description:"",order:0, priority:TaskPriorities.Low,startDate:"", todoListId:""},
        ]
    });


    const addTodolist = (title: string) => {
        const todoListID = v1();
        let newTodoList: TodoListType =
            {id: todoListID, title: title, filter: "all"};
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({...tasks, [todoListID]: []})
    }
    const changeFilter = (filter: FilterValueType, todoListID: string) => {
        let copyTodoLists = [...todoLists];
        let filteredTodoLists = copyTodoLists.map(t => t.id === todoListID ? {...t, filter: filter} : t);
        setTodoLists(filteredTodoLists);
    }
    const removeTodoLists = (todoListID: string) => {
        let copyTodoLists = [...todoLists];
        let filteredTodoLists = copyTodoLists.filter(t => t.id !== todoListID);
        setTodoLists(filteredTodoLists);
        delete tasks[todoListID]
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(t => t.id === todoListID ? {...t, title: title} : t))
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
                                tasksForTodoLists = tasksForTodoLists.filter(t => t.status === TaskStatuses.New)
                            }
                            if (t.filter === "active") {
                                tasksForTodoLists = tasksForTodoLists.filter(t => t.status === TaskStatuses.Completed)
                            }

                            return (
                                <Grid item key={t.id}>
                                    <Paper elevation={2} style={{padding: "1rem"}}>
                                        <TodoList
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


export default App;

