import {instance, TodoListType} from "./taskAPI";


export type ResponseType<D = {}> = {  //это дженерик тип. <D = {}> значение по умолчанию типа D = пустой объект
    fieldsErrors: [""]
    messages: [""]
    resultCode: 0|1
    data: D
}

export const todoListAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>("");
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodoListType}>>( "",{title: title});
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`${id}`, {title});
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`${id}`);
    },

}