import axios from 'axios'
import {LoginParamsType} from "../login/auth-reducer";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "3ca3376c-f1c7-42b6-b439-a7f59c674e78",
    },
}
export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    ...settings
})
//types
type AuthDataType = {
    id:string,
    email: string
    login:string
}
type AuthType = {
    data: AuthDataType
}

export type ResponseType<D = {}> = {  //это дженерик тип. <D = {}> значение по умолчанию типа D = пустой объект
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: 0|1
    data: D
}

//api
export const authAPI = {
    me(){
        return instance.get<ResponseType<AuthType>>(`/auth/me`);
    },
    login(data: LoginParamsType){
        return instance.post<ResponseType<{userId: string}>>(`/auth/login`, data);
    },
    logOut(){
        return instance.delete<ResponseType>(`/auth/login`);
    }
}