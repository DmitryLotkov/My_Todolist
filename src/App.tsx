import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";


export type FilterValueType = "all" | "active" | "completed"
export type StateType = Array<taskType>

export type TodoListType = {
    id: string, title: string, filter: FilterValueType
}
export type TodoListStateType = {
    [key: string]: Array<taskType>
}

type taskType = {
    id: string, title: string, isDone: boolean
}

function App() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ])
    let [tasks, setTasks] = useState<TodoListStateType>({
        [todoListID1]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "TypeScript", isDone: true},
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Cucumbers", isDone: false},
        ]
    });


    const changeStatus = (isDone: boolean, taskID: string, todoListID: string) => {

        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        setTasks({...tasks});
    }

    const addTask = (inputData: string, todoListID: string) => {
        debugger
        let task = {
            id: v1(), title: inputData, isDone: false
        }
        setTasks({...tasks, [todoListID]: [task, ...tasks[todoListID]]})
    };

    const removeTask = (taskID: string, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    };
    const changeFilter = (filter: FilterValueType, todoListID: string) => {
        let copyTodoLists = [...todoLists];
        let filteredTodoLists = copyTodoLists.map(t => t.id === todoListID ? {...t, filter: filter} : t);
        setTodoLists(filteredTodoLists);
    }
    const removeTodoLists = (todoListID: string) => {
        let copyTodoLists = [...todoLists];
        let filteredTodoLists = copyTodoLists.filter(t => t.id !== todoListID);
        setTodoLists(filteredTodoLists);
    }

    const addTodolist = (title: string, ) => {
        const todoListID = v1();
        let newTodoList: TodoListType =
            {id: todoListID, title: title, filter: "all" };
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({...tasks, [todoListID]:[]})
    }
    const changeTaskTitle = (title: string, taskID: string, todoListID: string, ) => {
        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title: title}: t)
        setTasks({...tasks})
    }
    const changeTodoListTitle = (title:string, todoListID:string) => {
        setTodoLists(todoLists.map(t => t.id === todoListID ? {...t, title:title}:t))
    }
    return (
        <div className={"App"}>
            <AddItemForm addItem={addTodolist}/>
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
                        <TodoList
                            key={t.id}
                            title={t.title}
                            tasks={tasksForTodoLists}
                            removeTask={removeTask}
                            addItem={addTask}
                            changeStatus={changeStatus}
                            changeFilter={changeFilter}
                            filter={t.filter}
                            todoListID={t.id}
                            removeTodoLists={removeTodoLists}
                            changeTaskTitle ={changeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    )
                })}
        </div>
    );

}


export default App;

