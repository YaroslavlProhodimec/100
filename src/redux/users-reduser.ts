import {userAPI} from "../api/api";
import {AxiosResponse} from "axios";
import {updateObjectInArray} from "../utils/objects-helper/objects-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGES = 'SET_CURRENT_PAGES'
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_FETCHING = 'TOGGLE_IS_FOLLOWING_FETCHING'

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching : true,
    followingInProgress:[]
}
const usersReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case FOLLOW :
            return {
                ...state,
                // users:[...state.users,],ЭТИ ДВЕ ЗАПИСИ ЭДЕНТИЧНЫ
             users: updateObjectInArray(state.users,action.userId,'id',{followed: true})
                }


        //     Смотри ниже рефакторинг через деструктуризацию в папке objects-helpers
        case UNFOLLOW :
            return {
                ...state,
                users: updateObjectInArray(state.users,action.userId,'id',{followed: false})
            }

        case  SET_USERS : {
            return {
                ...state, users: action.users
            }

        }


        case SET_CURRENT_PAGES: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USER_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }

        case TOGGLE_IS_FOLLOWING_FETCHING: {
            return {...state,
                followingInProgress: action.isFetching
                   ? [...state.followingInProgress, action.userId ]
                : state.followingInProgress.filter(u=>u != action.userId)

            }
        }
default:
return state;
}
}

export const followSuccess = (userId: any) => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId: any) => ({type: UNFOLLOW, userId})
export const setUsers = (users: any) => ({type: SET_USERS, users})
export const setCurrentPages= (currentPage: any) => ({type: SET_CURRENT_PAGES, currentPage})
export const setTotalUsersCount=(totalUsersCount:any) => ({type: SET_TOTAL_USER_COUNT, totalUsersCount})

export const toggleIsFetching = (isFetching:boolean) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching:boolean,userId:any) => ({type: TOGGLE_IS_FOLLOWING_FETCHING, isFetching,userId})


export const getUsers = (page:any,pageSize:any) => {
    return async (dispatch: any) => {

            dispatch(toggleIsFetching(true));
        dispatch(setCurrentPages(page))
          let data = await userAPI.getUsers(page, pageSize)

                dispatch(toggleIsFetching(false));
                dispatch(setUsers(data.data.items));
                dispatch(setTotalUsersCount(data.data.totalCount))

        }

}

// Ниже делаем рефакторинг смотри внимательнее
// Немножко разные вариации
const followUnfollowFlow = async (dispatch:any,userId:any,apiMethod:any,actionMethod:any) => {
    dispatch(toggleFollowingProgress(true,userId))
    let response = await apiMethod(userId)

    if (response.data.resultCode == 0) {
        dispatch(actionMethod(userId))
    }
    dispatch(toggleFollowingProgress(false,userId))
}
export const follow = (userId:any) => {
    debugger
    return async (dispatch: any) => {
        let apiMethod = userAPI.follow.bind(userId)
        let actionMethod = followSuccess

        await followUnfollowFlow(dispatch, userId, apiMethod, actionMethod)

    }}
export const unfollow = (userId:any) => {
    debugger

    return async (dispatch: any) => {

        await followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userId), unfollowSuccess)
}}

export default usersReducer;