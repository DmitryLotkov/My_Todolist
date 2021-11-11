import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./TodoList";

export type FilterValueType = "all" | "active" | "completed"
export type StateType = Array<taskType>

type taskType = {
    id: string, title: string, isDone: boolean
}

function App() {

    const changeStatus = (isDone: boolean, taskID: string) => {

        tasks = tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        /* let task = tasks.find(t => t.id === taskID);
         if(task){
             task.isDone = isDone;
             setTasks([...tasks])
         }*/
        setTasks([...tasks])
    }

    const addTask = (inputData: string) => {
        let task = {
            id: v1(), title: inputData, isDone: false
        }
        setTasks([task, ...tasks])
    };

    const removeTask = (taskId: string) => {
        tasks = tasks.filter(t => t.id !== taskId);
        setTasks(tasks);
        console.log(tasks);
    };


    let [tasks, setTasks] = useState<StateType>([
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "TypeScript", isDone: true},
    ]);

    let [filter, setFilter] = useState<FilterValueType>("all");

    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }
    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    const changeFilter = (filterValue: FilterValueType) => {
        setFilter(filterValue);
    }

    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      tasks={tasks}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      changeFilter={changeFilter}
                      filter={filter}
            />

        </div>
    );
}

export default App;

