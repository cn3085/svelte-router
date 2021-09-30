import axios from 'axios';

export const TOKEN_NAME = 'YOUTHCAFEAPPLICATION';

export function isValidLogin(){
    const loginToken = window.sessionStorage.getItem(TOKEN_NAME);
    return loginToken;
}

export async function doLogin(loginData){
    try{
        const response = await axios.post('http://localhost:8088/v1/user/login', loginData);
        const {code, message, data:token} = response.data;
        if(code === 'SUCC'){
            window.sessionStorage.setItem(TOKEN_NAME, token);
        }
        return {
            code: code,
            message: message
        };
        
    }catch(e){
        console.log(e);
        return {
            code: 'FAIL',
            message: '로그인 요청에 실패하였습니다.'
        };
    }
}


export function doLogout(){
    window.sessionStorage.removeItem(TOKEN_NAME);
}