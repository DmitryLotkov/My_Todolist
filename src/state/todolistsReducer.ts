import {FilterValueType} from "../trash/AppOld";

import {todoListAPI} from "../api/todoListsAPI";
import {Dispatch} from "redux";
import {TodoListType} from "../api/taskAPI";


export type ActionsType = RemoveToDoListActionType
    | CreateToDoListReducerActionType
    | ChangeTodoListFilterActionType
    | ChangeTodoListTitleActionType
    | SetTodoListActionType

export type TodoListDomainType = TodoListType & {
    filter: FilterValueType
};
//actionsType
export type SetTodoListActionType = ReturnType<typeof setTodoListsAC>;
export type RemoveToDoListActionType = ReturnType<typeof removeTodoListAC>;
export type CreateToDoListReducerActionType = ReturnType<typeof createTodoListAC>;
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>;
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>;

//actions
export const removeTodoListAC = (todolistID: string) =>
    ({type: 'REMOVE-TODOLIST', todoListID: todolistID} as const);
export const changeTodoListFilterAC = (todoListID: string, filter: FilterValueType) =>
    ({type: "CHANGE-TODOLIST-FILTER", filter: filter, todoListID: todoListID} as const);
export const createTodoListAC = (todolist: TodoListType) =>
    ({type: "ADD-TODOLIST", todolist} as const);
export const changeTodoListTitleAC = (todoListID: string, title: string) =>
    ({type: "CHANGE-TODOLIST-TITLE", title, todoListID} as const);
export const setTodoListsAC = (todolists: Array<TodoListType>) =>
    ({type: 'SET-TODOLISTS', todolists} as const);

let initialState: Array<TodoListDomainType> = []


export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todoListID);
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case "CHANGE-TODOLIST-FILTER":
            return state.map(t => t.id === action.todoListID ? {...t, filter: action.filter} : t)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl);
        case "SET-TODOLISTS":
            return action.todolists.map(td => ({...td, filter: "all"}));
        default:
            return state;
    }
}

//thunks
export const getTodolists = () => (dispatch: Dispatch<ActionsType>) => {
    todoListAPI.getTodoLists()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
        })
        .catch((error) => console.log("getTodolists", error))

}

export const deleteTodoList = (todoListID: string) => (dispatch: Dispatch<ActionsType>) => {
    todoListAPI.deleteTodolist(todoListID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoListAC(todoListID));
            }
        })
        .catch((error) => console.log("deleteTodoList", error))

}

export const createTodolist = (todoListTitle: string) => (dispatch: Dispatch<ActionsType>) => {
    todoListAPI.createTodolist(todoListTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(createTodoListAC(res.data.data.item));
            }
        })
}

export const changeTodoListTitleTC = (todoListTitle: string, todoListID: string) => (dispatch: Dispatch<ActionsType>) => {
    todoListAPI.updateTodolist(todoListID, todoListTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(todoListID, todoListTitle));
            }
        })
}
