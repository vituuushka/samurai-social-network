import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'it-kamasutra/auth/SET_USER_DATA';
const GET_CAPTCHA = 'GET_CAPTCHA'

let initialState = {
 id: null,
 email: null,
 login: null,
 isAuth: false,
 captchaURL: null
}
const authReducer = (state=initialState, action) => {
    switch (action.type) {
      
    case SET_USER_DATA: 
    case GET_CAPTCHA:
    return {
      ...state,
      ...action.data
    }
    
    default:
    return state;
  }
}

export const setAuthUserData = (id, email, login, isAuth) => ({type: SET_USER_DATA, data: {id, email, login, isAuth}});
export const getCaptchaSuccess = (captchaURL) => ({type: GET_CAPTCHA, data:{captchaURL}})

export const authUser = () => {
  return (dispatch) => {
    authAPI.authUser()
      .then(data => {
        if(data.resultCode===0){
        let {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, true));
      }})
  }
}
export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
      
       
        if(data.resultCode===0){
        dispatch(authUser())}
        else{
          if(data.resultCode===10) {
            dispatch(getCaptchaUrl());
          }
        }
    //    else {
    //     setStatus({error: data.messages})
    // }
 
}
export const logout = () => async (dispatch) => {
  let data = await authAPI.logout()
    
      if(data.resultCode===0){
        dispatch(setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaUrl = () => async (dispatch) => {
  const data = await securityAPI.getCaptchaURL()
  const captcha = data.url
        dispatch(getCaptchaSuccess(captcha))
}



export default authReducer;