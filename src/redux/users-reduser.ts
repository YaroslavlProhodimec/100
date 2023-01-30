import {userAPI} from "../api/api";
import {AxiosResponse} from "axios";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGES = 'SET_CURRENT_PAGES'
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_FETCHING = 'TOGGLE_IS_FOLLOWING_FETCHING'

let initialState = {
    users: [ ],
    pageSize: 5,
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
                users: state.users.map(u => {
                        // @ts-ignore
                        if (u.id === action.userId) {
                            // @ts-ignore
                            return {...u, followed: true}
                        }
                        return u;
                    }
                )
            }
        case UNFOLLOW :
            return {
                ...state,
                // users:[...state.users,],ЭТИ ДВЕ ЗАПИСИ ЭДЕНТИЧНЫ
                users: state.users.map(u => {
                        // @ts-ignore
                        if (u.id === action.userId) {
                            // @ts-ignore
                            return {...u, followed: false}
                        }
                        return u;
                    }
                )
            }

        case  SET_USERS : {
            return {
                ...state, users: action.users
            }// КОПИРУЮ И ПЕРЕЗАТИРАЮ ЮЗЕРСОВ
            //  но сейчас сделаю по новому а это скрою =   users: [...state.users, action.users]
            // Тут вообще выводиться новый массив из сервера

        }


        case SET_CURRENT_PAGES: {
            return {...state, currentPage: action.currentPage} // Тут мы не пишем ...state.currentPage
            // потому что инициализируем его сразу и через приходящий action перезатираем
            // Внимательно этот action у нас приходит из UsersAPIComponent.tsx там у нас currentPage строго равен {p}
            //  и мы для него делаем он клик

        }
        case SET_TOTAL_USER_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        // ниже методом фиильтер удаляем то есть мы пропускаем только ту айдишку которая не равна той айдишки
            // которая в юсер экшине пришла
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
// ниже тут создаём константы которые будем диспачить при клики каждый в своей компоненте
// которые передадим через компоненту контейнер
// в этих константах находиться обьект action тот который справа и слева от него находиться его же type
// там где any  это то что приходит и оно повязано с тем что в самой правой стороне
// то что мы сверху перезатираем мы тут такое же  имя указываем
export const followSuccess = (userId: any) => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId: any) => ({type: UNFOLLOW, userId})
export const setUsers = (users: any) => ({type: SET_USERS, users})
export const setCurrentPages= (currentPage: any) => ({type: SET_CURRENT_PAGES, currentPage})
export const setTotalUsersCount=(totalUsersCount:any) => ({type: SET_TOTAL_USER_COUNT, totalUsersCount})

export const toggleIsFetching = (isFetching:boolean) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching:boolean,userId:any) => ({type: TOGGLE_IS_FOLLOWING_FETCHING, isFetching,userId})


export const getUsers = (page:any,pageSize:any) => {
    return  (dispatch: any) => {

            dispatch(toggleIsFetching(true));
        dispatch(setCurrentPages(page))
            userAPI.getUsers(page, pageSize).then((data: { items: any; totalCount: any; }) => {
                dispatch(toggleIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalUsersCount(data.totalCount))
            })
        }

}
export const follow = (userId:any) => {
    debugger
    return  (dispatch: any) => {
        dispatch(toggleFollowingProgress(true,userId))
        userAPI.follow(userId)
            .then((response: AxiosResponse) => {
                if (response.data.resultCode == 0) {
                    dispatch(followSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false,userId))
            })
    }}
export const unfollow = (userId:any) => {
    debugger
    return  (dispatch: any) => {
        dispatch(toggleFollowingProgress(true,userId))
    userAPI.unfollow(userId)
        .then((response: AxiosResponse) => {
            if (response.data.resultCode == 0) {
                dispatch(unfollowSuccess(userId))
            }
            dispatch(toggleFollowingProgress(false,userId))
        })
}}

export default usersReducer;