
import {v1} from 'uuid';
import {FilterValueType, TodoListType} from "../App";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./todolistsReducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New ToDoList";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, addTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all");
});
test("filter of todolist should be changed", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter:FilterValueType = "completed";
    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const endState = todoListsReducer(startState, changeTodoListFilterAC(todolistId2, newFilter))
    expect(endState[1].filter).toBe(newFilter);
    expect(endState.length).toBe(2)
})
test("correct todoList should change its name", ()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTitle = "What to deal";
    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const endState = todoListsReducer(startState, changeTodoListTitleAC(todolistId1, newTitle))
    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe("What to buy");
    expect(endState[0].title).toBe(newTitle);
})
