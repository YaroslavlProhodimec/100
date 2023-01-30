import s from "./Users.module.css";
import Vladik from "./Vladik.png";
import React from "react";
import {NavLink} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import {toggleFollowingProgress} from "../../redux/users-reduser";
import {userAPI} from "../../api/api";


// type Users = {
//     users: any;
//     pageSize: number;
//     totalUsersCount: number;
//     unfollowAC: (id: any) => void
//     followAC(id: any): any;
//     setTotalUsersCount: any
//     currentPage: any
//     onPageChanged: (arg0: any) => void
// }
 let Users = (props:any) => {


     // Ниже тут считаем сколько нам нужно страниц, для пользователей
     // общее количество пользователей  totalUsersCount которые будут на сервере делим на размер страницы pageSize
     //  и получаем количество страниц
     // так же используем метод округления в большую сторону Math.ceil()  так как если будет дробное число
     // цикл for посчитает его в меньшую сторону и получиться так что нам не хватит страниц для пользователей
     // ниже создаём ппеременную pages = [] с пустым массивом и через цикл считаем кол во страниц и через метод push  засовываем
     // в эту переменную именно в массив
     let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

     let pages = [];
     for (let i = 1; i <= pagesCount; i++) {
         pages.push(i)
     }
     // ниже через метод map отрисовываем все странички и называем каждый элемент массива p
     //  делаем условие при котором при нажатии на страничку она должна будет выделяться жирным текстом
     //для этого создаём в user-reduser  в  initiaState новую переменную и называем её currentPage
     // когда currentPage будет равна {p} которая вставлена между span тогда цифра странички должна становиться
     // выделенной (жирной)

// В посте axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {},{
//             withCredentials : true
//         })
     //  withCredentials : true передается третим параметром
     //axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
     //                                withCredentials : true
     //                            })
     // У delete  запроса нету второго параметра как и у get запроса
     return (<div>
    <div className={s.pages}>
        {pages.map(p => {
            //
            // Так как это классический типичный обработчик событий сюда приходит е(event)
            // selectedPage это выделенный класс
                // @ts-ignore
            return <span className={props.currentPage === p && s.selectedPage}
                             onClick={(e) => {
                                 props.onPageChanged(p);
                             }} >{p}</span>
            }
        )}


    </div>
    {
        props.users.map((u: any) => <div key={u.id}>
            <span>
                <div className={s.flex}>
                <div>
                    <NavLink to={'/profile' + u.id }>
                    <img src={u.photos.small != null  ? u.photos.small : Vladik} className={s.img}  />
                    </NavLink>
                </div>

                <div>

                   {u.followed
                       ? <button disabled={props.followingInProgress.some((u: { id: any; })=>u === u.id)}
                                 onClick={(e) =>{props.unfollow(u.id)}}> Unfollow </button>
                       : <button disabled={props.followingInProgress.some((u: { id: any; })=>u === u.id)}
                                 onClick={(e) => {props.follow(u.id)}}> Follow </button>}
                </div>
                </div>

            </span>
            <span>
                <span>
                <div>{u.name}</div><div>{u.status}</div>
                </span>
            </span>
            {/*<div>{'u.location.country'}</div>*/}
            {/*<div>{'u.location.city'}</div>*/}
            <div></div>

        </div>)

    }
</div>
     )


}
export default Users;