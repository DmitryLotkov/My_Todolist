import {FilterValueType} from "../App";

import {todoListAPI} from "../api/todoListsAPI";
import {Dispatch} from "redux";
import {TodoListType} from "../api/taskAPI";


export type ActionsType = RemoveToDoListActionType | AddToDoListReducerActionType|
    ChangeTodoListFilterActionType | ChangeTodoListTitleActionType| SetTodoListActionType

export type TodoListDomainType = TodoListType & {
    filter: FilterValueType

}

export type SetTodoListActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodoListType>
}
export type RemoveToDoListActionType = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
export type AddToDoListReducerActionType = {
    type: 'ADD-TODOLIST',
    todolist:TodoListType
}
export type ChangeTodoListFilterActionType = {
    type:"CHANGE-TODOLIST-FILTER",
    todoListID: string,
    filter: FilterValueType
}
export type ChangeTodoListTitleActionType = {
    type:"CHANGE-TODOLIST-TITLE",
    todoListID: string
    title: string
}
export const removeTodoListAC = (todolistID:string):RemoveToDoListActionType =>{
    return {type:'REMOVE-TODOLIST', todoListID: todolistID}
}
export const changeTodoListFilterAC = (todoListID:string, filter: FilterValueType ):ChangeTodoListFilterActionType =>{
    return {type: "CHANGE-TODOLIST-FILTER", filter: filter, todoListID:todoListID}
}
export const createTodoListAC = (todolist: TodoListType):AddToDoListReducerActionType =>{
    return {type: "ADD-TODOLIST", todolist}
}
export const changeTodoListTitleAC = (todoListID: string, title: string):ChangeTodoListTitleActionType =>{
    return {type: "CHANGE-TODOLIST-TITLE", title, todoListID}
}
export const setTodoListsAC = (todolists: Array<TodoListType>):SetTodoListActionType =>{
    return {type: 'SET-TODOLISTS', todolists}
}
let initialState:Array<TodoListDomainType> = []


export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType): Array<TodoListDomainType> =>{
    switch (action.type){
        case 'REMOVE-TODOLIST':{
            return state.filter(tl => tl.id !== action.todoListID);
        }
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case "CHANGE-TODOLIST-FILTER":
            return state.map(t => t.id === action.todoListID ? {...t, filter: action.filter}: t)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title}:tl);
        case "SET-TODOLISTS":{
            return action.todolists.map(td =>{
                return { ...td, filter: "all"}
            })
        }
        default:
            return state;
    }
}

export const getTodolists = () =>{

    return (dispatch:Dispatch) =>{
        todoListAPI.getTodoLists().then(res =>{
            dispatch(setTodoListsAC(res.data))
        }).catch((error) => console.log("getTodolists",error ))
    }
}

export const deleteTodoList = (todoListID: string) =>{
    return (dispatch:Dispatch) =>{
        todoListAPI.deleteTodolist(todoListID).then(res =>{
            if(res.data.resultCode === 0){dispatch(removeTodoListAC(todoListID));
            }
        }).catch((error) => console.log("deleteTodoList",error ))

    }
}
export const createTodolist =(todoListTitle: string) =>{
    return (dispatch:Dispatch) =>{
        todoListAPI.createTodolist(todoListTitle).then(res =>{
            if(res.data.resultCode === 0) {
                dispatch(createTodoListAC(res.data.data.item));
            }

        })
    }
}
export const changeTodoListTitleTC = (todoListTitle: string, todoListID: string) =>{
    return (dispatch:Dispatch) =>{

        todoListAPI.updateTodolist(todoListID,todoListTitle )
            .then(res => {
                if(res.data.resultCode === 0) {

                    dispatch(changeTodoListTitleAC(todoListID, todoListTitle))
                }
            })
    }
}