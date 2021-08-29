import axios from 'axios';

export function isValidLogin(){
    const loginToken = window.sessionStorage.getItem('YOUTHCAFEAPPLICATION');
    return loginToken;
}

export async function doLogin(loginData){
    const response = await axios.post('http://localhost:8088/v1/user/login', loginData);
    console.log(response);
}