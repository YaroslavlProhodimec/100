import s from "./Dialogs.module.css"
import * as React from "react"
import DialogsItem from "./DialogsItem/DialogsItem";
 import Message  from "./Message/Message";
import {

    DialogsType,
    MessageType,

} from "../../redux/store";




const Dialogs =  (props:any)  => {
    debugger
     let state = props.dialogsPage

   let dialogsElement = state.dialogs.map((dialog: any) => <DialogsItem  id={dialog.id} name={dialog.name}  />)
    let messagesElement = state.messages.map((m: any) => <Message message={m.message}  />)
    let newMessageBody = state.newMessageBody
    let onSendMessageClick = () => {

        props.sendMessage()

    }
    let   onNewMessageChange = (e: { target: { value: any; }; }) => {
        let body = e.target.value;
    props.updateNewMessageBody(body)

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
                      value={state.newMessageBody}
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
