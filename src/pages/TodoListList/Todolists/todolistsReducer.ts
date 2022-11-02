import {FilterValueType} from "../../../trash/AppOld";
import {TodoListType} from "../../../api/taskAPI";
import {RequestStatusType} from "../../../state/app-reducer";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TodoListDomainType = TodoListType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
};


//actionsType
export type SetTodoListActionType = ReturnType<typeof setTodoListsAC>;
export type RemoveToDoListActionType = ReturnType<typeof removeTodoListAC>;
export type CreateToDoListReducerActionType = ReturnType<typeof createTodoListAC>;
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>;
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>;
export type SetTodoListEntityStatusActionType = ReturnType<typeof setTodoListEntityStatusAC>;

//reducer
let initialState: Array<TodoListDomainType> = []

const slice = createSlice({
    name: "todolist",
    initialState,
    reducers: {
        removeTodoListAC(state, action: PayloadAction<{ todoListID: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID);
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        changeTodoListFilterAC(state, action: PayloadAction<{
            todoListID: string,
            filter: FilterValueType
        }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID);
            state[index].filter = action.payload.filter;
        },
        createTodoListAC(state, action: PayloadAction<{ todoList: TodoListType }>) {
            state.unshift({...action.payload.todoList, filter: "all", entityStatus: "idle"})
        },
        changeTodoListTitleAC(state, action: PayloadAction<{ todoListID: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID);
            state[index].title = action.payload.title;
        },
        setTodoListsAC(state, action: PayloadAction<{ todolists: Array<TodoListType> }>) {
            return action.payload.todolists.map(td => ({...td, filter: "all", entityStatus: "idle"}));
        },
        setTodoListEntityStatusAC(state, action: PayloadAction<{
            todoListID: string,
            entityStatus: RequestStatusType
        }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID);
            if (index > -1) {
                state[index].entityStatus = action.payload.entityStatus;
            }
        }
    },
})
export const {
    removeTodoListAC, changeTodoListFilterAC, createTodoListAC, changeTodoListTitleAC,
    setTodoListsAC, setTodoListEntityStatusAC
} = slice.actions;

export const todoListsReducer = slice.reducer;

