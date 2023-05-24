import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

let initialState = {
    posts : [
        {id: 1, message: 'Hello!', likesCount: 15},
        {id: 2, message: "It's my first post", likesCount: 16}
      ],
      newPostText: '',
      profile: null,
      status: ''
}
const profilePageReducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts,newPost],
        newPostText: ""
      }
      
    case UPDATE_NEW_POST_TEXT:
      return {
        ...state,
        newPostText: action.newText
      }
      case SET_USER_PROFILE:
        return {...state, profile: action.profile}
      case SET_STATUS:
        return {...state, status: action.status}

    default:
      return state;
  }
};

export let addPostActionCreator = () => ({type: ADD_POST });
export let updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});
export let setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export let setStatus = (status) => ({type: SET_STATUS, status})

export const getUserProfile = (profileId) => {
  return async (dispatch) => {
  let data = await profileAPI.getUserProfile(profileId)
      
          dispatch(setUserProfile(data));
     
    }
}
export const getStatus = (userId) => {
  return async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
      
        if(data.resultCode===0) {
          dispatch(setStatus(data));
        }
      
    }
}
export const updateStatus = (status) => {
  return async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if(data.resultCode===0) {
          dispatch(setStatus(status));
    }
    }
}
export default profilePageReducer;
