import { authAPI } from "../api/api";

const SET_USER_DATA = 'it-kamasutra/auth/SET_USER_DATA';

let initialState = {
 id: null,
 email: null,
 login: null,
 isAuth: false
}
const authReducer = (state=initialState, action) => {
    switch (action.type) {
      
    case SET_USER_DATA: 
    return {
      ...state,
      ...action.data
    }
    
    default:
    return state;
  }
}

export let setAuthUserData = (id, email, login, isAuth) => ({type: SET_USER_DATA, data: {id, email, login, isAuth}});
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
export const login = (email, password, rememberMe) => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe)
      
       
        if(data.resultCode===0){
        dispatch(authUser())}
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



export default authReducer;