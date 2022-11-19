import {createTaskTC, deleteTaskTC, fetchTasksTC, taskReducer, updateTaskTC} from "./task-reducer";
import {TasksStateType} from "../trash/AppOld";
import {
    TodoListDomainType,
    todoListsReducer
} from "../pages/TodoListList/Todolists/todolistsReducer";
import {TaskPriorities, TaskStatuses} from "../api/taskAPI";
import {createTodolistTC, deleteTodoListTC} from "../pages/TodoListList/Todolists/todolistsActions";


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
    let param = {todoListID: "todolistId2", taskID: "2"}

    const action = deleteTaskTC.fulfilled(param, "requestId", param );

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

    const action = createTaskTC.fulfilled(

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

    }, "requestID", {todoListID: "todolistId2", inputData:"tea"});

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("tea");
    expect(endState["todolistId2"][0].status).toBe(0);
});
test('status of specified task should be changed', () => {
    const updateModel = {taskID: "2", todoListID: "todolistId2", domainModel: {status: TaskStatuses.InProgress}}
    const action = updateTaskTC.fulfilled(
        updateModel,
        "requestID",
        updateModel
    );

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.InProgress);
    expect(endState["todolistId2"][1].title).toBe("milk");
});
test('title of specified task should be changed', () => {
const updateModel = {taskID: "1", todoListID: "todolistId2", domainModel: {title: "butter",}}
    const action = updateTaskTC.fulfilled(updateModel, "requestId", updateModel);

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"][0].title).toBe("CSS");
    expect(endState["todolistId2"][0].title).toBe("butter");

});
test('new array should be added when new todolist is added', () => {

    const action = createTodolistTC.fulfilled({todoList: {id: "1", order: 0, addedDate: "", title: "New TD Title"}}, "requestID", "New TD Title");

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

    const action = createTodolistTC.fulfilled({todoList: {id: "1", order: 0, addedDate: "", title: "New TD Title"}}, "requestID", "New TD Title");

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

    const action = deleteTodoListTC.fulfilled({todoListID: "todolistId2"}, "requestId", "todolistId2");
    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});

test('tasks should be added for todolist', () => {

    const action = fetchTasksTC.fulfilled({todoListID: "todolistId2",
        tasks: startState["todolistId2"]}, "requestID", "todolistId1");

    const endState = taskReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)


    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId1"].length).toBe(0);
    expect(endState["todolistId2"][0].title).toBe("bread");
});


