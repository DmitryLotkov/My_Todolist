import {
    createTaskAC,
    updateTaskAC,
    removeTaskAC,
    taskReducer,
    setTasksAC
} from "./task-reducer";
import {TasksStateType} from "../trash/AppOld";
import {
    createTodoListAC,
    removeTodoListAC,
    TodoListDomainType,
    todoListsReducer
} from "../pages/TodoListList/Todolists/todolistsReducer";
import {TaskPriorities, TaskStatuses} from "../api/taskAPI";


let startState: TasksStateType;
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                priority: TaskPriorities.Middle,
                order: 0,
                description: "",
                deadline: "",
                addedDate: ""
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: "",
                deadline: "",
                addedDate: ""
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: "",
                deadline: "",
                addedDate: ""
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                priority: TaskPriorities.Middle,
                order: 0,
                description: "",
                deadline: "",
                addedDate: ""
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: "",
                deadline: "",
                addedDate: ""
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: "",
                deadline: "",
                addedDate: ""
            }
        ]
    };
})
test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC({todolistID: "todolistId2", taskID: "2"});

    const endState = taskReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                priority: TaskPriorities.Middle,
                order: 0,
                description: "",
                deadline: "",
                addedDate: ""
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: "",
                deadline: "",
                addedDate: ""
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: "",
                deadline: "",
                addedDate: ""
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                priority: TaskPriorities.Middle,
                order: 0,
                description: "",
                deadline: "",
                addedDate: ""
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: "",
                deadline: "",
                addedDate: ""
            }
        ]
    });

});
test('correct task should be added to correct array', () => {

    const action = createTaskAC({
        task:
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: "",
                deadline: "",
                addedDate: ""
            }
    });

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("tea");
    expect(endState["todolistId2"][0].status).toBe(0);
});
test('status of specified task should be changed', () => {

    const action = updateTaskAC({taskID: "2", todoListID: "todolistId2", model: {status: TaskStatuses.InProgress}});

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.InProgress);
    expect(endState["todolistId2"][1].title).toBe("milk");
});
test('title of specified task should be changed', () => {

    const action = updateTaskAC({
        taskID: "1", todoListID: "todolistId2", model: {
            title: "butter",
        }
    });

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"][0].title).toBe("CSS");
    expect(endState["todolistId2"][0].title).toBe("butter");

});
test('new array should be added when new todolist is added', () => {

    const action = createTodoListAC({todoList: {id: "1", order: 0, addedDate: "", title: "New TD Title"}});

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
    const startTodoListsState: Array<TodoListDomainType> = [];

    const action = createTodoListAC({todoList: {id: "1", order: 0, addedDate: "", title: "New TD Title"}});

    const endTasksState = taskReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;


    expect(idFromTasks).toBe(action.payload.todoList.id);
    expect(idFromTodoLists).toBe(action.payload.todoList.id);
    expect(idFromTodoLists).toBe(idFromTasks);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodoListAC({todoListID: "todolistId2"});
    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});

test('tasks should be added for todolist', () => {

    const action = setTasksAC({todoListID: "todolistId2",
        tasks: startState["todolistId2"]});

    const endState = taskReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)


    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId1"].length).toBe(0);
    expect(endState["todolistId2"][0].title).toBe("bread");
});


