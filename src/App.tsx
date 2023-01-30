import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import {Route, withRouter} from "react-router-dom";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Login/Login";
import {connect} from "react-redux";
import {getUserData, logout} from "./redux/auth-reducer";
import {compose} from "redux";
import {initializeApp} from "./redux/app-auth-reducer";
import {Prealoder} from "./Components/common/Prealoder/Preloader";


class App extends React.Component<any> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
   return <Prealoder/>
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path="/dialogs/"
                           render={() =>
                               <DialogsContainer/>
                           }/>
                    <Route path='/profile/:userId?'
                           render={() => <ProfileContainer/>}/>
                    <Route path='/users'
                           render={() =>
                               <UsersContainer/>}/>
                    <Route path='/login'
                           render={() =>
                               <Login/>}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(mapStateToProps,{initializeApp}))(App)

