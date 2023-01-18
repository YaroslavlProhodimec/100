import React from 'react';
import s from "./Users.module.css"

import axios from "axios";
import Vladik from './Vladik.png'

import * as https from "https";

type MyUsers = {
    setUsers: (items: any) => void
    users: any[]
    followAC: (arg0: any) => void
    unFollowAC: (arg0: any) => void

}

// у классовых компонентов пропсы это часть обьекта это их свойство короче говоря мы их пишем чере this.props
class Users extends React.Component<any, any> {
    //componentDidMount()
    // Это  место для создания сетевых запросов,встроенный метод
    // Делаем запрос через axios.get
    // Тут внимательно домен оборачиваем обратными ковычками чтобы можно было вставить обьект
    // Так же после домена через слеш прописываем то место где бы мы хотели оказаться на сервере
    // другими словами делаем запрос
    //какие запросы серверу мы можем делать можно посмотреть на https://social-network.samuraijs.com/docs?type=todolist#
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            })
    }

    // Ниже тут считаем сколько нам нужно страниц, для пользователей
    // общее количество пользователей  totalUsersCount которые будут на сервере делим на размер страницы pageSize
    //  и получаем количество страниц
    // так же используем метод округления в большую сторону Math.ceil()  так как если будет дробное число
    // цикл for посчитает его в меньшую сторону и получиться так что нам не хватит страниц для пользователей
    // ниже создаём ппеременную pages = [] с пустым массивом и через цикл считаем кол во страниц и через метод push  засовываем
    // в эту переменную именно в массив
    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
       // ниже через метод map отрисовываем все странички и называем каждый элемент массива p
       //  делаем условие при котором при нажатии на страничку она должна будет выделяться жирным текстом
        //для этого создаём в user-reduser  в  initiaState новую переменную и называем её currentPage
        // когда currentPage будет равна {p} которая вставлена между span тогда цифра странички должна становиться
        // выделенной (жирной)

        return  <div>
            <div>
                {pages.map((p: any) => {
                        // @ts-ignore
                        return <button onClick={()=>{this.props.setCurrentPages(p)}} className={this.props.currentPage === p && s.selectedPage}>{p}</button>
                    }
                )}


            </div>
            {
                this.props.users.map((u: any) => <div key={u.id}>
            <span>
                <div className={s.flex}>
                <div>
                    <img className={s.img} src={Vladik} alt=""/>
                </div>
                <div>
                    {u.followed ? <button onClick={() => {this.props.followAC(u.id)}}> Follow </button> : <button onClick={() => {
                            this.props.unFollowAC(u.id)
                        }}> Unfollow </button>}
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

    }

}

export default Users;

