const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGES = 'SET_CURRENT_PAGES'

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 19,
    currentPage: 1
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
                ...state, users: [...state.users, action.users]
            }// КОПИРУЮ И ПЕРЕЗАТИРАЮ ЮЗЕРСОВ МАССИВА
            // Тут вообще выводиться новый массив из сервера

        }


        case SET_CURRENT_PAGES: {
            return {...state, currentPage: action.currentPage} // Тут мы не пишем ...state.currentPage
            // потому что инициализируем его сразу и через приходящий action перезатираем
            // Внимательно этот action у нас приходит из Users.tsx там у нас currentPage строго равен {p}
            //  и мы для него делаем он клик

        }


    }
return state;
}
// ниже тут создаём константы которые будем диспачить при клики каждый в своей компоненте
// которые передадим через компоненту контейнер
// в этих константах находиться обьект action тот который справа и слева от него находиться его же type
// то что мы сверху перезатираем мы тут такое же  имя указываем
export const followAC = (userId: any) => ({type: FOLLOW, userId})
export const unfollowAC = (userId: any) => ({type: UNFOLLOW, userId})
export const setUsers = (users: any) => ({type: SET_USERS, users})
export const setCurrentPages= (currentPage: any) => ({type: SET_CURRENT_PAGES, currentPage})
export default usersReducer;