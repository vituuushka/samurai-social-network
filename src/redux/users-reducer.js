import { userAPI } from "../api/api";
import { updateObjectsInArray } from "../utils/validators/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TUGGLE_IS_FETCHING = 'TUGGLE_IS_FETCHING'
const TUGGLE_IS_FOLLOWING_PROGRESS = 'TUGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
  users: [],
  pageSize: 5,
  portionSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: []
}
const usersReducer = (state=initialState, action) => {
    switch (action.type) {
    case FOLLOW:
    return {
      ...state,
      users: updateObjectsInArray(state.users,action.userId,'id',{followed: true} )
      // users: state.users.map(u => {
      //   if(u.id===action.userId) {
      //     return{...u, followed: true}
      //   }
      //   return u;
      // })
    }
    case UNFOLLOW: 
    return {
      ...state,
      users: updateObjectsInArray(state.users,action.userId,'id',{followed: false} )
      // users: state.users.map(u => {
      //   if(u.id===action.userId) {
      //     return{...u, followed: false}
      //   }
      //   return u;
      // })
    }
    case SET_USERS:
      return {
        ...state, 
        users: action.users
      }
      case SET_CURRENT_PAGE:
      return {
        ...state, 
        currentPage: action.currentPage
      }
      case SET_TOTAL_USERS_COUNT:
      return {
        ...state, 
        totalUsersCount: action.totalUsersCount
      }
      case TUGGLE_IS_FETCHING:
        return {
          ...state, 
          isFetching: action.isFetching
        }
      case TUGGLE_IS_FOLLOWING_PROGRESS:
        return {
          ...state, 
          followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
        }
    default:
    return state;
  }
}

export let followSuccess = (userId) => ({type: FOLLOW, userId});
export let unfollowSuccess = (userId) => ({type: UNFOLLOW, userId });
export let setUsers = (users) => ({type: SET_USERS, users });
export let setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage });
export let setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount });
export let tuggleIsFetching = (isFetching) => ({type: TUGGLE_IS_FETCHING, isFetching });
export let tuggleFollowingInProgress = (isFetching, userId) => ({type: TUGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

export const requestUsers = (currentPage, pageSize) => {
  return async (dispatch) => {
    dispatch(tuggleIsFetching(true));
    let data = await userAPI.getUsers (currentPage, pageSize)
        dispatch(tuggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
      
  }
}
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(tuggleFollowingInProgress(true, userId));
    let data = await apiMethod(userId)
      if(data.resultCode===0){
        dispatch(actionCreator(userId))}
        dispatch(tuggleFollowingInProgress(false, userId));
}
export const unfollow =(userId) =>{
  return async (dispatch) => {
    followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), unfollowSuccess)
}
}
export const follow =(userId) =>{
  return async (dispatch) => {
    followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), followSuccess)                
}
}
export default usersReducer;