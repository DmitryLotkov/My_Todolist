import {v1} from 'uuid';
import {FilterValueType} from "../App";
import {
    createTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC, setTodoListsAC, TodoListDomainType,
    todoListsReducer
} from "./todolistsReducer";
import {taskReducer} from "./task-reducer";

let startState: Array<TodoListDomainType>
let todolistId1 = v1();
let todolistId2 = v1();

beforeEach(() => {

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ""}]
})
test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {
    let newTodolistTitle =
        {id: todolistId1, title: "What to earn", filter: "all", order: 0, addedDate: ""};
    const endState = todoListsReducer(startState, createTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("What to earn");
    expect(endState[0].filter).toBe("all");
});
test("filter of todolist should be changed", () => {

    let newFilter: FilterValueType = "completed";

    const endState = todoListsReducer(startState, changeTodoListFilterAC(todolistId2, newFilter))
    expect(endState[1].filter).toBe(newFilter);
    expect(endState.length).toBe(2)
})
test("correct todoList should change its name", () => {

    let newTitle = "What to deal";

    const endState = todoListsReducer(startState, changeTodoListTitleAC(todolistId1, newTitle))
    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe("What to buy");
    expect(endState[0].title).toBe(newTitle);
})

test("correct todoList should be set to the state", () => {

    const endState = todoListsReducer([], setTodoListsAC(startState))
    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe("What to learn");
})

test("empty arrays should be added when we set todoLists", () => {

    const endState = taskReducer({}, setTodoListsAC(startState));
    const keys = Object.keys(endState);
    expect(endState[todolistId1]).toStrictEqual([]);
    expect(endState[todolistId1]).toStrictEqual([]);
    expect(keys.length).toBe(2);
})

test('todolists should be set to the state', () => {

    const action = setTodoListsAC(startState);

    const endState = todoListsReducer([{
        id: "",
        title: "",
        addedDate: "",
        order: 0,
        filter: "all"
    }
    ], action)

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe("What to learn")
})




