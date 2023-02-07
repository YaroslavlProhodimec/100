import {authAPI, securityAPI} from "../api/api";
import {AxiosResponse} from "axios";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl:null // if null, then captchaUrl is not required
}
const authReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case SET_USER_DATA :
        case GET_CAPTCHA_URL_SUCCESS :
            return {
                ...state,
                ...action.payload,

            }


        default :
            return state;
    }
}

export const setAuthUserData = (userId: any, email: any, login: any,isAuth:any) => ({type: SET_USER_DATA,
    payload: {userId, email, login,isAuth}
})
export const getCaptchaUrlSuccess = (captchaUrl:any) => ({type: GET_CAPTCHA_URL_SUCCESS,payload: {captchaUrl}})
 export const  getUserData = () => async (dispatch:any) => {
   let response =  await authAPI.me()

    if (response.data.resultCode === 0){
        let {id, login, email, } = response.data.data
        dispatch(setAuthUserData(id,  email, login,true))}
}

export const  login = (email:any,password:any,rememberMe:any,captchaUrl:any) => (dispatch:any) => {
    authAPI.login(email,password,rememberMe,captchaUrl)
        .then(response => {
            if (response.data.resultCode === 0){
                dispatch(getUserData())
            }else {
                if(response.data.resultCode === 10){
                    dispatch(getCaptchaUrl())
                }

                let message = response.data.messages.length > 0 ? response.data.messages[0] :"SOME error"
                dispatch(stopSubmit('edit-profile',{_error: message}))
            }
        })}
export const  logout = () => (dispatch:any) => {
    authAPI.logout()
        .then((response: AxiosResponse) => {
            if (response.data.resultCode === 0){
                dispatch(setAuthUserData(null,  null, null,false))
            }
        })}
export const  getCaptchaUrl = () => async (dispatch:any) => {

    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
        }
export default authReducer;