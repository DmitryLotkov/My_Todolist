import {FilterValueType} from "../../../trash/AppOld";
import {TodoListType} from "../../../api/taskAPI";
import {RequestStatusType} from "../../../state/app-reducer";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeTodoListTitleTC, createTodolistTC, deleteTodoListTC, getTodolistsTC} from "./todolistsActions";

export type TodoListDomainType = TodoListType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
};

//actionsType
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>;
export type SetTodoListEntityStatusActionType = ReturnType<typeof setTodoListEntityStatusAC>;

//reducer
let initialState: Array<TodoListDomainType> = []

const slice = createSlice({
    name: "todolist",
    initialState,
    reducers: {
        changeTodoListFilterAC(state, action: PayloadAction<{
            todoListID: string,
            filter: FilterValueType
        }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID);
            state[index].filter = action.payload.filter;
        },
        setTodoListEntityStatusAC(state, action: PayloadAction<{
            todoListID: string,
            entityStatus: RequestStatusType
        }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID);
            if (index > -1) {
                state[index].entityStatus = action.payload.entityStatus;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(td => ({...td, filter: "all", entityStatus: "idle"}));
        });
        builder.addCase(deleteTodoListTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID);
            if (index > -1) {
                state.splice(index, 1)
            }
        });
        builder.addCase(createTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todoList, filter: "all", entityStatus: "idle"})
        });
        builder.addCase(changeTodoListTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID);
            state[index].title = action.payload.todoListTitle;
        });
    }
})
export const {
    changeTodoListFilterAC,
    setTodoListEntityStatusAC
} = slice.actions;

export const todoListsReducer = slice.reducer;

