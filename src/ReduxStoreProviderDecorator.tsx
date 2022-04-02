import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType} from "./state/state";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "./state/task-reducer";
import {todoListsReducer} from "./state/todolistsReducer";
import {TaskStatuses} from "./api/taskAPI";
import thunkMiddleware from "redux-thunk";



const rootReducer = combineReducers({
    tasks: taskReducer,
    toDoLists: todoListsReducer
})
/*export const taskID1 = v1();
export const taskID2 = v1();*/

const initialGlobalState = {
    toDoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: "", order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId:"todolistId1", startDate: "", priority:0, order:0, description:"", deadline:"", addedDate:"" },
            { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId:"todolistId1", startDate: "", priority:0, order:0, description:"", deadline:"", addedDate:"" },
            { id: "3", title: "tea", status: TaskStatuses.Completed, todoListId:"todolistId1", startDate: "", priority:0, order:0, description:"", deadline:"", addedDate:"" }
        ],
        ["todolistId2"]: [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId:"todolistId2", startDate: "", priority:0, order:0, description:"", deadline:"", addedDate:"" },
            { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId:"todolistId2", startDate: "", priority:0, order:0, description:"", deadline:"", addedDate:"" },
            { id: "3", title: "tea", status: TaskStatuses.Completed, todoListId:"todolistId2", startDate: "", priority:0, order:0, description:"", deadline:"", addedDate:"" }
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType,  applyMiddleware(thunkMiddleware));


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return (
        <Provider store={storyBookStore}>{storyFn()}</Provider>
    );
};


export default ReduxStoreProviderDecorator;