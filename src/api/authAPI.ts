import axios from 'axios'
import {LoginParamsType} from "../login/auth-reducer";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "75cc682e-08cd-4c4d-a4d5-b1326df235de",
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


export type ResponseType<D = {}> = {  //это дженерик тип. <D = {}> значение по умолчанию типа D = пустой объект
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: 0|1
    data: D
}

//api
export const authAPI = {
    me(){
        return instance.get<ResponseType<AuthDataType>>(`/auth/me`);
    },
    login(data: LoginParamsType){
        return instance.post<ResponseType<AuthDataType>>(`/auth/login`, data);
    },
    logOut(){
        return instance.delete<ResponseType>(`/auth/login`);
    }
}