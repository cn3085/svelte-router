import axios from 'axios';
import config from '../config'

export const TOKEN_NAME = 'YOUTHCAFEAPPLICATION';

export function getToken(){
    const loginToken = window.sessionStorage.getItem(TOKEN_NAME);
    return loginToken;
}

export async function doLogin(loginData){
    try{
        const response = await axios.post(config.rootURL + '/v1/user/login', loginData);
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
    window.location.href = '/';

}