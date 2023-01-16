import React, {FC} from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import Dialogs from "./Components/Dialogs/Dialogs";
import {Route} from "react-router-dom";

import {StateType} from "./redux/store";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";

//
// type AppPropsType = {
//   state:StateType
//     pushPost:(postMessage:string)=>void
//
//     updateNewPostsText:(newText:string)=>void
//     pushMessage:(addMes:string)=>void
//     updateNewMessageText:(newTextSMS:string)=>void
// }

const App = (props: any) => {

    debugger


    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Route path="/dialogs/"
                       render={() =>
                           <DialogsContainer/>
                       }/>
                <Route path='/profile'
                       render={() =>
                           <Profile/>}/>

            </div>
        </div>
    );
}

export default App;
