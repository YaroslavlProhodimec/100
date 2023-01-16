import s from "./Dialogs.module.css"
import * as React from "react"
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import {

    DialogsType,
    MessageType,

} from "../../redux/store";
import {FC} from "react";
import {SendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reduser";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


// function DialogsContainer(props: any) {
//     debugger
//     return (
//         <StoreContext.Consumer>
//             {(store:any) => {
//                 let state = store.getState().dialogsPage
//
//                 let onSendMessageClick = () => {
//
//                     store.dispatch(SendMessageCreator());
//
//                 }
//                 let onNewMessageChange = (body: string) => {
//
//                   store.dispatch(updateNewMessageBodyCreator(body))
//
//                 }
//      return   <Dialogs updateNewMessageBody={onNewMessageChange}
//                      sendMessage={onSendMessageClick}
//                      dialogsPage={state}
//         />}
//         }
//         </StoreContext.Consumer>
//     )
// };

let mapStateToProps = (state: any) => {
   return {
       dialogsPage: state.dialogsPage
}}
let mapDispatchToProps = (dispatch: any) => {
    return {
        sendMessage: () => {
            dispatch(SendMessageCreator());
        },

        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyCreator(body))
        }
    }
}
//connect это то что связывает нас со store  и заменяет его
//connect нас защищает от знания об store это значит его можно  не приписывать store

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
