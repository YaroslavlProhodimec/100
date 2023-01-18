import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./redux/redux-store";
import React from "react";

import {Provider} from "react-redux";
import {EmptyObject} from "redux";

let rerenderEntireTree = (state: EmptyObject & { dialogsPage: { newMessageBody: string; messages: ({ id: number; message: string } | { id: number; message: string } | { id: number; message: string } | { id: number; message: string } | { id: number; message: string })[]; dialogs: ({ name: string; id: number } | { name: string; id: number } | { name: string; id: number } | { name: string; id: number } | { name: string; id: number } | { name: string; id: number })[] }; profilePage: { newPostsText: string; posts: ({ likesCount: number; id: number; message: string } | { likesCount: number; id: number; message: string })[] } }) => {

    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store} >
                <App/>
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
}
rerenderEntireTree(store.getState());
// store.subscribe(() => {
//     let state = store.getState()
//     rerenderEntireTree(store.getState());
// })
// let rerenderEntireTree = () => {
// ReactDOM.render(
//     <BrowserRouter>
//     <App store={store} pushPost={pushPost}/>
//     </BrowserRouter> ,
//   document.getElementById('root')
// );
// }


// const posts:Array<TaskType_1> = [
//     {id: 1, message: 'Hi,how are you?', likesCount:12},
//     {id: 2, message: 'My first project?', likesCount:11},
//
// ]
// const messages: Array<TaskType> = [
//     {id: 1, message: 'Hi'},
//     {id: 2, message: 'How are you?'},
//     {id: 3, message: 'Yo'},
//     {id: 4, message: 'Yo'},
//     {id: 5, message: 'Yo'},
//
// ];
// const dialogs: Array<TaskType_2> = [
//     {id: 1, name: 'Dimych'},
//     {id: 2, name: 'Andrew'},
//     {id: 3, name: 'Sveta'},
//     {id: 4, name: 'Sasha'},
//     {id: 5, name: 'Viktor'},
//     {id: 6, name: 'Valera'}
// ];
