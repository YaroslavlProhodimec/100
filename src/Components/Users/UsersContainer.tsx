// @ts-ignore

import React from 'react'
import {connect} from "react-redux";
import {follow, getUsers, setCurrentPages, toggleFollowingProgress, unfollow} from "../../redux/users-reduser";
import Users from "./Users";
import {Prealoder} from '../common/Prealoder/Preloader';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersSelector,
} from "../../redux/users-selectoors";
// Выше делаем прелоодер в него помещаем картинку


// Тут как то не понятно оббьорачивваем есть контейнераня внутри нее контейнерная и внутри Users
// компонента для аякс запросов
// ЭТО КОНТЕЙНЕРНАЯ  классовая КОМПОНЕНТА ТУТ мы её используем для отчистки презентационной
// компоненты от соединения со сторонними серверами
// у классовых компонентов пропсы это часть обьекта это их свойство короче говоря мы их пишем чере this.props
class UsersContainer extends React.Component<any, any> {

    //componentDidMount()
    // Это  место для создания сетевых запросов,встроенный метод
    // Делаем запрос через axios.get
    // Тут внимательно домен оборачиваем обратными ковычками чтобы можно было вставить обьект
    // Так же после домена через слеш прописываем то место где бы мы хотели оказаться на сервере
    // другими словами делаем запрос
    //какие запросы серверу мы можем делать можно посмотреть на https://social-network.samuraijs.com/docs?type=todolist#
    // тут внимательнее мы вставляем прогрузочную аннимацию в аякс запрос если аякс запрос uhepbn то мы получаем true
    // а это ознает что аниимации надо показывать себя для позователей
    // а когда аякс запрос прогрузиться то это означает её нужно убрать
    // (response: AxiosResponse) погуглить работа идёт с тайп скриптом
    // {withCredentials : true} добавляем во всю да чтобы сервер знал что мы залогинины

    componentDidMount() {
     this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

// выше мы получили с сервера данные они у нас уже отрисованы, ниже мы уже ппросим по методу нашей функции
    // разместить все этих пользователей по страничкам в этом нам помогает наша функция onPageChanged там мы и сопоставляем currentPage
    //  и тут получается пронумеровка страниц и соответствено располагаются юзеры

    // что касаемо прогрузочной аниммации описание смотри выше тут мы повторяем те же действия
    //  если посмотреть в верхнем запросе то там используется this.props.currentPage
    // здесь же в нижем запросе необходимо использовать {pageNumber} который нам приходит в праметрах
    onPageChanged = (pageNumber: any) => {
        this.props.getUsers(pageNumber, this.props.pageSize)

    }

    render() {

// тут внимательнее выше мы указываем состояние стейта isFetching а ниже мы передаем и создаем условие
        // при которых оно будет работать(отображаться)
        // сама эта функция она никуда не передается она остается здесь и ретурнеться и вместе с ней ретурняться юзеры
        // и
        // @ts-ignore
        return <>

            {this.props.isFetching ? <Prealoder/> : null}
            <Users
                setTotalUsersCount={this.props.setTotalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}

                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: any) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress:getFollowingInProgress(state)
    }

}


// СНИЗУ мы ДИСПАТЧИМ не ACTION а его вызов КОТОРЫЫЙ КАК МИНИМУМ ДОЛЖЕН СОДЕРЖАТЬ TYPE
// Сделали рефакторинг кода сократили всё

//     return {
//         followAC: (userId: any) => {
//             dispatch(followAC(userId))
//         },
//         unfollowAC: (userId: any) => { dispatch(unfollowAC(userId))},
//         setUsers:(users:any) => {
//             dispatch(setUsers(users))},
//         setCurrentPages:(currentPage:any) => {
//             dispatch(setCurrentPages(currentPage))},
//
//     setTotalUsersCount:(totalCount:any) => {
//         dispatch(setTotalUsersCount(totalCount))},
//         toggleIsFetchingAC:(isFetching:any) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//     }
// }


// Это первая контейнерная функция тут передаем пропсы и  функции так же не забываем в app её прописать как контейнерную
// ЭТО автоматическая функция коннект связывает нас сразу со store
//указываем в скобках у коннекта пропсы(обьекты) и функции а справа в скобках ту компоненту куда мы хотим это передать


// ВНИМАТЕЛЬНО РАНЬШЕ МЫ ДЕЛАЛИ ДЛИННЫЕ ФУНКЦИИ В ТЕЛЕ mapDispatchToProps И ПОМЕЩАЛИ ЕГО ОТ КОННЕКТА СПРАВА В СКОБКИ
// СЕЙЧАС  ВСЕ ФУНКЦИИ  ОПТСЫВАЕМ ОДНИМ СЛОВОМ ГРУБО ГОВОРЯ ДЕЛАЕМ ССЫЛКУ НА ФУНКЦИИ КОТОРЫЕ СИДЯТ В РЕДЮСЕРЕ
// И ВСЁ ЧТО ТУТ НИЖЕ УКАЗАНО ДИСПАТЧИТЬСЯ БЕЗ ЗАПИСИ ДИСПАТЧА
//  короче коннект сам делает это обертывание
// делаем супер компактную запись смотри выше как они раньше были записаны  followAC: (userId: any) => { dispatch(followAC(userId)) },
// а сейчас мы просто вставляем в коннект одно слово которое потом будет передаваться  в пропсах
// это слово должно быть одинаковым с функцией которая в редуксе это возможно с помощью нового синтаксиса
//таким образом мы избавляемся от диспатча от расписывания функции и пропса и указываем просто такое же название как и у функции как в редуксе

export default compose (connect(mapStateToProps, {
    follow, unfollow,
    setCurrentPages,
    toggleFollowingProgress,
    getUsers
}),withAuthRedirect)(UsersContainer)