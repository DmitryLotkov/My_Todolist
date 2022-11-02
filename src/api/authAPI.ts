import axios from 'axios'
import {LoginParamsType} from "../auth/login-reducer";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "c3728aab-6f62-411f-9e90-c03d8ff7b899",
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