import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType} from "./Reducers/state";
import {combineReducers, createStore} from "redux";
import {v1} from "uuid";
import {taskReducer} from "./Reducers/task-reducer";
import {todoListsReducer} from "./Reducers/todolistsReducer";



const rootReducer = combineReducers({
    tasks: taskReducer,
    toDoLists: todoListsReducer
})
export const taskID1 = v1();
export const taskID2 = v1();

const initialGlobalState = {
    toDoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: taskID1, title: "HTML&CSS", isDone: true},
            {id: taskID2, title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true},
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return (
        <Provider store={storyBookStore}>{storyFn()}</Provider>
    );
};


export default ReduxStoreProviderDecorator;