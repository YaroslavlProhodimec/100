import s from "./Dialogs.module.css"
import * as React from "react"
import DialogsItem from "./DialogsItem/DialogsItem";
 import Message  from "./Message/Message";
import {
    addPostCreator,
    DialogsType,
    MessageType,
    SendMessageCreator,
    updateNewMessageBodyCreator
} from "../../redux/state";
import {FC} from "react";



function Dialogs (props:any)   {
    debugger
    let state = props.store.getState()
   let dialogsElement = state.dialogs.map((dialog: DialogsType) => <DialogsItem  id={dialog.id} name={dialog.name}  />)


    let messagesElement = state.messages?.map((m: MessageType) => <Message message={m.message}  />)
    let newMessageBody = state.newMessageBody

    // let  newMessageRef = React.createRef<HTMLTextAreaElement>()

    let onSendMessageClick = () => {

        props.store.dispatch(SendMessageCreator());

    }
    let   onNewMessageChange = (e:any) => {
    let body = e.target.value;
    props.store.dispatch(updateNewMessageBodyCreator(body))

        }

    return (
        <div className={s.wrapper}>

            <div className={s.items}>

                <div className={s.item}>
                    {dialogsElement}
                </div>


            </div>
            <div className={s.flex}>
            <textarea
                      onChange={onNewMessageChange}
                      value={newMessageBody}
                      className={s.text} ></textarea>
            <button role="button"
                    className={s.button}
                    onClick={onSendMessageClick}>
                AddPost</button>
            </div>
            <div className={s.message}>
                {messagesElement}
            </div>




        </div>
    );
};

export default Dialogs;
