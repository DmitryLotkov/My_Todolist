import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

export type ActionsType = RemoveToDoListActionType | AddToDoListReducerActionType|
    ChangeTodoListFilterActionType | ChangeTodoListTitleActionType


export type RemoveToDoListActionType = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
export type AddToDoListReducerActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todoListID: string
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
export const addTodoListAC = (title: string):AddToDoListReducerActionType =>{
    return {type: "ADD-TODOLIST", title:title, todoListID: v1()}
}
export const changeTodoListTitleAC = (todoListID: string, title: string):ChangeTodoListTitleActionType =>{
    return {type: "CHANGE-TODOLIST-TITLE", title: title, todoListID:todoListID}
}
let initialState:Array<TodoListType> = []


export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> =>{
    switch (action.type){
        case 'REMOVE-TODOLIST':{
            return state.filter(tl => tl.id !== action.todoListID);
        }
        case 'ADD-TODOLIST':
            let newTodoList: TodoListType =
                {id: action.todoListID, title: action.title, filter: "all" };
            return [
                newTodoList, ...state
            ]
        case "CHANGE-TODOLIST-FILTER":
            return state.map(t => t.id === action.todoListID ? {...t, filter: action.filter}: t)
        case "CHANGE-TODOLIST-TITLE":
            let newTitle = "What to deal";
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: newTitle}:tl);
        default:
            return state;
    }
}