import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./task-reducer";
import {TasksStateType, TodoListType} from "../App";
import {addTodoListAC, removeTodoListAC, todoListsReducer} from "./todolistsReducer";


let startState: TasksStateType;
beforeEach(()=>{
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
})
test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC("2", "todolistId2");

    const endState = taskReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false }
        ]
    });

});
test('correct task should be added to correct array', () => {

    const action = addTaskAC("juice", "todolistId2");

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].isDone).toBe(false);
});
test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("2", false, "todolistId2");

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"][1].isDone).toBeTruthy();
    expect(endState["todolistId2"][1].isDone).toBeFalsy();
    expect(endState["todolistId2"][0].isDone).toBe(false);
});
test('title of specified task should be changed', () => {

    const newTitle = "butter"
    const action = changeTaskTitleAC("1", newTitle, "todolistId2");

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("JS");
    expect(endState["todolistId2"][0].title).toBe("butter");

});
test('new array should be added when new todolist is added', () => {

    const action = addTodoListAC("new todolist");

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([]);
});
test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodoListType> = [];

    const action = addTodoListAC("new todolist");

    const endTasksState = taskReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;


    expect(idFromTasks).toBe(action.todoListID);
    expect(idFromTodoLists).toBe(action.todoListID);
    expect(idFromTodoLists).toBe(idFromTasks);
});
test('property with todolistId should be deleted', () => {

    const action = removeTodoListAC("todolistId2");

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

