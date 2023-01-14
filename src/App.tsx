import React, {FC} from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import Dialogs from "./Components/Dialogs/Dialogs";
import { Route} from "react-router-dom";

import {StateType} from "./redux/state";

//
// type AppPropsType = {
//   state:StateType
//     pushPost:(postMessage:string)=>void
//
//     updateNewPostsText:(newText:string)=>void
//     pushMessage:(addMes:string)=>void
//     updateNewMessageText:(newTextSMS:string)=>void
// }

const  App =  (props:any) => {

debugger


  return (
      <div className="app-wrapper">
          <Header />
          <Navbar />
          <div className="app-wrapper-content">
              <Route path="/dialogs/"
                     render={() =>
                         <Dialogs dialogs={props.state.dialogs}
                                  messages={props.state.messages}
                                  newMessageText={props.state.newMessageText}
                                  pushMessage={props.pushMessage}
                                  updateNewMessageText={props.updateNewMessageText}/> } />
              <Route path='/profile'
                     render={() =>
                         <Profile posts={props.state.posts}
                                    newPostsText={props.state.newPostsText}
                                  // updateNewPostText={props.updateNewPostText}
                                  // pushPost={props.pushPost}
                             dispatch = {props.dispatch}

              />}/>

    </div>
      </div>
  );
}

export default App;
