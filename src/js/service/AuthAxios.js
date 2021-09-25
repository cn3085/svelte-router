import { getToken } from "./LoginService"
import axios from "axios"

export function getAxios(){
    return axios.create({
        baseURL: 'http://localhost:8088',
        headers: {
            'X-AUTH-TOKEN' : getToken()
        }
    })
}