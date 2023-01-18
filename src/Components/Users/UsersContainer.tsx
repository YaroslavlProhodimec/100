// @ts-ignore

import React from 'react'
import {connect} from "react-redux";
import {followAC, setCurrentPages, setUsers, unfollowAC} from "../../redux/users-reduser";
import Users from "./Users";
let mapStateToProps = (state:any) => {
return {
    users: state.usersPage.users,
    pageSize:state.usersPage.pageSize,
    totalUsersCount:state.usersPage.totalUsersCount,
    currentPage:state.usersPage.currentPage
}

}

let mapDispatchToProps = (dispatch:any) => {
    debugger
// СНИЗУ ДИСПАТЧИМ ACTION КОТОРЫЫЙ КАК МИНИМУМ ДОЛЖЕН СОДЕРЖАТЬ TYPE
    return {
        followAC: (userId: any) => {
            dispatch(followAC(userId))
        },
        unFollowAC: (userId: any) => { dispatch(unfollowAC(userId))},
        setUsers:(users:any) => {
            dispatch(setUsers(users))},
        setCurrentPages:(currentPage:any) => {
            dispatch(setCurrentPages(currentPage))}
    }
}



export const UsersContainer = connect(mapStateToProps,mapDispatchToProps )(Users)