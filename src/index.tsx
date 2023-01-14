import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import "./index.css";
import store, {StoreType} from "./redux/state";
import React from "react";


  let rerenderEntireTree = (props:any) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={store.getState()}
                 dispatch ={store.dispatch.bind(store)}
            store={store}
            />
                 {/*// pushPost={store.pushPost.bind(store)}*/}
                 {/*//*/}
                 {/*// updateNewPostText={store.updateNewPostText.bind(store)}*/}

                 {/*// pushMessage={store.pushMessage.bind(store)}*/}
                 {/*// updateNewMessageText={store.updateNewMessageBody.bind(store)}*/}

        </BrowserRouter> ,
        document.getElementById('root')
    );
}
rerenderEntireTree(store.getState());
store.subscriber(rerenderEntireTree)
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
