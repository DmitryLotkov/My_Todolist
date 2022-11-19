import {v1} from 'uuid';
import {FilterValueType} from "../../../trash/AppOld";
import {
    changeTodoListFilterAC, TodoListDomainType,
    todoListsReducer
} from "./todolistsReducer";
import {taskReducer} from "../../../state/task-reducer";
import {changeTodoListTitleTC, createTodolistTC, deleteTodoListTC, getTodolistsTC} from "./todolistsActions";

let startState: Array<TodoListDomainType>
let todolistId1 = v1();
let todolistId2 = v1();

beforeEach(() => {

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: "", entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: "", entityStatus: "idle"}]
})
test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, deleteTodoListTC.fulfilled({todoListID: todolistId1}, "requestID", todolistId1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {
    const newTodolistTitle =
        {id: todolistId1, title: "What to earn", filter: "all", order: 0, addedDate: ""};
    const endState = todoListsReducer(startState, createTodolistTC.fulfilled({todoList: newTodolistTitle}, "requestId", "What to earn"))
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("What to earn");
    expect(endState[0].filter).toBe("all");
});
test("filter of todolist should be changed", () => {

    const newFilter: FilterValueType = "completed";
    const endState = todoListsReducer(startState, changeTodoListFilterAC({
        todoListID: todolistId2,
        filter: newFilter
    }))
    expect(endState[1].filter).toBe(newFilter);
    expect(endState.length).toBe(2)
})
test("correct todoList should change its name", () => {

    const newTitle = "What to deal";
    const endState = todoListsReducer(startState, changeTodoListTitleTC.fulfilled({
        todoListID: todolistId1,
        todoListTitle: newTitle
    }, "requestID", {
        todoListID: todolistId1,
        todoListTitle: newTitle
    }))
    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe("What to buy");
    expect(endState[0].title).toBe(newTitle);
})

test("correct todoList should be set to the state", () => {
    const endState = todoListsReducer([], getTodolistsTC.fulfilled({todolists: startState}, "requestID"))
    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe("What to learn");
})

test("empty arrays should be added when we set todoLists", () => {
    const endState = taskReducer({}, getTodolistsTC.fulfilled({todolists: startState}, "requestID"));
    const keys = Object.keys(endState);
    expect(endState[todolistId1]).toStrictEqual([]);
    expect(endState[todolistId1]).toStrictEqual([]);
    expect(keys.length).toBe(2);
})

test('todolists should be set to the state', () => {

    const action = getTodolistsTC.fulfilled({todolists: startState}, "requestID");
    const endState = todoListsReducer([{
        id: "",
        title: "",
        addedDate: "",
        order: 0,
        filter: "all",
        entityStatus: "idle"
    }
    ], action)
    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe("What to learn")
})




